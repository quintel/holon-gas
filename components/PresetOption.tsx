import { RadioGroup } from "@headlessui/react";

// const commonClasses = "py-1 px-3 bg-gradient-to-b rounded cursor-pointer font-medium transition";
// const baseClasses = `${commonClasses} bg-white text-gray-900`;
// const checkedClasses = `${commonClasses} bg-blue-500 from-white/30 text-white`;
const commonClasses = "cursor-pointer font-medium";
const baseClasses = `${commonClasses} text-gray-800`;
const checkedClasses = `${commonClasses} text-green-700`;

function Pill({ checked }: { checked: boolean }) {
  const borderWidth = checked ? "10px" : "2px";
  const colorClasses = checked
    ? "text-green-600"
    : "text-gray-400 group-hover:text-gray-500 transition-colors";

  return (
    <div
      className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full ${colorClasses}`}
      style={{ boxShadow: `inset 0 0 0 ${borderWidth} currentColor` }}
    >
      <svg
        viewBox="0 0 12 10"
        className="h-3 w-3 text-gray-200"
        style={{
          fill: "none",
          strokeWidth: 2,
          stroke: "currentcolor",
          strokeDasharray: 16,
          strokeDashoffset: 0,
        }}
      >
        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
      </svg>
    </div>
  );
}

interface Props {
  title: string;
  value: string;
}

export default function PresetOptions({ title, value }: Props): React.ReactElement {
  return (
    <RadioGroup.Option
      value={value}
      className="group mb-2 rounded outline-none ring-blue-300 ring-offset-2 ring-offset-gray-200 focus-visible:ring"
    >
      {({ checked }) => (
        <div className="flex items-center">
          <Pill checked={checked} />
          {/* {checked ? <CheckedPill /> : <UncheckedPill />} */}
          <div className={checked ? checkedClasses : baseClasses}>{title}</div>
        </div>
      )}
    </RadioGroup.Option>
  );
}
