import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { loadState, saveState } from "./browser-storage";

import { PresetSchema } from "../../data/inputs";

import presets from "../../data/presets";
import inputs, { dumpInput, isServerSide } from "../../data/inputs";
import queries from "../../data/queries";

import { Input } from "../../data/inputs";
import { INITIAL_RUSSIAN_GAS } from "../../data/queries";

export type InputKey = keyof typeof inputs;
export type PresetKey = keyof typeof presets;

export const API_HOST = process.env.NEXT_PUBLIC_API_URL;

interface Result {
  /**
   * Value calculated from the present graph.
   */
  present: number;
  /**
   * Value calculated from the future graph.
   */
  future: number;
  /**
   * The unit name of the result.
   */
  unit: string;
}

export interface ScenarioState {
  currentRequestId: undefined | string;
  dirtyInputs: ReturnType<typeof createInputState>;
  initialRequestState: RequestState;
  initialResults: { [k: string]: Result };
  inputs: ReturnType<typeof createInputState>;
  requestState: RequestState;
  results: { [k: string]: Result };
  resultsRegion: "eu" | "nl";
  scenarioId: undefined | number;
  selectedPreset: string;
}

/**
 * Describes the state of the request sent when the page initially loads.
 */
enum RequestState {
  Idle,
  Inflight,
  Done,
  Failure,
}

/**
 * Creates the initial inputs data based on a given preset.
 */
function createInputState(preset: PresetSchema) {
  const keys = Object.keys(inputs) as InputKey[];

  return keys.reduce((acc, key) => {
    acc[key] = { ...inputs[key], value: preset.values[key] ?? inputs[key].value };
    return acc;
  }, {} as { [key in InputKey]: Input });
}

/**
 * Creates the initial state of the slice by combining the inputs with the selected preset data.
 */
function createInitialState(preset: PresetSchema): ScenarioState {
  const fromStore = loadState();
  if (fromStore) {
    // Update any input settings (other than the value) from the defaults.
    const withDefaults = Object.keys(inputs).reduce((acc, key) => {
      const value = constrainedInputValue(
        fromStore.inputs[key].value ?? inputs[key].value,
        inputs[key]
      );

      acc[key] = { ...inputs[key], value };
      return acc;
    }, {} as { [key in InputKey]: Input });

    return { ...fromStore, inputs: withDefaults };
  }

  return {
    currentRequestId: undefined,
    dirtyInputs: createInputState(preset),
    initialRequestState: RequestState.Idle,
    initialResults: {},
    inputs: createInputState(preset),
    requestState: RequestState.Idle,
    results: {},
    resultsRegion: "eu",
    scenarioId: undefined,
    selectedPreset: preset.key,
  };
}

/**
 * Creates a new scenario. Returns the ID of the new scenario.
 */
const createScenario = async () => {
  // Create a scenario
  const response = await fetch(`${API_HOST}/api/v3/scenarios`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      scenario: {
        area_code: "EU27_european_union_27_countries",
        end_year: 2020,
        source: "HOLON Russian Gas",
      },
    }),
  });

  return parseInt((await response.json()).id, 10);
};

