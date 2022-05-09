import React from "react";

import { Slider as ReachSlider } from "@reach/slider";
import "@reach/slider/styles.css";

interface SliderProps {
  max: number;
  min: number;
  onChange?: (value: number) => void;
  value: number;
}

const Slider: React.FC<SliderProps> = ({ max, min, onChange, value }) => {
  return <ReachSlider min={min} max={max} value={value} onChange={onChange} />;
};

export default Slider;
