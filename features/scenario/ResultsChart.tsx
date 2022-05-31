import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useAppSelector } from "../hooks";
import { createFutureResultSelector } from "./scenario-slice";

export default function ResultsChart(): React.ReactElement {
  const costs = useAppSelector(createFutureResultSelector("dashboard_total_costs"));

  const series = [
    {
      name: "Costs",
      data: [costs],
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
        columnWidth: "50%",
      },
    },
    colors: ["#6ee7b7", "#34d399", "#10b981", "#059669", "#047857", "#c2410c"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Results"],
      labels: { show: false },
    },
    yaxis: {
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
