import { useAppSelector, useAppDispatch } from "../hooks";
import { setInputValue, createInputSelector, InputKey } from "./scenario-slice";
import { formatInput } from "../../data/inputs";

import StatelessInput from "../../components/Input";

export default function Input({ id }: { id: InputKey }): React.ReactElement {
  const input = useAppSelector(createInputSelector(id));
  const dispatch = useAppDispatch();

  const formatValue = (value: number, precision: number) => {
    return formatInput(id, value, precision);
  };

  return (
    <StatelessInput
      {...input}
      key={id}
      helpText={input.helpText}
      description={input.description}
      name={input.name}
      value={input.value}
      recommended={input.recommended}
      formatValue={formatValue}
      onChange={(newValue) => {
        if (input.value !== newValue) dispatch(setInputValue({ key: id, value: newValue }));
      }}
    />
  );
}
