import { useCallback } from "react";

import { RadioGroup } from "@headlessui/react";

import PresetOption from "../../components/PresetOption";
import ResetButton from "./ResetButton";
import { useAppSelector, useAppDispatch } from "../hooks";
import { presetSelector, setPreset } from "./scenario-slice";

import { PresetKey } from "../../data/presets";

export default function PresetSelection(): React.ReactElement {
  const currentPreset = useAppSelector(presetSelector) || "custom";

  const dispatch = useAppDispatch();

  const onChange = useCallback((preset: PresetKey) => dispatch(setPreset(preset)), [dispatch]);

  return (
    <div className="mb-6 rounded bg-gray-200 p-6 pb-4" id="presets">
      <div className="flex items-center justify-between">
        <h2 className="mb-3 text-lg">Presets</h2>
        <div className="-mt-2">
          <ResetButton />
        </div>
      </div>
      <p className="mb-3">
        Different organisations have their own approaches lined up to reduce dependence on Russian
        gas. Try one below, or create your own scenario:
      </p>
      <RadioGroup value={currentPreset} onChange={onChange}>
        <PresetOption key="iea" value="iea" title="International Energy Agency (IEA)" />
        <PresetOption key="ec" value="ec" title="European Commission" />
        <PresetOption key="custom" value="custom" title="Custom" />
      </RadioGroup>
    </div>
  );
}
