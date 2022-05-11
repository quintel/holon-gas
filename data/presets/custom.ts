import { PresetSchema } from "../inputs";

const preset: PresetSchema = {
  key: "custom",

  // Gas production
  extra_gas_from_groningen: 0,
  extra_gas_from_eu: 0,

  // Other production
  reuse_of_coal_fired_power_stations: 0,
  injection_of_biomethane_in_gas_mix: 0,
  green_hydrogen_as_an_alternative: 0,

  // Savings at home and in business
  insulate_buildings: 0,
  optimal_boiler_settings: 0,
  purchase_solar_collectors: 0,
  population_percentage: 0,
  number_of_degrees_lower: 0,
  switch_to_heat_pumps: 0,
  pv_on_roofs: 0,
  electricity_storage_behind_the_meter: 0,

  // Other
  large_scale_storage: 0,
  closure_of_industry_with_gas: 0,
  bio_methane_as_raw_material: 0,
};

export default preset;
