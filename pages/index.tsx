import type { NextPage } from "next";

import FieldGroup from "../components/FieldGroup";
import Input from "../features/inputs/Input";
import PresetSelection from "../features/inputs/PresetSelection";
import ResultsChart from "../components/ResultsChart";
import ColumnChart from "../components/ColumnChart";

/**
 * Formats EUR values in column charts.
 */
function formatEuros(value: number): string {
  return `${value} EUR`;
}

/**
 * Formats percentage values in column charts.
 */
function formatPercent(value: number): string {
  return `${value}%`;
}

const Home: NextPage = () => {
  return (
    <div className="container mx-auto mt-6 flex text-sm">
      <div className="w-1/3 p-6">
        <PresetSelection />
        <FieldGroup title="Gas production" className="mb-6">
          <Input id="extra_gas_from_groningen" />
          <Input id="extra_gas_from_eu" />
        </FieldGroup>
        <FieldGroup title="Other production">
          <Input id="reuse_of_coal_fired_power_stations" />
          <Input id="injection_of_biomethane_in_gas_mix" />
          <Input id="green_hydrogen_as_an_alternative" />
        </FieldGroup>
        <div className="mt-3 px-5 text-center text-xs">
          Want more options? Go to the full version of the{" "}
          <a href="https://pro.energytransitionmodel.com/">Energy Transition Model</a>.
        </div>
      </div>
      <div className="w-1/3 p-6">
        <FieldGroup title="Savings at home and office" className="mb-6">
          <Input id="insulate_buildings" />
          <Input id="optimal_boiler_settings" />
          <Input id="purchase_solar_collectors" />
          <Input id="population_percentage" />
          <Input id="number_of_degrees_lower" />
          <Input id="switch_to_heat_pumps" />
          <Input id="pv_on_roofs" />
          <Input id="electricity_storage_behind_the_meter" />
        </FieldGroup>
        <FieldGroup title="Other" className="mb-6">
          <Input id="large_scale_storage" />
          <Input id="closure_of_industry_with_gas" />
          <Input id="bio_methane_as_raw_material" />
        </FieldGroup>
      </div>
      <div className="w-1/3 p-6">
        <h2 className="text-lg">Results</h2>
        <ResultsChart />
        {/* <div className="bg-gray-200 text-gray-600 rounded p-4 mb-6 h-48 flex items-center justify-center">
          Chart
        </div> */}

        <h2 className="text-lg mt-3">Money to Putin</h2>
        <p className="mb-1">Payments to Russia for gas this year</p>
        <ColumnChart
          max={100}
          value={20}
          bands={[{ color: "emerald" }, { color: "yellow", at: 1 }, { color: "red", at: 20 }]}
          formatter={formatEuros}
        />

        <h2 className="text-lg mt-3">Costs</h2>
        <p className="mb-1">Required (one-off) investment</p>
        <ColumnChart
          max={100}
          value={12}
          bands={[{ color: "emerald" }, { color: "yellow", at: 10 }, { color: "red", at: 20 }]}
          formatter={formatEuros}
        />

        <h2 className="text-lg mt-3">Emissions</h2>
        <p className="mb-1">Effect on EU emissions figures</p>
        <ColumnChart
          max={100}
          value={-4}
          bands={[{ color: "emerald" }, { color: "yellow", at: 10 }, { color: "red", at: 20 }]}
          formatter={formatPercent}
        />
      </div>
    </div>
  );
};

export default Home;
