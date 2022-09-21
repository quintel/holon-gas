import { PresetSchema } from "../inputs";
import presetWithDefaults from "./preset-with-defaults";

const preset: PresetSchema = {
  key: "iea",
  values: {
    gas_cost: 188,
    extra_gas_from_groningen: 12,
    extra_gas_from_eu: 29.7,
    lng_imports: 20,
    renewable_energy_capacity: 295040,
    growth_of_installed_heat_pumps: 8.3,
    insulation: 1,
    thermostat_settings_percentage: 74,
    thermostat_settings_reduce_temperature: 1,
  },
};

export default presetWithDefaults(preset);
