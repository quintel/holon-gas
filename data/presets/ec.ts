import { PresetSchema } from "../inputs";
import presetWithDefaults from "./preset-with-defaults";

const preset: PresetSchema = {
  key: "ec",
  values: {
    gas_cost: 188,
    lng_imports: 50,
    injection_of_biomethane_in_gas_mix: 5.5,
    thermostat_settings_percentage: 61,
    thermostat_settings_reduce_temperature: 2,
    rooftop_pv_households: 10.6,
    rooftop_pv_buildings: 10,
    growth_of_installed_heat_pumps: 14.7,
    renewable_energy_capacity: 295040,
  },
};

export default presetWithDefaults(preset);
