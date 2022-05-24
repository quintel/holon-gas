import inputs from "./inputs";

// Converts 1 bcm of gas to PJ.
const bcmPerPJ = 35.17;

type InputSerializer = (
  key: keyof typeof inputs,
  value: number,
  all: typeof inputs
) => { [k: string]: number };

/**
 * Serializes both the extra gas from Groningen and EU sliders to a single input in the ETM.
 */
const transformExtraGas: InputSerializer = (key, value, all) => ({
  fuel_production_natural_gas:
    all["extra_gas_from_groningen"].value * bcmPerPJ + all["extra_gas_from_eu"].value * bcmPerPJ,
});

/**
 * Converts UI values to a hash of inputs to be sent to ETEngine.
 */
export const dumpTransforms: { [k: keyof typeof inputs]: InputSerializer } = {
  /**
   * Gas production
   */
  extra_gas_from_groningen: transformExtraGas,
  extra_gas_from_eu: transformExtraGas,
  /**
   * Other production
   */
  coal_power_plant_capacity_conventional: (key, value, all) => ({
    capacity_of_energy_power_supercritical_coal: value,
  }),
  coal_power_plant_capacity_lignite: (key, value, all) => ({
    capacity_of_energy_power_ultra_supercritical_lignite: value,
  }),
  lng_imports: (key, value, all) => ({
    energy_regasification_lng_share: value,
  }),
  injection_of_biomethane_in_gas_mix: (key, value, all) => ({
    green_gas_total_share: value,
  }),
  green_hydrogen: (key, value, all) => ({
    capacity_of_energy_hydrogen_wind_turbine_offshore: value,
    capacity_of_energy_power_combined_cycle_hydrogen: value,
  }),
  /**
   * Savings at home and in the office
   */
  rooftop_pv_households: (key, value, all) => ({
    households_solar_pv_solar_radiation_market_penetration: value,
  }),
  rooftop_pv_buildings: (key, value, all) => ({
    buildings_solar_pv_solar_radiation_market_penetration: value,
  }),
  electricity_storage_behind_the_meter: (key, value, all) => ({
    households_flexibility_p2p_electricity_market_penetration: value,
  }),
  /**
   * Other
   */
  large_scale_storage_batteries: (key, value, all) => ({
    capacity_of_energy_flexibility_mv_batteries_electricity: value,
  }),
  large_scale_storage_reservoirs: (key, value, all) => ({
    capacity_of_energy_flexibility_pumped_storage_electricity: value,
  }),
};

/**
 * Basic formatting of MW values, converting to GW or PW as needed.
 */
const formatMW = (value: number): string => {
  if (value > 1000000) {
    return `${(value / 1000000).toFixed(2)} PW`;
  } else if (value > 10000) {
    return `${Math.round(value / 1000)} GW`;
  } else {
    return `${Math.round(value)} MW`;
  }
};

const formatPercentage = (value: number, precision: number): string => {
  return `${value.toFixed(precision)}%`;
};

const formatBcm = (value: number): string => {
  return `${value.toFixed(1)} bcm`;
};

/**
 * Controls how input values are formatted in the UI.
 */
export const formatTransforms: {
  [k: keyof typeof inputs]: (value: number, precision: number) => string;
} = {
  extra_gas_from_groningen: formatBcm,
  extra_gas_from_eu: formatBcm,
  coal_power_plant_capacity_conventional: formatMW,
  coal_power_plant_capacity_lignite: formatMW,
  lng_imports: formatPercentage,
  rooftop_pv_households: formatPercentage,
  rooftop_pv_buildings: formatPercentage,
  electricity_storage_behind_the_meter: formatPercentage,
  large_scale_storage_batteries: formatMW,
  large_scale_storage_reservoirs: formatMW,
};
