import { PresetSchema } from "../inputs";

const preset: PresetSchema = {
  key: "nvde",

  // Gas production
  extra_gas_from_groningen: 75,
  extra_gas_from_eu: 75,

  // Other production
  reuse_of_coal_fired_power_stations: 75,
  injection_of_biomethane_in_gas_mix: 75,
  green_hydrogen_as_an_alternative: 75,

  // Savings at home and in business
  insulate_buildings: 75,
  optimal_boiler_settings: 75,
  purchase_solar_collectors: 75,
  population_percentage: 75,
  number_of_degrees_lower: 75,
  switch_to_heat_pumps: 75,
  pv_on_roofs: 75,
  electricity_storage_behind_the_meter: 75,

  // Other
  large_scale_storage: 75,
  closure_of_industry_with_gas: 75,
  bio_methane_as_raw_material: 75,
};

export default preset;
