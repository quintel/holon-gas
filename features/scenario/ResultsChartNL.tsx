import { useAppSelector } from "../hooks";

import {
  createFutureResultDeltaSelector,
  createInputSelector,
  importedRussianGasSelectorWithoutProduction,
} from "./scenario-slice";

import ResultsChart from "./ResultsChart";

import type { Input } from "../../data/inputs";

// All EU values are multiplied by this to arrive at the NL values.
const nlMultiplier = 0.0675;

function inputChangeDelta(input: Input) {
  return input.value - input.min;
}

export default function ResultsChartNL(): React.ReactElement {
  let russianGas = useAppSelector(importedRussianGasSelectorWithoutProduction) * nlMultiplier;

  // Increased production

  const importedLng = Math.max(
    0,
    useAppSelector(createInputSelector("lng_imports")).value * nlMultiplier
  );

  const increaseGreenGas = Math.max(
    0,
    useAppSelector(createFutureResultDeltaSelector("production_green_gas_bcm")) * nlMultiplier
  );

  // Decreased demand.

  const reductionElectricityProduction = Math.max(
    0,
    -useAppSelector(createFutureResultDeltaSelector("natural_gas_electricity_production_bcm")) *
      nlMultiplier
  );

  const reductionBuildings = Math.max(
    0,
    -useAppSelector(createFutureResultDeltaSelector("final_demand_natural_gas_buildings_bcm")) *
      nlMultiplier
  );

  const reductionHouseholds = Math.max(
    0,
    -useAppSelector(createFutureResultDeltaSelector("final_demand_natural_gas_households_bcm")) *
      nlMultiplier
  );

  const reductionIndustry = Math.max(
    0,
    -useAppSelector(createFutureResultDeltaSelector("final_demand_natural_gas_industry_bcm")) *
      nlMultiplier
  );

  // Gas from Groningen should be applied entirely to NL. We can't get that from the query results
  // and so read the sliders directly.
  let increaseDomesticNaturalGas = Math.max(
    0,
    inputChangeDelta(useAppSelector(createInputSelector("extra_gas_from_groningen")))
  );

  const increaseForeignNaturalGas = Math.max(
    0,
    inputChangeDelta(useAppSelector(createInputSelector("extra_gas_from_eu"))) * nlMultiplier
  );

  // Keep from Groningen only what is needed to remove all Russian gas.
  increaseDomesticNaturalGas = Math.min(
    increaseDomesticNaturalGas,
    Math.max(0, russianGas - increaseForeignNaturalGas)
  );

  // Reduce Russian gas by increased production.
  russianGas = Math.max(russianGas - increaseDomesticNaturalGas - increaseForeignNaturalGas, 0);

  const increaseNaturalGas = increaseDomesticNaturalGas + increaseForeignNaturalGas;

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
