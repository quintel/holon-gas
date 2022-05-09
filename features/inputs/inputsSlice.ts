import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Input {
  /**
   * The default, starting value.
   */
  default: number;
  /**
   * The unique key which identifies the input.
   */
  key: string;
  /**
   * The maximum permitted value.
   */
  max: number;
  /**
   * The minimum permitted value.
   */
  min: number;
  /**
   * The current value set by the user.
   */
  user: number | null;
}

function createInitialState(): { [key: Input["key"]]: Input } {
  return {};
}

const inputsSlice = createSlice({
  name: "inputs",
  initialState: createInitialState(),
  reducers: {
    setInputValue: (
      state,
      action: PayloadAction<{ key: Input["key"]; value: Input["user"] }>
    ) => {
      const input = state[action.payload.key];

      if (input) {
        input.user = action.payload.value;
      }
    },
  },
});

export const { setInputValue } = inputsSlice.actions;

export const selectInput = (state: RootState, key: Input["key"]) =>
  state.inputs[key];

export default inputsSlice.reducer;
