import { useState } from "react";
import Slider from "./Slider";

interface Props {
  children: React.ReactNode;
  initialValue: number;
  mark?: number;
}

export default function ExampleSlider({ initialValue, mark, children }: Props) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="rounded border-2 p-4 pb-2">
      <Slider min={0} max={100} step={1} value={value} mark={mark} onChange={setValue} />
      {children}
    </div>
  );
}
