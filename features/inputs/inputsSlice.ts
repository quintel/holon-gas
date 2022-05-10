import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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

function createInitialState(): { [key: string]: Input } {
  return {
    // Gas production
    extra_gas_from_groningen: {
      default: 0,
      max: 100,
      min: 0,
      name: "Extra gas from Groningen",
      user: null,
    },
    extra_gas_from_eu: {
      default: 0,
      max: 100,
      min: 0,
      name: "Extra gas from other EU countries",
      user: null,
    },
    // Other production
    reuse_of_coal_fired_power_stations: {
      default: 0,
      max: 100,
      min: 0,
      name: "Re-use of coal-fired power stations",
      user: null,
    },
    injection_of_biomethane_in_gas_mix: {
      default: 0,
      max: 100,
      min: 0,
      name: "Injection of biomethane in gas mix",
      user: null,
    },
    green_hydrogen_as_an_alternative: {
      default: 0,
      max: 100,
      min: 0,
      name: "Green hydrogen as an alternative",
      user: null,
    },
    // Savings at home and in business
    insulate_buildings: {
      default: 0,
      max: 100,
      min: 0,
      name: "Insulate buildings",
      user: null,
    },
    optimal_boiler_settings: {
      default: 0,
      max: 100,
      min: 0,
      name: "Optimal boiler settings",
      user: null,
    },
    purchase_solar_collectors: {
      default: 0,
      max: 100,
      min: 0,
      name: "Purchase solar collectors",
      user: null,
    },
    population_percentage: {
      default: 0,
      max: 100,
      min: 0,
      name: "Population percentage",
      user: null,
    },
    number_of_degrees_lower: {
      default: 0,
      max: 100,
      min: 0,
      name: "Number of degrees lower",
      user: null,
    },
    switch_to_heat_pumps: {
      default: 0,
      max: 100,
      min: 0,
      name: "Switch to heat pumps",
      user: null,
    },
    pv_on_roofs: {
      default: 0,
      max: 100,
      min: 0,
      name: "PV on roofs",
      user: null,
    },
    electricity_storage_behind_the_meter: {
      default: 0,
      max: 100,
      min: 0,
      name: "Electricity storage behind the meter",
      user: null,
    },
    // Other
    large_scale_storage: {
      default: 0,
      max: 100,
      min: 0,
      name: "Large-scale storage",
      user: null,
    },
    closure_of_industry_with_gas: {
      default: 0,
      max: 100,
      min: 0,
      name: "Closure of industry with gas as a raw material",
      user: null,
    },
    bio_methane_as_raw_material: {
      default: 0,
      max: 100,
      min: 0,
      name: "Bio-methane as a raw material in industry",
      user: null,
    },
  };
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
        state[action.payload.key] = { ...input, user: action.payload.value };
      }
    },
  },
});

export const { setInputValue } = inputsSlice.actions;

export const createInputSelector = (
  key: Input["key"]
): ((state: RootState) => Input) => {
  return (state: RootState) => {
    if (state.inputs[key]) {
      return state.inputs[key];
    }

    throw new Error(`No such input: ${key}`);
  };
};

export default inputsSlice.reducer;
