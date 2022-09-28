import { useCallback } from "react";
import { RadioGroup } from "@headlessui/react";

import { useAppSelector, useAppDispatch } from "../hooks";
import { setInputValue, createInputSelector, InputKey } from "./scenario-slice";

import InputDescription from "../../components/InputDescription";
import InputTitle from "../../components/InputTitle";

const baseItemClasses = "bg-gray-200 border-gray-200 hover:border-gray-100 hover:bg-gray-100";
const checkedItemClasses =
  "bg-midnight-500 from-white/30 hover:bg-midnight-500 text-white border-midnight-500";

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
    <RadioGroup.Option
      value={value}
      className="relative w-1/3 rounded outline-none first:mr-px last:ml-px focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      {({ checked }) => (
        <div
          className={`${className} ${
            checked ? checkedItemClasses : baseItemClasses
          } cursor-pointer rounded bg-gradient-to-b py-0.5 text-center outline-none transition`}
        >
          {children}
        </div>
      )}
    </RadioGroup.Option>
  );
}

export default function InsulationInput({ id }: { id: InputKey }): React.ReactElement {
  const input = useAppSelector(createInputSelector(id, true));
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (value: number) => dispatch(setInputValue({ key: id, value })),
    [dispatch, id]
  );

  return (
    <div className="pb-4">
      <InputTitle helpText={input.helpText}>{input.name}</InputTitle>
      {input.description && <InputDescription>{input.description}</InputDescription>}
      <RadioGroup
        value={input.value}
        onChange={onChange}
        className="mt-1 flex gap-1 rounded border-4 bg-gray-200 align-middle"
      >
        <Item value={0}>None</Item>
        <Item value={1}>Linear</Item>
        <Item value={2}>Exponential</Item>
      </RadioGroup>
    </div>
  );
}
