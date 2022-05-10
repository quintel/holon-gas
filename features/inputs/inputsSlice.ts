import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { PresetSchema } from "../../data/inputs";

import presets from "../../data/presets";
import inputs from "../../data/inputs";

export type InputKey = keyof typeof inputs;

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
 * Creates the initial state of the slice by combining the inputs with the selected preset data.
 */
function createInitialState(preset: PresetSchema) {
  const keys = Object.keys(inputs) as InputKey[];

  return keys.reduce((acc, key) => {
    acc[key] = { ...inputs[key], user: preset[key] };
    return acc;
  }, {} as { [key in InputKey]: Input });
}

const inputsSlice = createSlice({
  name: "inputs",
  initialState: createInitialState(presets.example),
  reducers: {
    setInputValue: (state, action: PayloadAction<{ key: InputKey; value: Input["user"] }>) => {
      const input = state[action.payload.key];

      if (input) {
        state[action.payload.key] = { ...input, user: action.payload.value };
      }
    },
  },
});

export const { setInputValue } = inputsSlice.actions;

export const createInputSelector = (key: InputKey): ((state: RootState) => Input) => {
  return (state: RootState) => {
    if (state.inputs[key]) {
      return state.inputs[key];
    }

    throw new Error(`No such input: ${key}`);
  };
};

export default inputsSlice.reducer;
