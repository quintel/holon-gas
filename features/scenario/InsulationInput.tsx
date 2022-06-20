import { useCallback } from "react";
import { RadioGroup } from "@headlessui/react";

import { useAppSelector, useAppDispatch } from "../hooks";
import { setInputValue, createInputSelector, InputKey } from "./scenario-slice";

import InputDescription from "../../components/InputDescription";
import InputTitle from "../../components/InputTitle";

const baseItemClasses = "bg-gray-200 hover:bg-gray-300";
const checkedItemClasses =
  "bg-gradient-to-b from-blue-400 to-blue-500 hover:bg-blue-500 text-white border-blue-500";

function Item({
  children,
  className,
  value,
}: {
  children: React.ReactNode;
  className?: string;
  value: number;
}): React.ReactElement {
  return (
    <RadioGroup.Option value={value} className="w-1/3">
      {({ checked }) => (
        <div
          className={`${className} ${
            checked ? checkedItemClasses : baseItemClasses
          } cursor-pointer py-0.5 text-center transition`}
        >
          {children}
        </div>
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
      <InputTitle helpText={input.helpText}>{input.name}</InputTitle>
      {input.description && <InputDescription>{input.description}</InputDescription>}
      <RadioGroup value={input.value} onChange={onChange} className="mt-1 flex align-middle">
        <Item value={0} className="mr-px rounded-l">
          None
        </Item>
        <Item value={1}>Linear</Item>
        <Item value={2} className="ml-px rounded-r">
          Exponential
        </Item>
      </RadioGroup>
    </div>
  );
}
