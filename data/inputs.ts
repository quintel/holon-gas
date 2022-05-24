import { dumpTransforms, formatTransforms } from "./input-transforms";

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
  coal_power_plant_capacity_conventional: {
    value: 51914,
    max: 1929824,
    min: 0,
    name: "Conventional",
  },
  coal_power_plant_capacity_lignite: {
    value: 44650,
    max: 726697,
    min: 0,
    name: "Lignite",
  },
  injection_of_biomethane_in_gas_mix: {
    value: 0,
    max: 100,
    min: 0,
    name: "Natural gas displacement (bio-methane)",
  },
  lng_imports: {
    value: 0,
    max: 100,
    min: 0,
    name: "LNG imports",
  },
  green_hydrogen: {
    value: 0,
    max: 100,
    min: 0,
    name: "Green hydrogen",
  },
  // Savings at home and in business
  rooftop_pv_households: {
    value: 7.6,
    max: 10.6,
    min: 7.6,
    step: 0.01,
    name: "Homes",
  },
  rooftop_pv_buildings: {
    value: 6.3,
    max: 10,
    min: 6.3,
    step: 0.01,
    name: "Businesses",
  },
  electricity_storage_behind_the_meter: {
    value: 0.039,
    max: 0.06,
    min: 0.039,
    step: 0.0001,
    name: "Electricity storage behind the meter",
  },
  // Other
  large_scale_storage_batteries: {
    value: 647,
    max: 1997,
    min: 647,
    name: "Batteries",
  },
  large_scale_storage_reservoirs: {
    value: 45669,
    max: 67634,
    min: 45669,
    name: "Reservoirs",
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

/**
 * Given an input key, the value as a formatted string.
 */
export function formatInput(key: keyof typeof inputs, value: number, precision: number): string {
  return formatTransforms[key] ? formatTransforms[key](value, precision) : value.toFixed(precision);
}

export type PresetSchema = {
  [K in keyof typeof inputs]: number;
} & { key: string };

export default inputs;
