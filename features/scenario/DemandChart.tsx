import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useAppSelector } from "../hooks";
import { createInitialResultSelector, createFutureResultSelector } from "./scenario-slice";

const CHART_QUERIES = [
  "gas_agriculture_in_mekko_of_primary_demand_bcm",
  "gas_buildings_in_mekko_of_primary_demand_bcm",
  "gas_bunkers_in_mekko_of_primary_demand_bcm",
  "gas_export_in_mekko_of_primary_demand_bcm",
  "gas_households_in_mekko_of_primary_demand_bcm",
  "gas_industry_in_mekko_of_primary_demand_bcm",
  "gas_other_in_mekko_of_primary_demand_bcm",
  "gas_transport_in_mekko_of_primary_demand_bcm",
];

const useResults = (
  appSelector: typeof useAppSelector,
  selector: typeof createFutureResultSelector
) => {
  const results: Record<string, number> = {};

  for (const query of CHART_QUERIES) {
    results[query] = appSelector(selector(query));
  }

  return results;
};

export default function ResultsChart(): React.ReactElement {
  const initial = useResults(useAppSelector, createInitialResultSelector);
  const initialSum = Object.values(initial).reduce((a, b) => a + b, 0);

  const future = useResults(useAppSelector, createFutureResultSelector);

  const series = [
    {
      name: "Agriculture",
      data: [future.gas_agriculture_in_mekko_of_primary_demand_bcm],
    },
    {
      name: "Buildings",
      data: [future.gas_buildings_in_mekko_of_primary_demand_bcm],
    },
    {
      name: "International transport and freight",
      data: [future.gas_bunkers_in_mekko_of_primary_demand_bcm],
    },
    {
      name: "Export",
      data: [future.gas_export_in_mekko_of_primary_demand_bcm],
    },
    {
      name: "Households",
      data: [future.gas_households_in_mekko_of_primary_demand_bcm],
    },
    {
      name: "Industry",
      data: [future.gas_industry_in_mekko_of_primary_demand_bcm],
    },
    {
      name: "Other",
      data: [future.gas_other_in_mekko_of_primary_demand_bcm],
    },
    {
      name: "Transport",
      data: [future.gas_transport_in_mekko_of_primary_demand_bcm],
    },
  ];

  const options = {
    annotations: {
      yaxis: [
        {
          y: initialSum,
          borderColor: "rgba(75, 85, 100, 50%)",
          strokeDashArray: 5,
          label: {
            offsetY: 7,
            text: "Before",
            borderWidth: 0,
            style: {
              background: "#f9fafb",
              borderColor: "#4b5563",
              fontSize: "12px",
            },
          },
        },
      ],
    },
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
      categories: ["Gas use"],
      labels: { show: false },
    },
    yaxis: {
      max: 400,
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
