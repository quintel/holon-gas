import { useCallback } from "react";
import { RadioGroup } from "@headlessui/react";

import { useAppSelector, useAppDispatch } from "../hooks";
import { setInputValue, createInputSelector, InputKey } from "./scenario-slice";

const baseItemClasses = "text-center py-0.5 border-2 rounded cursor-pointer";
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
    <div className="pb-3">
      <p className="pb-1">{input.name}</p>
      <RadioGroup value={input.value} onChange={onChange} className="flex align-middle gap-3">
        <Item value={0}>None</Item>
        <Item value={1}>Some</Item>
        <Item value={2}>Lots</Item>
      </RadioGroup>
    </div>
  );
}
