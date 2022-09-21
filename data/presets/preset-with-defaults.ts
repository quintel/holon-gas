import inputs from "../inputs";
import { PresetSchema } from "../inputs";

/**
 * Takes a preset and fills in any missing input values with the defaults. This ensures that setting
 * the preset rests all the inputs to their default values. This is not always desired (such as the
 * "custom" preset which should leave any unspecified inputs as they are).
 */
export default function presetWithDefaults(preset: PresetSchema) {
  const presetWithDefaults = { ...preset, values: { ...preset.values } };

  for (const key in inputs) {
    if (presetWithDefaults.values[key] === undefined) {
      presetWithDefaults.values[key] = inputs[key].value;
    }
  }

  return presetWithDefaults;
}
