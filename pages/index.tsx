import type { NextPage } from "next";

import FieldGroup from "../components/FieldGroup";
import Input from "../features/inputs/Input";
import PresetSelection from "../features/inputs/PresetSelection";

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
        <div className="bg-gray-200 text-gray-600 rounded p-4 mb-6 h-48 flex items-center justify-center">
          Chart
        </div>

        <h2 className="text-lg mt-3">Money to Putin</h2>
        <p>Payments to Russia for gas this year</p>
        <div className="h-6 bg-gray-200 rounded mt-1" />

        <h2 className="text-lg mt-3">Costs</h2>
        <p>Required (one-off) investment</p>
        <div className="h-6 bg-gray-200 rounded mt-1" />

        <h2 className="text-lg mt-3">Emissions</h2>
        <p>Effect on EU emissions figures</p>
        <div className="h-6 bg-gray-200 rounded mt-1" />
      </div>
    </div>
  );
};

export default Home;
