import { Fragment, useCallback, useState } from "react";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useAppSelector } from "../hooks";
import {
  createInitialResultSelector,
  createFutureResultSelector,
  importedRussianGasSelector,
} from "./scenario-slice";

const DEMAND_QUERIES = [
  "gas_agriculture_in_mekko_of_primary_demand_bcm",
  "gas_buildings_in_mekko_of_primary_demand_bcm",
  "gas_bunkers_in_mekko_of_primary_demand_bcm",
  "gas_export_in_mekko_of_primary_demand_bcm",
  "gas_households_in_mekko_of_primary_demand_bcm",
  "gas_industry_in_mekko_of_primary_demand_bcm",
  "gas_other_in_mekko_of_primary_demand_bcm",
  "gas_transport_in_mekko_of_primary_demand_bcm",
];

const SUPPLY_QUERIES = ["import_of_natural_gas_bcm", "extraction_of_natural_gas_bcm"];

const SERIES_COLORS = [
  "#9ca3af",
  "#a6c0f3",
  "#fbbf24",
  "#5f7de3",
  "#34d399",
  "#7f9feb",
  "#f9a8d4",
  "#a3e635",
];

const useResults = (
  queries: string[],
  appSelector: typeof useAppSelector,
  selector: typeof createFutureResultSelector
) => {
  const results: Record<string, number> = {};

  for (const query of queries) {
    results[query] = appSelector(selector(query));
  }

  return results;
};

export default function ResultsChart(): React.ReactElement {
  const russianGas = useAppSelector(importedRussianGasSelector);

  const initial = useResults(DEMAND_QUERIES, useAppSelector, createInitialResultSelector);
  const future = useResults(DEMAND_QUERIES, useAppSelector, createFutureResultSelector);

  const initialSum = Object.values(initial).reduce((a, b) => a + b, 0);
  const futureSum = Object.values(future).reduce((a, b) => a + b, 0);

  const futureSupply = useResults(SUPPLY_QUERIES, useAppSelector, createFutureResultSelector);

  const series = [
    {
      name: "Agriculture",
      data: [future.gas_agriculture_in_mekko_of_primary_demand_bcm, 0],
    },
    {
      name: "Buildings",
      data: [future.gas_buildings_in_mekko_of_primary_demand_bcm, 0],
    },
    {
      name: "International transport and freight",
      data: [future.gas_bunkers_in_mekko_of_primary_demand_bcm, 0],
    },
    {
      name: "Export",
      data: [future.gas_export_in_mekko_of_primary_demand_bcm, 0],
    },
    {
      name: "Households",
      data: [future.gas_households_in_mekko_of_primary_demand_bcm, 0],
    },
    {
      name: "Industry",
      data: [future.gas_industry_in_mekko_of_primary_demand_bcm, 0],
    },
    {
      name: "Other",
      data: [future.gas_other_in_mekko_of_primary_demand_bcm, 0],
    },
    {
      name: "Transport",
      data: [future.gas_transport_in_mekko_of_primary_demand_bcm, 0],
    },
    {
      name: "Import from Russia",
      data: [0, russianGas],
    },
    {
      name: "Import from other countries",
      data: [0, Math.max(0, futureSupply.import_of_natural_gas_bcm - russianGas)],
    },
    {
      name: "Own production",
      data: [0, futureSupply.extraction_of_natural_gas_bcm],
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
      id: "demand-chart",
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
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
      },
    },
    legend: {
      show: false,
    },
    colors: SERIES_COLORS,
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
      categories: ["Demand", "Supply"],
      // labels: { show: false },
    },
    yaxis: {
      max: Math.ceil(Math.max(initialSum, futureSum) / 100) * 100,
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

  const onToggle = useCallback(
    (name: string, shown: boolean) =>
      ApexCharts.exec("demand-chart", shown ? "showSeries" : "hideSeries", [name]),
    []
  );

  return (
    <Fragment>
      <Chart options={options} series={series} type="bar" height={275} />
      <div className="-mt-3 text-center text-xs text-gray-700">
        <div className="mb-1 text-sm font-medium">Demand</div>
        <div className="px-3 leading-relaxed">
          <LegendItem color={SERIES_COLORS[0]} name="Agriculture" onToggle={onToggle} />
          <LegendItem color={SERIES_COLORS[1]} name="Buildings" onToggle={onToggle} />
          <LegendItem
            color={SERIES_COLORS[2]}
            name="International transport and freight"
            onToggle={onToggle}
          />
          <LegendItem color={SERIES_COLORS[3]} name="Export" onToggle={onToggle} />
          <LegendItem color={SERIES_COLORS[4]} name="Households" onToggle={onToggle} />
          <LegendItem color={SERIES_COLORS[5]} name="Industry" onToggle={onToggle} />
          <LegendItem color={SERIES_COLORS[6]} name="Other" onToggle={onToggle} />
          <LegendItem color={SERIES_COLORS[7]} name="Transport" onToggle={onToggle} />
        </div>

        <div className="mb-1 mt-3 text-sm font-medium">Supply</div>
        <div className="px-3 leading-relaxed">
          <LegendItem color={SERIES_COLORS[0]} name="Import from Russia" onToggle={onToggle} />
          <LegendItem
            color={SERIES_COLORS[1]}
            name="Import from other countries"
            onToggle={onToggle}
          />
          <LegendItem color={SERIES_COLORS[2]} name="Own production" onToggle={onToggle} />
        </div>
      </div>
    </Fragment>
  );
}

function LegendItem({
  color,
  name,
  onToggle,
}: {
  color: string;
  name: string;
  onToggle: (name: string, shown: boolean) => void;
}) {
  const [isShown, setIsShown] = useState(true);

  const clickHandler = useCallback(() => {
    onToggle(name, !isShown);
    setIsShown(!isShown);
  }, [isShown, name, onToggle]);

  return (
    <div
      className={`mx-1.5 inline-flex cursor-pointer items-center transition ${
        isShown ? "" : "opacity-50"
      }`}
      onClick={clickHandler}
    >
      <div
        className="mr-1 inline-block h-[0.8125rem] w-[0.8125rem] rounded-sm bg-white"
        style={{ backgroundColor: color }}
      ></div>
      {name}
    </div>
  );
}
