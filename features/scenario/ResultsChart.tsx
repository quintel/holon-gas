import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useAppSelector } from "../hooks";
import { createFutureResultDeltaSelector, importedRussianGasSelector } from "./scenario-slice";

export default function ResultsChart(): React.ReactElement {
  const russianGas = useAppSelector(importedRussianGasSelector);

  // Increased production

  const importedLng = useAppSelector(createFutureResultDeltaSelector("import_lng_bcm"));

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
      data: [Math.max(0, russianGas)],
    },
    {
      name: "Extra imported LNG",
      data: [Math.max(0, importedLng)],
    },
    {
      name: "Extra green gas production",
      data: [Math.max(0, increaseGreenGas)],
    },
    {
      name: "Extra natural gas production",
      data: [Math.max(0, increaseNaturalGas)],
    },
    {
      name: "Reduction from electricity production",
      data: [Math.max(0, reductionElectricityProduction)],
    },
    {
      name: "Reduction in buildings",
      data: [Math.max(0, reductionBuildings)],
    },
    {
      name: "Reduction in households",
      data: [Math.max(0, reductionHouseholds)],
    },
    {
      name: "Reduction in industry",
      data: [Math.max(0, reductionIndustry)],
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
      fontFamily:
        "InterVariable, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
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
    colors: [
      "#9ca3af",
      "#a6c0f3",
      "#7f9feb",
      "#5f7de3",
      "#34d399",
      "#fbbf24",
      "#f9a8d4",
      "#a3e635",
    ],
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
