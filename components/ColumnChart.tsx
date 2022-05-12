const colors = {
  red: { text: "text-red-800", bg: "bg-red-200" },
  yellow: { text: "text-yellow-800", bg: "bg-yellow-200" },
  emerald: { text: "text-emerald-800", bg: "bg-emerald-200" },
};

interface Props {
  bands?: Band[];
  min?: number;
  max: number;
  value: number;
  formatter?: (value: number) => string;
}

interface Band {
  at?: number;
  color: keyof typeof colors;
}

export default function ColumnChart({
  bands,
  formatter,
  min = 0,
  max,
  value,
}: Props): React.ReactElement {
  const percent = Math.min(100, Math.abs((100 * value) / (max - min)));
  const valueFormatter = formatter || ((value: number) => `${value}`);

  let color = colors.emerald;

  if (bands) {
    color = colors[bands[0].color];

    for (const band of bands) {
      if (band.at && value >= band.at) {
        color = colors[band.color];
      }
    }
  }

  return (
    <div className="h-8 w-full bg-gray-100 rounded relative">
      <div
        className={`h-8 block ${color.bg} rounded z-10 absolute`}
        data-testid="column-chart-fill"
        style={{ width: `${percent}%` }}
      />
      <output className={`block z-20 absolute pt-1.5 pl-2 ${color.text} font-semibold`}>
        {valueFormatter(value)}
      </output>
    </div>
  );
}
