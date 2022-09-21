import custom from "./custom";
import ec from "./ec";
import iea from "./iea";

const presets = { custom, ec, iea } as const;

export default presets;
export type PresetKey = keyof typeof presets;
