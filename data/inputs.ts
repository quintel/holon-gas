import { dumpTransforms } from "./input-transforms";

const inputs: { [k: string]: Input } = {
  extra_gas_from_groningen: {
    value: 3.9,
    max: 27.8,
    min: 3.9,
    step: 0.1,
    name: "Extra gas from Groningen",
  },
  extra_gas_from_eu: {
    value: 27.8,
    max: 33.5,
    min: 27.8,
    step: 0.1,
    name: "Extra gas from other EU countries",
  },
  // Other production
  reuse_of_coal_fired_power_stations: {
    value: 0,
    max: 100,
    min: 0,
    name: "Re-use of coal-fired power stations",
  },
  injection_of_biomethane_in_gas_mix: {
    value: 0,
    max: 100,
    min: 0,
    name: "Injection of biomethane in gas mix",
  },
  green_hydrogen_as_an_alternative: {
    value: 0,
    max: 100,
    min: 0,
    name: "Green hydrogen as an alternative",
  },
  // Savings at home and in business
  insulate_buildings: {
    value: 0,
    max: 100,
    min: 0,
    name: "Insulate buildings",
  },
  optimal_boiler_settings: {
    value: 0,
    max: 100,
    min: 0,
    name: "Optimal boiler settings",
  },
  purchase_solar_collectors: {
    value: 0,
    max: 100,
    min: 0,
    name: "Purchase solar collectors",
  },
  population_percentage: {
    value: 0,
    max: 100,
    min: 0,
    name: "Population percentage",
  },
  number_of_degrees_lower: {
    value: 0,
    max: 100,
    min: 0,
    name: "Number of degrees lower",
  },
  switch_to_heat_pumps: {
    value: 0,
    max: 100,
    min: 0,
    name: "Switch to heat pumps",
  },
  pv_on_roofs: {
    value: 0,
    max: 100,
    min: 0,
    name: "PV on roofs",
  },
  electricity_storage_behind_the_meter: {
    value: 0,
    max: 100,
    min: 0,
    name: "Electricity storage behind the meter",
  },
  // Other
  large_scale_storage: {
    value: 0,
    max: 100,
    min: 0,
    name: "Large-scale storage",
  },
  closure_of_industry_with_gas: {
    value: 0,
    max: 100,
    min: 0,
    name: "Closure of industry with gas as a raw material",
  },
  bio_methane_as_raw_material: {
    value: 0,
    max: 100,
    min: 0,
    name: "Bio-methane as a raw material in industry",
  },
};

interface Input {
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
   * Interval between each user-selectable value.
   */
  step?: number;
  /**
   * The value of the input. Prior to any changes made by the user, this is the default value.
   */
  value: number;
}

/**
 * Given information about a UI input, dumps its value to a hash of inputs to be sent to ETEngine.
 *
 * @param key   The key of the input.
 * @param value The value of the input.
 * @param all   The full set of all UI inputs.
 */
export function dumpInput(
  key: keyof typeof inputs,
  value: number,
  all: typeof inputs
): { [k: string]: number } {
  return dumpTransforms[key]?.(key, value, all) || {};
}

export type PresetSchema = {
  [K in keyof typeof inputs]: number;
} & { key: string };

export default inputs;
