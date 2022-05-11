import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { PresetSchema } from "../../data/inputs";

import presets from "../../data/presets";
import inputs from "../../data/inputs";

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
  return { selectedPreset: preset.key, inputs: createInputState(preset) };
}

const inputsSlice = createSlice({
  name: "inputs",
  initialState: createInitialState(presets.custom),
  reducers: {
    /**
     * Triggered when the user changes an input value.
     */
    setInputValue: (state, action: PayloadAction<{ key: InputKey; value: Input["user"] }>) => {
      const input = state.inputs[action.payload.key];

      if (input) {
        state.inputs[action.payload.key] = { ...input, user: action.payload.value };
        state.selectedPreset = "custom";
      }
    },

    /**
     * Triggered when the user selects a preset. Updates all the input values, except when the
     * chosen preset is "custom", in which case we leave them as they are.
     */
    setPreset: (state, action: PayloadAction<PresetKey>) => {
      state.selectedPreset = action.payload;

      if (action.payload === "custom") {
        return;
      }

      const preset = presets[action.payload];
      const inputKeys = Object.keys(inputs) as InputKey[];

      for (const inputKey of inputKeys) {
        if (preset[inputKey] != undefined) {
          state.inputs[inputKey] = { ...inputs[inputKey], user: preset[inputKey] };
        }
      }
    },
  },
});

export const { setInputValue, setPreset } = inputsSlice.actions;

export const createInputSelector = (key: InputKey): ((state: RootState) => Input) => {
  return (state: RootState) => {
    if (state.inputs.inputs[key]) {
      return state.inputs.inputs[key];
    }

    throw new Error(`No such input: ${key}`);
  };
};

export const presetSelector = (state: RootState) => state.inputs.selectedPreset;

export default inputsSlice.reducer;
