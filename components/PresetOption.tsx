import { RadioGroup } from "@headlessui/react";

const commonClasses =
  "py-1 border px-3 bg-gradient-to-b rounded cursor-pointer font-medium mb-2 transition";
const baseClasses = `${commonClasses} border-white bg-white text-gray-900`;
const checkedClasses = `${commonClasses} border-blue-500 bg-blue-500 from-white/30 text-white`;

interface Props {
  title: string;
  value: string;
}

export default function PresetOptions({ title, value }: Props): React.ReactElement {
  return (
    <RadioGroup.Option
      value={value}
      className="rounded ring-blue-300 ring-offset-2 focus-visible:ring"
    >
      {({ checked }) => <div className={checked ? checkedClasses : baseClasses}>{title}</div>}
    </RadioGroup.Option>
  );
}
