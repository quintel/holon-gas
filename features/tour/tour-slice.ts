import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ScenarioState {
  active: boolean;
  stepIndex: number;
}

const tourSlice = createSlice({
  name: "tour",
  initialState: { active: false, stepIndex: 0 },
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.stepIndex = action.payload;
    },

    startTour(state) {
      state.stepIndex = 0;
      state.active = true;
    },

    closeTour(state) {
      state.active = false;
    },
  },
});

export const isActiveSelector = (state: RootState) => state.tour.active;
export const stepSelector = (state: RootState) => state.tour.stepIndex;

export const { startTour, closeTour, setStep } = tourSlice.actions;
export default tourSlice.reducer;
