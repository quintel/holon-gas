import { configureStore, Action } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import inputsReducer from "./inputs/inputsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    inputs: inputsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
