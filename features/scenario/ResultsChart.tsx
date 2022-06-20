import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useAppSelector } from "../hooks";
import { createFutureResultDeltaSelector, importedRussianGasSelector } from "./scenario-slice";

const reductionToSeries = (reduction: number) => {
  return reduction < 0 ? 0 : reduction;
};

export default function ResultsChart(): React.ReactElement {
  const russianGas = useAppSelector(importedRussianGasSelector);

  const reductionImport = reductionToSeries(
    useAppSelector(createFutureResultDeltaSelector("future_import_natural_gas"))
  );

  const reductionElectricityProduction = reductionToSeries(
    useAppSelector(
      createFutureResultDeltaSelector("reduction_demand_natural_gas_electricity_production")
    )
  );

  const reductionBuildings = reductionToSeries(
    useAppSelector(createFutureResultDeltaSelector("reduction_final_demand_natural_gas_buildings"))
  );

  const reductionHouseholds = reductionToSeries(
    useAppSelector(createFutureResultDeltaSelector("reduction_final_demand_natural_gas_households"))
  );

  const reductionIndustry = reductionToSeries(
    useAppSelector(createFutureResultDeltaSelector("reduction_final_demand_natural_gas_industry"))
  );

  const series = [
    {
      name: "Gas imported from Russia",
      data: [Math.max(0, russianGas)],
    },
    {
      name: "Extra gas production",
      data: [reductionImport],
    },
    {
      name: "Reduction from electricity production",
      data: [reductionElectricityProduction],
    },
    {
      name: "Reduction in buildings",
      data: [reductionBuildings],
    },
    {
      name: "Reduction in households",
      data: [reductionHouseholds],
    },
    {
      name: "Reduction in industry",
      data: [reductionIndustry],
    },
  ];

  const options = {
    chart: {
      animations: {
        easing: "easeinout" as const,
        speed: 1,
        dynamicAnimation: {
          enabled: true,
          speed: 250,
        },
      },
      toolbar: {
        show: false,
      },
      id: "results-chart",
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    colors: ["#9ca3af", "#34d399", "#fbbf24", "#60a5fa", "#f9a8d4", "#a3e635"],
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
      categories: ["Results"],
      labels: { show: false },
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
