import custom from "./custom";
import ec from "./ec";
import iea from "./iea";
import nvde from "./nvde";

const presets = { custom, ec, iea, nvde } as const;

export default presets;
export type PresetKey = keyof typeof presets;
