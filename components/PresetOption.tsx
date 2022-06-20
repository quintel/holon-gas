import { RadioGroup } from "@headlessui/react";

const baseClasses = "py-1 px-3 rounded cursor-pointer font-semibold bg-white mb-2";
const checkedClasses = `${baseClasses} bg-gradient-to-b from-blue-400 to-blue-500 text-white`;

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
