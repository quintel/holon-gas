import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useAppSelector } from "../features/hooks";
import { createInputSelector } from "../features/scenario/scenario-slice";

const inputValue = (input: { value: number }) => input.value * 0.1;

export default function ResultsChart(): React.ReactElement {
  const groningenSelector = useAppSelector(createInputSelector("extra_gas_from_groningen"));
  const coalSelector = useAppSelector(createInputSelector("reuse_of_coal_fired_power_stations"));
  const insulateSelector = useAppSelector(createInputSelector("insulate_buildings"));
  const boilerSelector = useAppSelector(createInputSelector("optimal_boiler_settings"));
  const storageSelector = useAppSelector(createInputSelector("large_scale_storage"));

  const groningen = inputValue(groningenSelector);
  const coal = inputValue(coalSelector);
  const insulate = inputValue(insulateSelector);
  const boilers = inputValue(boilerSelector);
  const storage = inputValue(storageSelector);

  const russianImport = 50 - groningen - coal - insulate - boilers - storage;

  const series = [
    {
      name: "Extra gas from Groningen",
      data: [groningen],
    },
    {
      name: "Reuse of coal-fired power stations",
      data: [coal],
    },
    {
      name: "Savings at home and business",
      data: [insulate],
    },
    {
      name: "Optimal boiler settings",
      data: [boilers],
    },
    {
      name: "Other",
      data: [storage],
    },
    {
      name: "Import from Russia",
      data: [russianImport],
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
    colors: ["#6ee7b7", "#eab308", "#0ea5e9", "#8b5cf6", "#14b8a6", "#c2410c"],
    dataLabels: {
      offsetY: 2,
      formatter(value: number) {
        return value.toFixed(1);
      },
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
      },
      max: 50,
      tickAmount: 5,
    },
  };

  return <Chart options={options} series={series} type="bar" height={400} />;
}
