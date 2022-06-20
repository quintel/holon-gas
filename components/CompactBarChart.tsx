import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  series: { name: string; data: number[] }[];
  colors: string[];
  height?: number;
  formatter?: (value: number) => string;
  min: number;
  max: number;
  tickAmount?: number;
}

export default function CompactBarChart({
  colors,
  height = 100,
  formatter,
  max,
  min = 0,
  series,
  tickAmount,
}: Props): React.ReactElement {
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
        "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      toolbar: {
        show: false,
      },
      stacked: true,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    colors,
    xaxis: {
      categories: ["Results"],
      labels: {
        formatter: (val: string) => formatter?.(parseFloat(val)) || "",
      },
      forceNiceScale: true,
      tickAmount,
      min,
      max,
    },
    yaxis: {
      labels: { show: false },
    },
  };

  return (
    <div className="-mt-6 -mb-6 -ml-6">
      <Chart options={options} series={series} type="bar" height={height} />
    </div>
  );
}
