import { useCallback } from "react";
import { RadioGroup } from "@headlessui/react";

import { useAppSelector, useAppDispatch } from "../hooks";
import { setInputValue, createInputSelector, InputKey } from "./scenario-slice";

const baseItemClasses = "text-center bg-gray-100 py-0.5 cursor-pointer rounded";
const checkedItemClasses = `${baseItemClasses} bg-blue-500 text-white border-blue-500`;

function Item({
  children,
  value,
}: {
  children: React.ReactNode;
  value: number;
}): React.ReactElement {
  return (
    <RadioGroup.Option value={value} className="w-1/3">
      {({ checked }) => (
        <div className={checked ? checkedItemClasses : baseItemClasses}>{children}</div>
      )}
    </RadioGroup.Option>
  );
}

export default function InsulationInput({ id }: { id: InputKey }): React.ReactElement {
  const input = useAppSelector(createInputSelector(id));
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (value: number) => dispatch(setInputValue({ key: id, value })),
    [dispatch, id]
  );

  return (
    <div className="pb-4">
      <p className="pb-2">{input.name}</p>
      <RadioGroup value={input.value} onChange={onChange} className="flex align-middle gap-2">
        <Item value={0}>None</Item>
        <Item value={1}>Linear</Item>
        <Item value={2}>Exponential</Item>
      </RadioGroup>
    </div>
  );
}
