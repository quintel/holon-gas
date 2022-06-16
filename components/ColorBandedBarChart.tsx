import CompactBarChart from "./CompactBarChart";

const colors = {
  blue: "#60a5fa",
  red: "#f87171",
  yellow: "#fbbf24",
  green: "#34d399",
};

interface Band {
  at?: number;
  color: keyof typeof colors;
}

interface Props {
  bands?: Band[];
  min?: number;
  max: number;
  value: number;
  formatter?: (value: number) => string;
  tickAmount?: number;
}

function colorForValue(value: number, bands?: Band[]): string {
  if (bands && bands.length > 0) {
    for (const band of bands) {
      console.log(band.at, value);
      if (band.at && value >= band.at) {
        return colors[band.color];
      }
    }
    return colors[bands[0].color];
  }
  return colors.green;
}

export default function ColorBandedBarChart({
  bands,
  formatter,
  max,
  min,
  tickAmount,
  value,
}: Props): React.ReactElement {
  return (
    <CompactBarChart
      colors={[colorForValue(value, bands)]}
      formatter={formatter}
      series={[{ name: "", data: [value] }]}
      min={Math.min(value, min ?? value)}
      max={Math.max(value, max ?? value)}
      tickAmount={tickAmount}
    />
  );
}
