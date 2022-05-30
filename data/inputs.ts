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
    value: 16,
    max: 100,
    min: 16,
    name: "Conventional",
  },
  coal_power_plant_capacity_lignite: {
    value: 58,
    max: 100,
    min: 58,
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
    value: 110,
    max: 1250,
    min: 110,
    name: "Green hydrogen",
  },
  renewable_energy_capacity: {
    value: 489762,
    max: 560822,
    min: 489762,
    name: "Renewable energy capacity",
  },
  // Savings at home and in business
  electricity_storage_behind_the_meter: {
    value: 0.039,
    max: 0.06,
    min: 0.039,
    step: 0.0001,
    name: "Electricity storage behind the meter",
  },
  insulation: {
    value: 0,
    max: 2,
    min: 0,
    step: 1,
    name: "Insulation",
  },
  growth_of_installed_heat_pumps: {
    value: 0,
    max: 14.7,
    min: 0,
    step: 0.1,
    name: "Growth of installed heat pumps",
  },
  thermostat_settings_percentage: {
    value: 0,
    max: 100,
    min: 0,
    name: "Percentage of residences",
  },
  thermostat_settings_reduce_temperature: {
    value: 0,
    max: 2,
    min: 0.0,
    step: 0.1,
    name: "Reduce thermostat temperature",
  },
  behavioural_change_percentage: {
    value: 0,
    max: 100,
    min: 0.0,
    name: "Percentage of residences",
  },
  // Other
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
  solar_thermal_collectors: {
    value: 9.0,
    max: 9.4,
    min: 9.0,
    step: 0.01,
    name: "Solar thermal collectors",
  },
  replacement_of_gas_by_oil_in_chemical_industry: {
    value: 0.0,
    max: 100.0,
    min: 0.0,
    name: "Replacement of gas by oil in chemical industry",
  },
  closure_of_fertiliser_industry: {
    value: 0.0,
    max: 100.0,
    min: 0.0,
    name: "Closure of fertiliser industry",
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