const sendRequest = async (
  scenarioId: number,
  inputs: { [k: string]: number },
  signal?: AbortSignal
) => {
  const response = await fetch(`${API_HOST}/api/v3/scenarios/${scenarioId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      autobalance: true,
      gqueries: queries,
      scenario: { user_values: inputs },
    }),
    signal,
  });

  return await response.json();
};

/**
 * Takes an input and a new value, returning the value constrained by the min and the max preventing
 * out-of-bounds values.
 */
const constrainedInputValue = (value: number, { min, max }: Input) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Given two lists of inputs, copies the values from the first to the second.
 *
 */
const copyInputValues = (from: { [k: string]: Input }, to: { [k: string]: Input }) => {
  for (const [key, input] of Object.entries(from)) {
    to[key].value = input.value;
  }
};

/**
 * Iterates through all UI inputs and returns an object containing the values to be sent to the API.
 */
const dumpInputs = (state: RootState["scenario"]) => {
  return Object.keys(state.dirtyInputs).reduce((rest, key) => {
    const input = state.dirtyInputs[key];
    return { ...rest, ...dumpInput(key, input.value, state.dirtyInputs) };
  }, {});
};

const getScenarioId = async (state: RootState) => {
  if (state.scenario.scenarioId) {
    return state.scenario.scenarioId;
  } else {
    return createScenario();
  }
};

/**
 * Thunk which sends an API request to ETEngine with the input data and requests results.
 */
export const sendAPIRequest = createAsyncThunk(
  "scenario/sendAPIRequest",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    return await sendRequest(
      await getScenarioId(state),
      dumpInputs(state.scenario),
      thunkAPI.signal
    );
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      // Prevent extra requests during initialization which are caused by settings the value in
      // slider useEffect.
      return state.scenario.initialRequestState !== RequestState.Inflight;
    },
  }
);

export const resetScenario = createAsyncThunk("scenario/resetScenario", async (_, thunkAPI) => {
  return (await thunkAPI.dispatch(sendAPIRequest())).payload;
});

/**
 * Triggered when the user changes an input value.
 */
export const setInputValue = createAsyncThunk(
  "scenario/setInputValue",
  async (arg: { key: InputKey; value: Input["value"] }, thunkAPI) => {
    if (isServerSide(arg.key)) {
      await thunkAPI.dispatch(sendAPIRequest());
    }
  }
);

/**
 * Triggered when the user selects a preset. Updates all the input values, except when the
 * chosen preset is "custom", in which case we leave them as they are.
 */
export const setPreset = createAsyncThunk(
  "scenario/setPreset",
  async (arg: PresetKey, thunkAPI) => {
    await thunkAPI.dispatch(sendAPIRequest());
  }
);

const scenarioSlice = createSlice({
  name: "scenario",
  initialState: createInitialState(presets.custom),
  reducers: {
    setResultsRegion(state, action: PayloadAction<ScenarioState["resultsRegion"]>) {
      state.resultsRegion = action.payload;
    },
  },
  extraReducers: (builder) => {
    // API Requests
    // ------------

    builder.addCase(sendAPIRequest.pending, (state, action) => {
      state.currentRequestId = action.meta.requestId;

      if (state.initialRequestState === RequestState.Idle) {
        state.initialRequestState = RequestState.Inflight;
      }

      state.requestState = RequestState.Inflight;
    });

    builder.addCase(sendAPIRequest.fulfilled, (state, action) => {
      if (action.payload.errors && action.payload.errors.length > 0) {
        state.requestState = RequestState.Failure;

        if (state.initialRequestState === RequestState.Inflight) {
          state.initialRequestState = RequestState.Failure;
        }

        return;
      }

      if (action.meta.requestId != state.currentRequestId || action.payload.errors) {
        // Do nothing if this is a response to an older request or if the HTTP request returned
        // validation errors.
        return;
      }

      if (state.initialRequestState === RequestState.Inflight) {
        state.initialResults = action.payload.gqueries;
      }

      // Set the input values from the dirtyInputs.
      copyInputValues(state.dirtyInputs, state.inputs);

      state.results = action.payload.gqueries;
      state.scenarioId = action.payload.scenario.id;
      state.initialRequestState = RequestState.Done;
      state.requestState = RequestState.Done;

      saveState(state);
    });

    builder.addCase(sendAPIRequest.rejected, (state, action) => {
      if (state.initialRequestState === RequestState.Inflight) {
        state.initialRequestState = RequestState.Failure;
      }

      // Reset the dirty input state.
      if (action.meta.requestId != state.currentRequestId) {
        copyInputValues(state.inputs, state.dirtyInputs);
      }

      state.requestState = RequestState.Failure;
    });

    // Inputs
    // ------

    builder.addCase(setInputValue.pending, (state, action) => {
      const input = state.inputs[action.meta.arg.key];

      if (input) {
        state.dirtyInputs[action.meta.arg.key] = {
          ...input,
          value: constrainedInputValue(action.meta.arg.value, input),
        };
        state.selectedPreset = "custom";
      }
    });

    builder.addCase(setInputValue.fulfilled, (state) => {
      // Set the input values from the dirtyInputs.
      copyInputValues(state.dirtyInputs, state.inputs);
    });

    // Presets
    // -------

    builder.addCase(setPreset.pending, (state, action) => {
      state.selectedPreset = action.meta.arg;

      if (action.payload === "custom") {
        return;
      }

      const preset = presets[action.meta.arg];
      const inputKeys = Object.keys(inputs) as InputKey[];

      for (const inputKey of inputKeys) {
        if (preset.values[inputKey] != undefined) {
          state.inputs[inputKey] = {
            ...inputs[inputKey],
            value: constrainedInputValue(preset.values[inputKey], inputs[inputKey]),
          };
        }
      }
    });

    builder.addCase(resetScenario.pending, (state) => {
      state.selectedPreset = "custom";
      state.inputs = createInputState(presets.custom);
    });

    builder.addCase(resetScenario.fulfilled, (state, action) => {
      if (!action.payload.errors) {
        state.initialResults = action.payload.gqueries;
      }
    });
  },
});

export const createInputSelector = (
  key: InputKey,
  dirty?: boolean
): ((state: RootState) => Input) => {
  return (state: RootState) => {
    const inputs = dirty ? state.scenario.dirtyInputs : state.scenario.inputs;

    if (inputs[key]) {
      return inputs[key];
    }

    throw new Error(`No such input: ${key}`);
  };
};

export const presetSelector = (state: RootState) => state.scenario.selectedPreset;

export const requestStateSelector = (state: RootState) => ({
  isLoading: state.scenario.requestState === RequestState.Inflight,
  isDone: state.scenario.requestState === RequestState.Done,
  isFailure: state.scenario.requestState === RequestState.Failure,
});

export const scenarioIdSelector = (state: RootState) => state.scenario.scenarioId;

export const resultsRegionSelector = (state: RootState) => state.scenario.resultsRegion;

/**
 * Selects an initial result value.
 */
export const createInitialResultSelector = (key: string) => {
  return (state: RootState) => {
    if (state.scenario.initialResults[key]) {
      return state.scenario.initialResults[key].future;
    }

    return 0;
  };
};

/**
 * Creates a function which can be used to fetch a future value from a result set. If no such
 * result exists, 0 is returned.
 */
export const createFutureResultSelector = (key: string) => {
  return (state: RootState) => {
    if (state.scenario.results[key]) {
      return state.scenario.results[key].future;
    }

    return 0;
  };
};

const selectFutureDelta = (state: RootState, key: string) => {
  const { results, initialResults } = state.scenario;

  if (results[key] && initialResults[key]) {
    return results[key].future - initialResults[key].future;
  }

  return 0;
};

/**
 * Creates a function which compares the current future result with the value when the scenario was
 * first created.
 */
export const createFutureResultDeltaSelector = (key: string) => {
  return (state: RootState) => selectFutureDelta(state, key);
};

export const uiReadySelector = (state: RootState) =>
  state.scenario.initialRequestState === RequestState.Done;

/**
 * Sum the delta between multiple future results.
 */
const summedFutureDeltas = (state: RootState, keys: string[]): number =>
  keys.reduce((acc, key) => acc + selectFutureDelta(state, key), 0);

/**
 * Returns how much Russian gas is imported in the scenario.
 */
export const importedRussianGasSelector = (state: RootState) => {
  const reducedDemand = -summedFutureDeltas(state, [
    "natural_gas_electricity_production_bcm",
    "final_demand_natural_gas_buildings_bcm",
    "final_demand_natural_gas_households_bcm",
    "final_demand_natural_gas_industry_bcm",
  ]);

  let increasedProduction = summedFutureDeltas(state, [
    "production_green_gas_bcm",
    "production_natural_gas_bcm",
  ]);

  // Manually include imported LNG.
  increasedProduction += state.scenario.inputs.lng_imports.value;

  return Math.max(INITIAL_RUSSIAN_GAS - increasedProduction - reducedDemand, 0);
};

export const importedRussianGasSelectorWithoutProduction = (state: RootState) => {
  const reducedDemand = -summedFutureDeltas(state, [
    "natural_gas_electricity_production_bcm",
    "final_demand_natural_gas_buildings_bcm",
    "final_demand_natural_gas_households_bcm",
    "final_demand_natural_gas_industry_bcm",
  ]);

  // Manually include imported LNG.
  const increasedProduction = state.scenario.inputs.lng_imports.value;

  return Math.max(INITIAL_RUSSIAN_GAS - increasedProduction - reducedDemand, 0);
};

/**
 * Returns if the user has modified any of the inputs from the default "Custom" preset
 */
export const isUnmodifiedSelector = (state: RootState) => {
  const inputKeys = Object.keys(inputs) as InputKey[];

  for (const inputKey of inputKeys) {
    if (state.scenario.inputs[inputKey].value !== inputs[inputKey].value) {
      return false;
    }
  }

  return true;
};

export const { setResultsRegion } = scenarioSlice.actions;
export default scenarioSlice.reducer;
