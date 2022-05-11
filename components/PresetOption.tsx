import { RadioGroup } from "@headlessui/react";

const baseClasses = "py-1 px-3 rounded cursor-pointer font-semibold bg-white mb-2";
const checkedClasses = `${baseClasses} bg-blue-500 text-white`;

interface Props {
  title: string;
  value: string;
}

export default function PresetOptions({ title, value }: Props): React.ReactElement {
  return (
    <RadioGroup.Option
      value={value}
      className="focus-visible:ring ring-offset-2 ring-blue-300 rounded"
    >
      {({ checked }) => <div className={checked ? checkedClasses : baseClasses}>{title}</div>}
    </RadioGroup.Option>
  );
}
