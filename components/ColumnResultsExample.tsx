import ColumnChart from "../components/ColumnChart";

import { useAppSelector } from "../features/hooks";
import { createInputSelector } from "../features/scenario/scenario-slice";

function round(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Formats EUR values in column charts.
 */
function formatEuros(value: number): string {
  return `€${round(value)} billion`;
}

/**
 * Formats percentage values in column charts.
 */
function formatPercent(value: number): string {
  return `${round(value)}%`;
}

export default function ColumnResultsExample(): React.ReactElement {
  const groningen = useAppSelector(createInputSelector("extra_gas_from_groningen"));
  const costs = 0.1 * groningen.value;

  const coal = useAppSelector(createInputSelector("reuse_of_coal_fired_power_stations"));
  const co2 = coal.value * 0.15;

  return (
    <div>
      <h2 className="text-lg mt-3">Money to Putin</h2>
      <p className="mb-1">Payments to Russia for gas this year</p>
      <ColumnChart
        max={100}
        value={20 - costs}
        bands={[{ color: "green" }, { color: "yellow", at: 1 }, { color: "red", at: 20 }]}
        formatter={formatEuros}
      />

      <h2 className="text-lg mt-3">Costs</h2>
      <p className="mb-1">Required (one-off) investment</p>
      <ColumnChart
        max={100}
        value={costs}
        bands={[{ color: "green" }, { color: "yellow", at: 10 }, { color: "red", at: 20 }]}
        formatter={formatEuros}
      />

      <h2 className="text-lg mt-3">Emissions</h2>
      <p className="mb-1">Effect on EU emissions figures</p>
      <ColumnChart
        max={60}
        value={co2}
        bands={[{ color: "green" }, { color: "yellow", at: 5 }, { color: "red", at: 10 }]}
        formatter={formatPercent}
      />
    </div>
  );
}
