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
  injection_of_biomethane_in_gas_mix: (key, value, all) => ({
    green_gas_total_share: value / 100,
  }),
  green_hydrogen_as_an_alternative: (key, value, all) => ({
    capacity_of_energy_hydrogen_wind_turbine_offshore: value,
    capacity_of_energy_power_combined_cycle_hydrogen: value,
  }),
  /**
   * Savings at home and in the office
   */
  electricity_storage_behind_the_meter: (key, value, all) => ({
    households_flexibility_p2p_electricity_market_penetration: value,
  }),
  /**
   * Other
   */
  large_scale_storage: (key, value, all) => ({
    capacity_of_energy_flexibility_mv_batteries_electricity: value,
  }),
};
