import { useAppSelector, useAppDispatch } from "../hooks";
import { setInputValue, createInputSelector } from "./inputsSlice";

import StatelessInput from "../../components/Input";

export default function Input({ id }: { id: string }): React.ReactElement {
  const input = useAppSelector(createInputSelector(id));
  const dispatch = useAppDispatch();
  const value = input.user || input.default;

  return (
    <StatelessInput
      {...input}
      key={id}
      name={input.name}
      value={value}
      onChange={(newValue) => {
        if (value !== newValue) dispatch(setInputValue({ key: id, value: newValue }));
      }}
    />
  );
}
