import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect } from "react";

import FieldGroup from "../components/FieldGroup";
import Input from "../features/inputs/Input";
import PresetSelection from "../features/inputs/PresetSelection";
import ResultsChart from "../features/inputs/ResultsChart";
import ColumnResultsExample from "../components/ColumnResultsExample";

import { useAppSelector, useAppDispatch } from "../features/hooks";
import { uiReadySelector, sendAPIRequest } from "../features/inputs/inputsSlice";

const Home: NextPage = () => {
  const uiReady = useAppSelector(uiReadySelector);
  const dispatch = useAppDispatch();

  // Sends an initial API request to ETEngine to set default input values and get data for charts.
  useEffect(() => {
    if (!uiReady) {
      dispatch(sendAPIRequest());
    }
  }, [uiReady, dispatch]);

  if (!uiReady) {
    return (
      <div className="flex align-center justify-center pt-10 w-full">
        <span className="bg-gray-200 rounded py-2 px-3">Loading&hellip;</span>
      </div>
    );
  }

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
        <ColumnResultsExample />
      </div>
    </div>
  );
};

// Opt out of SSR since we're loading data from localStorage which differs from the server causing
// hydration errors. There's probably a better way to fix this.
export default dynamic(() => Promise.resolve(Home), { ssr: false });
