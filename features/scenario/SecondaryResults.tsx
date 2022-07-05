import CompactBarChart from "../../components/CompactBarChart";

import ColorBandedBarChart from "../../components/ColorBandedBarChart";
import CapitalFlowBarChart from "./CapitalFlowBarChart";
import HelpButton from "../../components/HelpButton";

import helpTexts from "../../data/help-texts";

import { useAppSelector } from "../hooks";
import { createFutureResultDeltaSelector } from "./scenario-slice";

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

export default function SecondaryResults(): React.ReactElement {
  const co2Change = -useAppSelector(
    createFutureResultDeltaSelector("dashboard_co2_emissions_versus_start_year")
  );

  return (
    <div>
      <div className="relative mt-3 flex">
        <h2 className="text-lg">Capital flow to Russia</h2>
        <div className="ml-auto">
          <HelpButton text={helpTexts.results} />
        </div>
      </div>
      <p className="mb-1">Payments to Russia for gas this year</p>
      <CapitalFlowBarChart />

      <h2 className="mt-3 text-lg">Costs</h2>
      <p className="mb-1">Required (one-off) investment</p>
      <div className="pb-4">
        <CompactBarChart
          min={0}
          max={100}
          series={[
            { name: "Green investment costs", data: [65] },
            { name: "Non-green investment costs", data: [35] },
          ]}
          colors={["#34d399", "#f87171"]}
          formatter={() => "??"}
          height={120}
        />
      </div>

      <h2 className="mt-3 text-lg">Emissions</h2>
      <p className="mb-1">Effect on EU emissions figures</p>
      <ColorBandedBarChart
        min={-20}
        max={20}
        value={-co2Change * 100}
        bands={[{ color: "green" }, { color: "red", at: 0 }]}
        formatter={formatPercent}
      />
    </div>
  );
}
