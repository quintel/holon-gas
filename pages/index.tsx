import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Fragment, useEffect } from "react";

import ColumnResults from "../components/ColumnResults";
import FieldGroup from "../components/FieldGroup";
import FieldSubGroup from "../components/FieldSubGroup";
import Input from "../features/scenario/Input";
import InsulationInput from "../features/scenario/InsulationInput";
import LoadingStatus from "../features/scenario/LoadingStatus";
import PresetSelection from "../features/scenario/PresetSelection";
import ResultsChart from "../features/scenario/ResultsChart";
import ResponseError from "../components/ResponseError";

import { useAppSelector, useAppDispatch } from "../features/hooks";
import {
  uiReadySelector,
  requestStateSelector,
  sendAPIRequest,
} from "../features/scenario/scenario-slice";

import { clearState } from "../features/scenario/browser-storage";

const Home: NextPage = () => {
  const { isFailure } = useAppSelector(requestStateSelector);
  const uiReady = useAppSelector(uiReadySelector);
  const dispatch = useAppDispatch();

  // Sends an initial API request to ETEngine to set default input values and get data for charts.
  useEffect(() => {
    if (!uiReady) {
      dispatch(sendAPIRequest());
    }
  }, [uiReady, dispatch]);

  if (isFailure) {
    return (
      <ResponseError
        onClose={() => {
          clearState();
          window.location = window.location;
        }}
      />
    );
  }

  if (!uiReady) {
    return (
      <div className="flex align-center justify-center pt-10 w-full">
        <span className="bg-gray-200 rounded py-2 px-3">Loading&hellip;</span>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>HOLON Russian Gas Tool</title>
      </Head>
      <div className="container mx-auto flex text-sm flex-wrap lg:flex-nowrap">
        <div className="w-full xl:w-2/3 pt-6 flex flex-wrap">
          <div className="w-full xl:w-1/2 p-6">
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
              <Input id="renewable_energy_capacity" />
            </FieldGroup>
          </div>
          <div className="w-full xl:w-1/2 px-6 md:pt-6">
            <FieldGroup title="Savings at home and office" className="mb-6">
              <Input id="electricity_storage_behind_the_meter" />
              <Input id="growth_of_installed_heat_pumps" />
              <InsulationInput id="insulation" />
              <FieldSubGroup title="Thermostat settings">
                <Input id="thermostat_settings_percentage" />
                <Input id="thermostat_settings_reduce_temperature" />
              </FieldSubGroup>
              <FieldSubGroup title="Behavioural changes">
                <Input id="behavioural_change_percentage" />
              </FieldSubGroup>
            </FieldGroup>
            <FieldGroup title="Other" className="mb-6">
              <Input id="solar_thermal_collectors" />
              <FieldSubGroup title="Rooftop solar">
                <Input id="rooftop_pv_households" />
                <Input id="rooftop_pv_buildings" />
              </FieldSubGroup>
              <FieldSubGroup title="Large-scale energy storage">
                <Input id="large_scale_storage_batteries" />
                <Input id="large_scale_storage_reservoirs" />
              </FieldSubGroup>
              <FieldSubGroup title="Gas use in industry">
                <Input id="replacement_of_gas_by_oil_in_chemical_industry" />
                <Input id="closure_of_fertiliser_industry" />
              </FieldSubGroup>
            </FieldGroup>
          </div>
        </div>
        <div className="w-full xl:w-1/3 px-6 md:pt-12 sticky top-0 self-start">
          <h2 className="text-lg">Results</h2>
          <ResultsChart />
          <ColumnResults />
          <div className="mt-12 px-5 text-gray-500 text-center text-xs leading-5">
            Want more options? Go to the full version of the
            <br />
            <a
              href="https://pro.energytransitionmodel.com/"
              className="p-1 text-blue-500 hover:text-blue-700"
              target="_blank"
              rel="noreferrer"
            >
              Energy Transition Model
            </a>
          </div>
        </div>
        <LoadingStatus />
      </div>
    </Fragment>
  );
};

// Opt out of SSR since we're loading data from localStorage which differs from the server causing
// hydration errors. There's probably a better way to fix this.
export default dynamic(() => Promise.resolve(Home), { ssr: false });
