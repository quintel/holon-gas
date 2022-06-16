import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useAppSelector } from "../hooks";
import { createFutureResultSelector } from "./scenario-slice";

const reductionToSeries = (reduction: number) => {
  return reduction < 0 ? -reduction : 0;
};

export default function ResultsChart(): React.ReactElement {
  const importedGas = useAppSelector(createFutureResultSelector("future_import_natural_gas"));

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

  const series = [
    {
      name: "Import",
      data: [importedGas],
    },
    {
      name: "Reduction from electricity production",
      data: [reductionToSeries(reductionElectricityProduction)],
    },
    {
      name: "Reduction in buildings",
      data: [reductionToSeries(reductionBuildings)],
    },
    {
      name: "Reduction in households",
      data: [reductionToSeries(reductionHouseholds)],
    },
    {
      name: "Reduction in industry",
      data: [reductionToSeries(reductionIndustry)],
    },
    {
      name: "Reduction in buildings",
      data: [reductionToSeries(reductionBuildings)],
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
    colors: ["#9ca3af", "#34d399", "#c4b5fd", "#60a5fa", "#f9a8d4", "#fbbf24"],
    dataLabels: {
      enabled: false,
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
