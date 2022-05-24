import React from "react";

import { Range } from "react-range";

interface SliderProps {
  max: number;
  min: number;
  step?: number;
  onChange?: (value: number[]) => void;
  onFinalChange?: (value: number[]) => void;
  values: number[];
}

const Slider: React.FC<SliderProps> = ({ max, min, step, onChange, onFinalChange, values }) => {
  const percent = (100 * (values[0] - min)) / (max - min);

  return (
    <Range
      min={min}
      max={max}
      step={step}
      values={values}
      onChange={onChange || (() => {})}
      onFinalChange={onFinalChange || (() => {})}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          className="w-full -mt-2 h-6 pt-2 cursor-pointer"
        >
          <div {...props} className="bg-gray-200 h-1.5 rounded">
            <div className="bg-blue-500 h-1.5 rounded absolute" style={{ width: `${percent}%` }} />
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          className="w-3.5 h-3.5 bg-blue-500 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        />
      )}
    />
  );
};

export default Slider;
