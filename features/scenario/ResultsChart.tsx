import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useAppSelector } from "../hooks";
import { createFutureResultSelector } from "./scenario-slice";

import { INITIAL_RUSSIAN_GAS } from "../../data/queries";

const reductionToSeries = (reduction: number) => {
  return reduction < 0 ? -reduction : 0;
};

export default function ResultsChart(): React.ReactElement {
  const reductionElectricityProduction = useAppSelector(
    createFutureResultSelector("reduction_demand_natural_gas_electricity_production")
  );

  const reductionBuildings = useAppSelector(
    createFutureResultSelector("reduction_final_demand_natural_gas_buildings")
  );

  const reductionHouseholds = useAppSelector(
    createFutureResultSelector("reduction_final_demand_natural_gas_households")
  );

  const reductionIndustry = useAppSelector(
    createFutureResultSelector("reduction_final_demand_natural_gas_industry")
  );

  const russianGas =
    INITIAL_RUSSIAN_GAS +
    reductionElectricityProduction +
    reductionBuildings +
    reductionHouseholds +
    reductionIndustry;

  const series = [
    {
      name: "Gas imported from Russia",
      data: [INITIAL_RUSSIAN_GAS, Math.max(0, russianGas)],
    },
    {
      name: "Reduction from electricity production",
      data: [0, reductionToSeries(reductionElectricityProduction)],
    },
    {
      name: "Reduction in buildings",
      data: [0, reductionToSeries(reductionBuildings)],
    },
    {
      name: "Reduction in households",
      data: [0, reductionToSeries(reductionHouseholds)],
    },
    {
      name: "Reduction in industry",
      data: [0, reductionToSeries(reductionIndustry)],
    },
  ];

  const options = {
    chart: {
      animations: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      id: "results-chart",
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "75%",
      },
    },
    colors: ["#9ca3af", "#34d399", "#c4b5fd", "#60a5fa", "#f9a8d4", "#fbbf24"],
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter(value: number) {
          return `${Math.round(value * 100) / 100} bcm`;
        },
      },
    },
    xaxis: {
      categories: ["Before", "After"],
    },
    yaxis: {
      title: {
        text: "Volume (bcm)",
        style: {
          fontSize: "12px",
          fontWeight: 400,
        },
      },
      labels: {
        formatter(value: number) {
          return value.toFixed(1);
        },
        style: {
          fontSize: "0.875rem",
        },
      },
      forceNiceScale: true,
    },
  };

  return <Chart options={options} series={series} type="bar" height={350} />;
}
