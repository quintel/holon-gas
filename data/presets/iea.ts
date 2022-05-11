import { PresetSchema } from "../inputs";

const preset: PresetSchema = {
  key: "iea",

  // Gas production
  extra_gas_from_groningen: 25,
  extra_gas_from_eu: 25,

  // Other production
  reuse_of_coal_fired_power_stations: 25,
  injection_of_biomethane_in_gas_mix: 25,
  green_hydrogen_as_an_alternative: 25,

  // Savings at home and in business
  insulate_buildings: 25,
  optimal_boiler_settings: 25,
  purchase_solar_collectors: 25,
  population_percentage: 25,
  number_of_degrees_lower: 25,
  switch_to_heat_pumps: 25,
  pv_on_roofs: 25,
  electricity_storage_behind_the_meter: 25,

  // Other
  large_scale_storage: 25,
  closure_of_industry_with_gas: 25,
  bio_methane_as_raw_material: 25,
};

export default preset;
