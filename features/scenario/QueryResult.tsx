import { useAppSelector } from "../hooks";
import { createFutureResultSelector, requestStateSelector } from "./scenario-slice";

interface Props {
  query: string;
  formatter: (value: number) => string;
}

export default function QueryResult({ query, formatter }: Props): React.ReactElement {
  const { isLoading } = useAppSelector(requestStateSelector);
  const value = useAppSelector(createFutureResultSelector(query));

  return (
    <output className={`transition ${isLoading ? "opacity-50" : ""}`}>{formatter(value)}</output>
  );
}
