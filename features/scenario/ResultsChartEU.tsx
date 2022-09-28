import { useAppSelector } from "../hooks";

import {
  createFutureResultDeltaSelector,
  createInputSelector,
  importedRussianGasSelector,
} from "./scenario-slice";

import ResultsChart from "./ResultsChart";

export default function ResultsChartEU(): React.ReactElement {
  const russianGas = useAppSelector(importedRussianGasSelector);

  // Increased production

  const importedLng = useAppSelector(createInputSelector("lng_imports")).value;

  const increaseGreenGas = useAppSelector(
    createFutureResultDeltaSelector("production_green_gas_bcm")
  );

  const increaseNaturalGas = useAppSelector(
    createFutureResultDeltaSelector("production_natural_gas_bcm")
  );

  // Decreased demand.

  const reductionElectricityProduction = -useAppSelector(
    createFutureResultDeltaSelector("natural_gas_electricity_production_bcm")
  );

  const reductionBuildings = -useAppSelector(
    createFutureResultDeltaSelector("final_demand_natural_gas_buildings_bcm")
  );

  const reductionHouseholds = -useAppSelector(
    createFutureResultDeltaSelector("final_demand_natural_gas_households_bcm")
  );

  const reductionIndustry = -useAppSelector(
    createFutureResultDeltaSelector("final_demand_natural_gas_industry_bcm")
  );

  const series = [
    {
      name: "Gas imported from Russia",
      value: russianGas,
    },
    {
      name: "Extra imported LNG",
      value: importedLng,
    },
    {
      name: "Extra green gas production",
      value: increaseGreenGas,
    },
    {
      name: "Extra natural gas production",
      value: increaseNaturalGas,
    },
    {
      name: "Reduction from electricity production",
      value: reductionElectricityProduction,
    },
    {
      name: "Reduction in buildings",
      value: reductionBuildings,
    },
    {
      name: "Reduction in households",
      value: reductionHouseholds,
    },
    {
      name: "Reduction in industry",
      value: reductionIndustry,
    },
  ];

  return <ResultsChart series={series} />;
}
