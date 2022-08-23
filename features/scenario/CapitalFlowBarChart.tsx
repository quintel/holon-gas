import { useAppSelector } from "../hooks";
import { importedRussianGasSelector } from "./scenario-slice";

import { RUSSIAN_GAS_PRICE } from "../../data/queries";

import ColorBandedBarChart from "../../components/ColorBandedBarChart";

/**
 * Formats EUR values in column charts.
 */
function formatEuros(value: number): string {
  return `€${Math.round(value * 100) / 100} billion`;
}

export default function CapitalFlowBarChart(): React.ReactElement {
  const russianGas = useAppSelector(importedRussianGasSelector);
  const capitalFlow = Math.max(0, russianGas * RUSSIAN_GAS_PRICE);

  return (
    <ColorBandedBarChart
      value={capitalFlow}
      bands={[{ color: "indigo" }]}
      max={400}
      formatter={formatEuros}
      tickAmount={4}
    />
  );
}
