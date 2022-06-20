import { useCallback, useEffect, useState } from "react";

import Slider from "./Slider";
import InputDescription from "./InputDescription";
import InputTitle from "./InputTitle";

interface InputProps {
  description?: string;
  formatValue: (value: number, precision: number) => string;
  helpText?: string;
  max: number;
  min: number;
  name: string;
  onChange?: (value: number) => void;
  recommended?: number;
  step?: number;
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
  description,
  formatValue,
  helpText,
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
    <div className="pb-4 last:pb-0">
      <InputTitle helpText={helpText}>{name}</InputTitle>
      {description && <InputDescription>{description}</InputDescription>}
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
