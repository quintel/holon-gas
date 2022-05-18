import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { PresetSchema } from "../../data/inputs";

import presets from "../../data/presets";
import inputs, { dumpInput } from "../../data/inputs";

export type InputKey = keyof typeof inputs;
export type PresetKey = keyof typeof presets;

interface Input {
  /**
   * The default, starting value.
   */
  default: number;
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
   * The current value set by the user.
   */
  user: number | null;
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

/**
 * Creates the initial inputs data based on a given preset.
 */
function createInputState(preset: PresetSchema) {
  const keys = Object.keys(inputs) as InputKey[];

  return keys.reduce((acc, key) => {
    acc[key] = { ...inputs[key], user: preset[key] };
    return acc;
  }, {} as { [key in InputKey]: Input });
}

/**
 * Creates the initial state of the slice by combining the inputs with the selected preset data.
 */
function createInitialState(preset: PresetSchema) {
  return {
    selectedPreset: preset.key,
    inputs: createInputState(preset),
    results: {} as { [k: string]: Result },
    uiReady: false,
  };
}

const sendRequest = async (inputs: { [k: string]: number }) => {
  const response = await fetch(
    "https://beta.engine.energytransitionmodel.com/api/v3/scenarios/1631927",
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
    }
  );

  return await response.json();
};

/**
 * Iterates through all UI inputs and returns an object containing the values to be sent to the API.
 */
const dumpInputs = (inputs: RootState["inputs"]) => {
  return Object.keys(inputs.inputs).reduce((rest, key) => {
    const input = inputs.inputs[key];
    return { ...rest, ...dumpInput(key, input.user || input.default, inputs.inputs) };
  }, {});
};

/**
 * Thunk which sends an API request to ETEngine with the input data and requests results.
 */
export const sendAPIRequest = createAsyncThunk("inputs/sendAPIRequest", async (_, thunkAPI) => {
  return await sendRequest(dumpInputs((thunkAPI.getState() as RootState).inputs));
});

/**
 * Triggered when the user changes an input value.
 */
export const setInputValue = createAsyncThunk(
  "inputs/setInputValue",
  async (arg: { key: InputKey; value: Input["user"] }, thunkAPI) => {
    thunkAPI.dispatch(sendAPIRequest());
  }
);

/**
 * Triggered when the user selects a preset. Updates all the input values, except when the
 * chosen preset is "custom", in which case we leave them as they are.
 */
export const setPreset = createAsyncThunk("inputs/setPreset", async (arg: PresetKey, thunkAPI) => {
  thunkAPI.dispatch(sendAPIRequest);
});

const inputsSlice = createSlice({
  name: "inputs",
  initialState: createInitialState(presets.custom),
  reducers: {},
  extraReducers: (builder) => {
    // API Requests
    // ------------

    builder.addCase(sendAPIRequest.fulfilled, (state, action) => {
      state.results = action.payload.gqueries;
      state.uiReady = true;
    });

    // Inputs
    // ------

    builder.addCase(setInputValue.pending, (state, action) => {
      const input = state.inputs[action.meta.arg.key];

      if (input) {
        state.inputs[action.meta.arg.key] = { ...input, user: action.meta.arg.value };
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
          state.inputs[inputKey] = { ...inputs[inputKey], user: preset[inputKey] };
        }
      }
    });
  },
});

export const createInputSelector = (key: InputKey): ((state: RootState) => Input) => {
  return (state: RootState) => {
    if (state.inputs.inputs[key]) {
      return state.inputs.inputs[key];
    }

    throw new Error(`No such input: ${key}`);
  };
};

export const presetSelector = (state: RootState) => state.inputs.selectedPreset;

/**
 * Creates a function which can be used to fetch a future value from a result set. If no such
 * result exists, 0 is returned.
 */
export const createFutureResultSelector = (key: string) => {
  return (state: RootState) => {
    if (state.inputs.results[key]) {
      return state.inputs.results[key].future;
    }

    return 0;
  };
};

export const uiReadySelector = (state: RootState) => state.inputs.uiReady;

export default inputsSlice.reducer;
