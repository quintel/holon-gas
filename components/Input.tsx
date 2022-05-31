import { useCallback, useEffect, useState } from "react";

import Slider from "./Slider";
import { formatInput } from "../data/inputs";

interface InputProps {
  max: number;
  min: number;
  recommended?: number;
  step?: number;
  name: string;
  formatValue: (value: number, precision: number) => string;
  onChange?: (value: number) => void;
  value: number;
}

/**
 * Given the step value of the slider, calculates an appropriate number of decimal places to use
 * when formatting the value.
 */
const stepToPrecision = (step?: number) => {
  if (step && step > 0 && step < 1) {
    return Math.trunc(Math.log(Math.abs(1 / step)) / Math.log(10));
  }

  return 0;
};

/**
 * A Wrapper around a Slider which abstracts away the application state.
 */
export default function Input({
  formatValue,
  max,
  min,
  name,
  onChange,
  recommended,
  step,
  value,
}: InputProps): React.ReactElement {
  // Store the value of the slider internally. This allows us to show the slider moving, and update
  // the value as the user does so, without triggering an update to the application state until the
  // user finishes moving the slider.
  let [currentValue, setCurrentValue] = useState(value);

  // If the value prop changes, update the internal state.
  useEffect(() => setCurrentValue(value), [value]);

  const onFinalChange = useCallback((value: number) => onChange && onChange(value), [onChange]);

  return (
    <div className="pb-3 last:pb-0">
      <p className="pb-1">{name}</p>
      <div className="flex align-middle">
        <div className="w-3/4 pt-1">
          <Slider
            min={min}
            max={max}
            mark={recommended != null ? recommended : undefined}
            step={step}
            value={currentValue}
            onChange={setCurrentValue}
            onFinalChange={onFinalChange}
          />
        </div>
        <output className="w-1/4 min-w-fit pl-3 text-right tabular-nums">
          {formatValue(currentValue, stepToPrecision(step))}
        </output>
      </div>
    </div>
  );
}
