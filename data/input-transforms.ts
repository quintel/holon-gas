import inputs from "./inputs";

// Converts 1 bcm of gas to PJ. In ETM all energy flows are in lower heating value (LHV), therefore
// we have to use the LHV caloric value to calculate the volume LHV caloric values = 31.65 MJ / m3
const bcmPerPJ = 31.65;

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
    capacity_of_energy_power_supercritical_coal: 105009.9 * (value / 100),
  }),
  coal_power_plant_capacity_lignite: (key, value, all) => ({
    capacity_of_energy_power_ultra_supercritical_lignite: 41918.8 * (value / 100),
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
  renewable_energy_capacity: (key, value, all) => ({
    capacity_of_energy_power_wind_turbine_inland: 0.611459 * value,
    capacity_of_energy_power_wind_turbine_offshore: 0.047478 * value,
    capacity_of_energy_power_solar_pv_solar_radiation: 0.341062 * value,
  }),
  /**
   * Savings at home and in the office
   */
  electricity_storage_behind_the_meter: (key, value, all) => ({
    households_flexibility_p2p_electricity_market_penetration: value,
  }),
  insulation: (key, index, all) => {
    // The insulation slider maps 0 to no growth, 1 to linear, and 2 to exponential growth. Each
    // value is included in an array in order.
    const values = {
      households_insulation_level_apartments: [15.7, 16.038, 16.077],
      households_insulation_level_corner_houses: [21.1, 22.6125, 23.47],
      households_insulation_level_detached_houses: [13.1, 13.363, 13.383],
      households_insulation_level_semi_detached_houses: [13.2, 13.225, 13.225],
      households_insulation_level_terraced_houses: [21.0, 22.0, 22.288],
      buildings_insulation_level: [46.2, 48.375, 49.024],
    };

    return Object.entries(values).reduce((acc, [k, v]) => {
      acc[k] = v[index];
      return acc;
    }, {} as Record<string, number>);
  },
  growth_of_installed_heat_pumps: (key, value, all) => ({
    households_heater_heatpump_air_water_electricity_share: 11.8 * (1 + value / 100),
    households_heater_heatpump_ground_water_electricity_share: 3.0 * (1 + value / 100),
    buildings_space_heater_heatpump_air_water_network_gas_share: 1.5 * (1 + value / 100),
    buildings_space_heater_heatpump_air_water_electricity_share: 11.1 * (1 + value / 100),
  }),
  thermostat_settings_percentage: (key, value, all) => ({
    // We don't need to transform thermostat_settings_reduce_temperature since both sliders affect
    // the same ETM input.
    households_useful_demand_heat_per_person: -(
      0.1507 *
      all.thermostat_settings_reduce_temperature.value *
      (value / 100)
    ),
  }),
  /**
   * Other
   */
  rooftop_pv_households: (key, value, all) => ({
    households_solar_pv_solar_radiation_market_penetration: value,
  }),
  rooftop_pv_buildings: (key, value, all) => ({
    buildings_solar_pv_solar_radiation_market_penetration: value,
  }),
  large_scale_storage_batteries: (key, value, all) => ({
    capacity_of_energy_flexibility_mv_batteries_electricity: value,
  }),
  large_scale_storage_reservoirs: (key, value, all) => ({
    capacity_of_energy_flexibility_pumped_storage_electricity: value,
  }),
  solar_thermal_collectors: (key, value, all) => ({
    households_water_heater_solar_thermal_share: value,
  }),
  replacement_of_gas_by_oil_in_chemical_industry: (key, value, all) => ({
    industry_chemicals_other_crude_oil_non_energetic_share: 88.8 + (value / 100) * 11.2,
    industry_chemicals_other_network_gas_non_energetic_share: 11.2 - (value / 100) * 11.2,
  }),
  closure_of_fertiliser_industry: (key, value, all) => ({
    industry_useful_demand_for_chemical_other: 100 - value,
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

const formatCelcius = (value: number, precision: number): string => {
  return `${value.toFixed(precision)}°C`;
};

/**
 * The insulation slider is a special case and uses a number internally, which maps to a
 * human-readable label.
 */
const formatInsulation = (value: number): string => {
  switch (value) {
    case 1:
      return "Linear growth";
    case 2:
      return "Exponential growth";
    default:
      return "No growth";
  }
};

/**
 * Controls how input values are formatted in the UI.
 */
export const formatTransforms: {
  [k: keyof typeof inputs]: (value: number, precision: number) => string;
} = {
  extra_gas_from_groningen: formatBcm,
  extra_gas_from_eu: formatBcm,
  coal_power_plant_capacity_conventional: formatPercentage,
  coal_power_plant_capacity_lignite: formatPercentage,
  lng_imports: formatPercentage,
  renewable_energy_capacity: formatMW,
  rooftop_pv_households: formatPercentage,
  rooftop_pv_buildings: formatPercentage,
  insulation: formatInsulation,
  growth_of_installed_heat_pumps: formatPercentage,
  thermostat_settings_percentage: formatPercentage,
  thermostat_settings_reduce_temperature: formatCelcius,
  electricity_storage_behind_the_meter: formatPercentage,
  large_scale_storage_batteries: formatMW,
  large_scale_storage_reservoirs: formatMW,
  green_hydrogen: formatMW,
  injection_of_biomethane_in_gas_mix: formatPercentage,
  solar_thermal_collectors: formatPercentage,
  replacement_of_gas_by_oil_in_chemical_industry: formatPercentage,
  closure_of_fertiliser_industry: formatPercentage,
};
