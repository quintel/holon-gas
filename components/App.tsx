import FieldGroup from "../components/FieldGroup";
import FieldSubGroup from "../components/FieldSubGroup";
import Input from "../features/scenario/Input";
import InsulationInput from "../features/scenario/InsulationInput";
import LoadingStatus from "../features/scenario/LoadingStatus";
import PresetSelection from "../features/scenario/PresetSelection";
import ResultsChart from "../features/scenario/ResultsChart";
import SecondaryResults from "../features/scenario/SecondaryResults";
import ToolHeader from "../components/ToolHeader";

import helpTexts from "../data/help-texts";

export default function App(): React.ReactElement {
  return (
    <div className="container mx-auto flex flex-wrap text-sm lg:flex-nowrap">
      <div className="flex w-full flex-wrap pt-6 xl:w-2/3">
        <ToolHeader />
        <div className="w-full p-6 xl:w-1/2">
          <PresetSelection />
          <div id="production">
            <FieldGroup title="Gas production" className="mb-6">
              <Input id="extra_gas_from_groningen" />
              <Input id="extra_gas_from_eu" />
            </FieldGroup>
            <FieldGroup title="Other production">
              <FieldSubGroup
                title="Re-installing phased out coal capacity"
                helpText={helpTexts.coalPowerPlantCapacity}
              >
                <Input id="coal_power_plant_capacity_conventional" />
                <Input id="coal_power_plant_capacity_lignite" />
              </FieldSubGroup>
              <Input id="injection_of_biomethane_in_gas_mix" />
              <Input id="lng_imports" />
              <Input id="green_hydrogen" />
              <Input id="renewable_energy_capacity" />
            </FieldGroup>
          </div>
        </div>
        <div className="w-full px-6 md:pt-6 xl:w-1/2">
          <div id="savings">
            <FieldGroup title="Savings at home and office" className="mb-6">
              <Input id="electricity_storage_behind_the_meter" />
              <Input id="growth_of_installed_heat_pumps" />
              <InsulationInput id="insulation" />
              <FieldSubGroup title="Lowering household thermostat setting">
                <Input id="thermostat_settings_percentage" />
                <Input id="thermostat_settings_reduce_temperature" />
              </FieldSubGroup>
            </FieldGroup>
            <FieldGroup title="Other" className="mb-6">
              <Input id="solar_thermal_collectors" />
              <FieldSubGroup title="Rooftop solar" helpText={helpTexts.rooftopSolar}>
                <Input id="rooftop_pv_households" />
                <Input id="rooftop_pv_buildings" />
              </FieldSubGroup>
              <FieldSubGroup
                title="Large-scale energy storage"
                helpText={helpTexts.largeScaleEnergyStorage}
              >
                <Input id="large_scale_storage_batteries" />
                <Input id="large_scale_storage_reservoirs" />
              </FieldSubGroup>
              <FieldSubGroup
                title="Limit the use of natural gas in industry"
                helpText={helpTexts.gasUseInIndustry}
              >
                <Input id="replacement_of_gas_by_oil_in_chemical_industry" />
                <Input id="closure_of_fertiliser_industry" />
              </FieldSubGroup>
            </FieldGroup>
          </div>
        </div>
      </div>
      <div className="sticky top-0 w-full self-start px-6 md:pt-12 xl:w-1/3">
        <div id="results">
          <h2 className="text-lg">Results</h2>
          <ResultsChart />
          <SecondaryResults />
        </div>
        <div className="mt-8 text-center"></div>
        <div className="mt-6 px-5 text-center text-xs leading-5 text-gray-500">
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
  );
}
