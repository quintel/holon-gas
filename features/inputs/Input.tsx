import { useAppSelector, useAppDispatch } from "../hooks";
import { setInputValue, createInputSelector, InputKey } from "./inputsSlice";

import StatelessInput from "../../components/Input";

export default function Input({ id }: { id: InputKey }): React.ReactElement {
  const input = useAppSelector(createInputSelector(id));
  const dispatch = useAppDispatch();

  return (
    <StatelessInput
      {...input}
      key={id}
      name={input.name}
      value={input.value}
      onChange={(newValue) => {
        if (input.value !== newValue) dispatch(setInputValue({ key: id, value: newValue }));
      }}
    />
  );
}
