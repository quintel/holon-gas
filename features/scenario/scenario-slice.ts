import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { loadState, saveState } from "./browser-storage";

import { PresetSchema } from "../../data/inputs";

import presets from "../../data/presets";
import inputs, { dumpInput } from "../../data/inputs";

export type InputKey = keyof typeof inputs;
export type PresetKey = keyof typeof presets;

interface Input {
  /**
   * The maximum permitted value.
   */
  max: number;
  /**
   * The minimum permitted value.
   */
  min: number;
  /**
   * Human-readable name of the input.
   */
  name: string;
  /**
   * The current value set by the user or the default if no user value is set.
   */
  value: number;
}

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
  initialRequestState: InitialRequestState;
  inputs: ReturnType<typeof createInputState>;
  results: { [k: string]: Result };
  scenarioId: null | number;
  selectedPreset: string;
}

/**
 * Describes the state of the request sent when the page initially loads.
 */
enum InitialRequestState {
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
    acc[key] = { ...inputs[key], value: preset[key] };
    return acc;
  }, {} as { [key in InputKey]: Input });
}

/**
 * Creates the initial state of the slice by combining the inputs with the selected preset data.
 */
function createInitialState(preset: PresetSchema): ScenarioState {
  const fromStore = loadState();
  if (fromStore) {
    return fromStore;
  }

  return {
    currentRequestId: undefined,
    initialRequestState: InitialRequestState.Idle,
    inputs: createInputState(preset),
    results: {},
    scenarioId: null,
    selectedPreset: preset.key,
  };
}

/**
 * Creates a new scenario. Returns the ID of the new scenario.
 */
const createScenario = async () => {
  // Create a scenario
  const response = await fetch("https://beta.engine.energytransitionmodel.com/api/v3/scenarios", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      scenario: { area_code: "nl", end_year: 2050, source: "HOLON Russian Gas" },
    }),
  });

  return parseInt((await response.json()).id, 10);
};

const sendRequest = async (
  scenarioId: number,
  inputs: { [k: string]: number },
  signal?: AbortSignal
) => {
  const response = await fetch(
    `https://beta.engine.energytransitionmodel.com/api/v3/scenarios/${scenarioId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        autobalance: true,
        gqueries: ["dashboard_total_costs", "dashboard_renewability"],
        scenario: { user_values: inputs },
      }),
      signal,
    }
  );

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
 * Iterates through all UI inputs and returns an object containing the values to be sent to the API.
 */
const dumpInputs = (inputs: RootState["scenario"]) => {
  return Object.keys(inputs.inputs).reduce((rest, key) => {
    const input = inputs.inputs[key];
    return { ...rest, ...dumpInput(key, input.value, inputs.inputs) };
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
      return state.scenario.initialRequestState !== InitialRequestState.Inflight;
    },
  }
);

/**
 * Triggered when the user changes an input value.
 */
export const setInputValue = createAsyncThunk(
  "scenario/setInputValue",
  async (arg: { key: InputKey; value: Input["value"] }, thunkAPI) => {
    thunkAPI.dispatch(sendAPIRequest());
  }
);

/**
 * Triggered when the user selects a preset. Updates all the input values, except when the
 * chosen preset is "custom", in which case we leave them as they are.
 */
export const setPreset = createAsyncThunk(
  "scenario/setPreset",
  async (arg: PresetKey, thunkAPI) => {
    thunkAPI.dispatch(sendAPIRequest());
  }
);

const scenarioSlice = createSlice({
  name: "scenario",
  initialState: createInitialState(presets.custom),
  reducers: {},
  extraReducers: (builder) => {
    // API Requests
    // ------------

    builder.addCase(sendAPIRequest.pending, (state, action) => {
      state.currentRequestId = action.meta.requestId;

      if (state.initialRequestState === InitialRequestState.Idle) {
        state.initialRequestState = InitialRequestState.Inflight;
      }
    });

    builder.addCase(sendAPIRequest.fulfilled, (state, action) => {
      if (action.meta.requestId != state.currentRequestId || action.payload.errors) {
        // Do nothing if this is a response to an older request or if the HTTP request returned
        // validation errors.
        return;
      }

      state.results = action.payload.gqueries;
      state.scenarioId = action.payload.scenario.id;
      state.initialRequestState = InitialRequestState.Done;

      saveState(state);
    });

    // Inputs
    // ------

    builder.addCase(setInputValue.pending, (state, action) => {
      const input = state.inputs[action.meta.arg.key];

      if (input) {
        state.inputs[action.meta.arg.key] = {
          ...input,
          value: constrainedInputValue(action.meta.arg.value, input),
        };
        state.selectedPreset = "custom";
      }
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
        if (preset[inputKey] != undefined) {
          state.inputs[inputKey] = {
            ...inputs[inputKey],
            value: constrainedInputValue(preset[inputKey], inputs[inputKey]),
          };
        }
      }
    });
  },
});

export const createInputSelector = (key: InputKey): ((state: RootState) => Input) => {
  return (state: RootState) => {
    if (state.scenario.inputs[key]) {
      return state.scenario.inputs[key];
    }

    throw new Error(`No such input: ${key}`);
  };
};

export const presetSelector = (state: RootState) => state.scenario.selectedPreset;

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

export const uiReadySelector = (state: RootState) =>
  state.scenario.initialRequestState === InitialRequestState.Done;

export default scenarioSlice.reducer;
