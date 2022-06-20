import { useAppSelector } from "../hooks";
import { createFutureResultDeltaSelector } from "./scenario-slice";

import { INITIAL_RUSSIAN_GAS, RUSSIAN_GAS_PRICE } from "../../data/queries";

import ColorBandedBarChart from "../../components/ColorBandedBarChart";

/**
 * Formats EUR values in column charts.
 */
function formatEuros(value: number): string {
  return `€${Math.round(value * 100) / 100} billion`;
}

export default function CapitalFlowBarChart(): React.ReactElement {
  const reductionElectricityProduction = useAppSelector(
    createFutureResultDeltaSelector("reduction_demand_natural_gas_electricity_production")
  );

  const reductionBuildings = useAppSelector(
    createFutureResultDeltaSelector("reduction_final_demand_natural_gas_buildings")
  );

  const reductionHouseholds = useAppSelector(
    createFutureResultDeltaSelector("reduction_final_demand_natural_gas_households")
  );

  const reductionIndustry = useAppSelector(
    createFutureResultDeltaSelector("reduction_final_demand_natural_gas_industry")
  );

  const russianGas =
    INITIAL_RUSSIAN_GAS -
    reductionElectricityProduction -
    reductionBuildings -
    reductionHouseholds -
    reductionIndustry;

  const capitalFlow = Math.max(0, russianGas * RUSSIAN_GAS_PRICE);

  return (
    <ColorBandedBarChart
      value={capitalFlow}
      bands={[{ color: "blue" }]}
      max={400}
      formatter={formatEuros}
      tickAmount={4}
    />
  );
}