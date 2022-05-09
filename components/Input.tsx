import { useState } from "react";

import Slider from "./Slider";

interface InputProps {
  defaultValue?: number;
  max: number;
  min: number;
  name: string;
}

/**
 * A Wrapper around a Slider which abstracts away the application state.
 */
export default function Input({
  defaultValue,
  max,
  min,
  name,
}: InputProps): React.ReactElement {
  const [value, setValue] = useState(defaultValue || min);

  return (
    <div>
      <p className="pb-2 -mb-1">{name}</p>
      <div className="flex align-middle">
        <div className="w-5/6 pt-1">
          <Slider min={min} max={max} value={value} onChange={setValue} />
        </div>
        <output className="w-1/6 min-w-fit pl-3 text-right tabular-nums">
          {value}
        </output>
      </div>
    </div>
  );
}
