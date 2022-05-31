import React from "react";

import ReactSlider from "react-slider";

interface SliderProps {
  max: number;
  min: number;
  mark?: number;
  step?: number;
  onChange?: (value: number, index?: number) => void;
  onFinalChange?: (value: number, index?: number) => void;
  value: number;
}

const Slider: React.FC<SliderProps> = ({
  max,
  min,
  mark,
  step,
  onChange,
  onFinalChange,
  value,
}) => {
  return (
    <ReactSlider
      min={min}
      max={max}
      step={step}
      value={value}
      marks={mark != undefined ? [mark] : undefined}
      onChange={onChange || (() => {})}
      onAfterChange={onFinalChange || (() => {})}
      renderMark={(props) => (
        <span {...props} className={mark && mark > value ? "mark" : "mark active-mark"} />
      )}
    />
  );
};

export default Slider;
