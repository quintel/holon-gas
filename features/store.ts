import { configureStore, Action } from "@reduxjs/toolkit";
import inputsReducer from "./inputs/inputsSlice";

export const store = configureStore({
  reducer: {
    inputs: inputsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
