import { configureStore, Action } from "@reduxjs/toolkit";
import scenarioReducer from "./scenario/scenario-slice";

export const store = configureStore({
  reducer: {
    scenario: scenarioReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
