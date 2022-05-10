import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { PresetSchema } from "../../data/inputs";
import presets from "../../data/presets";

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

function createInitialState(preset: PresetSchema): { [key: string]: Input } {
  return {
    // Gas production
    extra_gas_from_groningen: {
      default: preset.extra_gas_from_groningen,
      max: 100,
      min: 0,
      name: "Extra gas from Groningen",
      user: null,
    },
    extra_gas_from_eu: {
      default: preset.extra_gas_from_eu,
      max: 100,
      min: 0,
      name: "Extra gas from other EU countries",
      user: null,
    },
    // Other production
    reuse_of_coal_fired_power_stations: {
      default: preset.reuse_of_coal_fired_power_stations,
      max: 100,
      min: 0,
      name: "Re-use of coal-fired power stations",
      user: null,
    },
    injection_of_biomethane_in_gas_mix: {
      default: preset.injection_of_biomethane_in_gas_mix,
      max: 100,
      min: 0,
      name: "Injection of biomethane in gas mix",
      user: null,
    },
    green_hydrogen_as_an_alternative: {
      default: preset.green_hydrogen_as_an_alternative,
      max: 100,
      min: 0,
      name: "Green hydrogen as an alternative",
      user: null,
    },
    // Savings at home and in business
    insulate_buildings: {
      default: preset.insulate_buildings,
      max: 100,
      min: 0,
      name: "Insulate buildings",
      user: null,
    },
    optimal_boiler_settings: {
      default: preset.optimal_boiler_settings,
      max: 100,
      min: 0,
      name: "Optimal boiler settings",
      user: null,
    },
    purchase_solar_collectors: {
      default: preset.purchase_solar_collectors,
      max: 100,
      min: 0,
      name: "Purchase solar collectors",
      user: null,
    },
    population_percentage: {
      default: preset.population_percentage,
      max: 100,
      min: 0,
      name: "Population percentage",
      user: null,
    },
    number_of_degrees_lower: {
      default: preset.number_of_degrees_lower,
      max: 100,
      min: 0,
      name: "Number of degrees lower",
      user: null,
    },
    switch_to_heat_pumps: {
      default: preset.switch_to_heat_pumps,
      max: 100,
      min: 0,
      name: "Switch to heat pumps",
      user: null,
    },
    pv_on_roofs: {
      default: preset.pv_on_roofs,
      max: 100,
      min: 0,
      name: "PV on roofs",
      user: null,
    },
    electricity_storage_behind_the_meter: {
      default: preset.electricity_storage_behind_the_meter,
      max: 100,
      min: 0,
      name: "Electricity storage behind the meter",
      user: null,
    },
    // Other
    large_scale_storage: {
      default: preset.large_scale_storage,
      max: 100,
      min: 0,
      name: "Large-scale storage",
      user: null,
    },
    closure_of_industry_with_gas: {
      default: preset.closure_of_industry_with_gas,
      max: 100,
      min: 0,
      name: "Closure of industry with gas as a raw material",
      user: null,
    },
    bio_methane_as_raw_material: {
      default: preset.bio_methane_as_raw_material,
      max: 100,
      min: 0,
      name: "Bio-methane as a raw material in industry",
      user: null,
    },
  };
}

const inputsSlice = createSlice({
  name: "inputs",
  initialState: createInitialState(presets.test),
  reducers: {
    setInputValue: (state, action: PayloadAction<{ key: string; value: Input["user"] }>) => {
      const input = state[action.payload.key];

      if (input) {
        state[action.payload.key] = { ...input, user: action.payload.value };
      }
    },
  },
});

export const { setInputValue } = inputsSlice.actions;

export const createInputSelector = (key: string): ((state: RootState) => Input) => {
  return (state: RootState) => {
    if (state.inputs[key]) {
      return state.inputs[key];
    }

    throw new Error(`No such input: ${key}`);
  };
};

export default inputsSlice.reducer;
