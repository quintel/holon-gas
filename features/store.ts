import { configureStore } from "@reduxjs/toolkit";

import scenarioReducer from "./scenario/scenario-slice";
import tourReducer from "./tour/tour-slice";

export const store = configureStore({
  reducer: {
    scenario: scenarioReducer,
    tour: tourReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
