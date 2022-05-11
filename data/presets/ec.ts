import { PresetSchema } from "../inputs";

const preset: PresetSchema = {
  key: "ec",

  // Gas production
  extra_gas_from_groningen: 50,
  extra_gas_from_eu: 50,

  // Other production
  reuse_of_coal_fired_power_stations: 50,
  injection_of_biomethane_in_gas_mix: 50,
  green_hydrogen_as_an_alternative: 50,

  // Savings at home and in business
  insulate_buildings: 50,
  optimal_boiler_settings: 50,
  purchase_solar_collectors: 50,
  population_percentage: 50,
  number_of_degrees_lower: 50,
  switch_to_heat_pumps: 50,
  pv_on_roofs: 50,
  electricity_storage_behind_the_meter: 50,

  // Other
  large_scale_storage: 50,
  closure_of_industry_with_gas: 50,
  bio_methane_as_raw_material: 50,
};

export default preset;
