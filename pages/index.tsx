import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect } from "react";

import FieldGroup from "../components/FieldGroup";
import FieldSubGroup from "../components/FieldSubGroup";
import Input from "../features/scenario/Input";
import PresetSelection from "../features/scenario/PresetSelection";
import ResultsChart from "../features/scenario/ResultsChart";
import ColumnResultsExample from "../components/ColumnResultsExample";

import { useAppSelector, useAppDispatch } from "../features/hooks";
import { uiReadySelector, sendAPIRequest } from "../features/scenario/scenario-slice";

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
          <FieldSubGroup title="Coal power plant capacity">
            <Input id="coal_power_plant_capacity_conventional" />
            <Input id="coal_power_plant_capacity_lignite" />
          </FieldSubGroup>
          <Input id="injection_of_biomethane_in_gas_mix" />
          <Input id="lng_imports" />
          <Input id="green_hydrogen" />
        </FieldGroup>
        <div className="mt-3 px-5 text-center text-xs">
          Want more options? Go to the full version of the{" "}
          <a href="https://pro.energytransitionmodel.com/">Energy Transition Model</a>.
        </div>
      </div>
      <div className="w-1/3 p-6">
        <FieldGroup title="Savings at home and office" className="mb-6">
          <Input id="electricity_storage_behind_the_meter" />
          <FieldSubGroup title="Rooftop solar">
            <Input id="rooftop_pv_households" />
            <Input id="rooftop_pv_buildings" />
          </FieldSubGroup>
        </FieldGroup>
        <FieldGroup title="Other" className="mb-6">
          <FieldSubGroup title="Large-scale energy storage">
            <Input id="large_scale_storage_batteries" />
            <Input id="large_scale_storage_reservoirs" />
          </FieldSubGroup>
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
