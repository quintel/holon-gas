import ColumnChart from "../components/ColumnChart";

import { useAppSelector } from "../features/hooks";
import { createFutureResultSelector } from "../features/scenario/scenario-slice";

function round(value: number): number {
  return Math.round(value * 100) / 100;
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

export default function ColumnResults(): React.ReactElement {
  const co2Change = useAppSelector(
    createFutureResultSelector("dashboard_co2_emissions_versus_start_year")
  );

  return (
    <div>
      <h2 className="text-lg mt-3">Money to Putin</h2>
      <p className="mb-1">Payments to Russia for gas this year</p>
      <ColumnChart
        max={50}
        value={10}
        bands={[{ color: "green" }, { color: "yellow", at: 1 }, { color: "red", at: 20 }]}
        formatter={() => "??"}
      />

      <h2 className="text-lg mt-3">Costs</h2>
      <p className="mb-1">Required (one-off) investment</p>
      <ColumnChart
        max={100}
        value={65}
        bands={[{ color: "green" }, { color: "yellow", at: 10 }, { color: "red", at: 20 }]}
        formatter={() => "??"}
      />

      <h2 className="text-lg mt-3">Emissions</h2>
      <p className="mb-1">Effect on EU emissions figures</p>
      <ColumnChart
        max={50}
        value={co2Change * 100}
        bands={[{ color: "green" }, { color: "yellow", at: 5 }, { color: "red", at: 10 }]}
        formatter={formatPercent}
      />
    </div>
  );
}
