import FieldGroup from "../../components/FieldGroup";
import FieldSubGroup from "../../components/FieldSubGroup";
import Input from "./Input";
import InputDescription from "../../components/InputDescription";
import InsulationInput from "./InsulationInput";
import LoadingStatus from "./LoadingStatus";
import PresetSelection from "./PresetSelection";
import Results from "./Results";
import ToolHeader from "../../components/ToolHeader";

import helpTexts from "../../data/help-texts";

export default function App(): React.ReactElement {
  return (
    <div className="container mx-auto flex flex-wrap text-sm lg:flex-nowrap">
      <div className="flex w-full flex-wrap pt-6 md:w-1/2 xl:w-2/3">
        <ToolHeader />
        <div className="w-full p-3 pt-6 xl:w-1/2">
          <PresetSelection />
          <FieldGroup title="Gas production" className="mb-6" id="gas-production">
            <div id="tour-slider-settings" className="pb-4">
              <Input id="gas_cost" />
            </div>
            <Input id="extra_gas_from_groningen" />
            <Input id="extra_gas_from_eu" />
          </FieldGroup>
          <FieldGroup title="Other production">
            <FieldSubGroup
              title="Re-installing phased out coal capacity"
              helpText={helpTexts.coalPowerPlantCapacity}
            >
              <InputDescription isSubGroup>
                Set the share of available coal and lignite (brown coal) capacity that should be put
                in operation for electricity generation.
              </InputDescription>
              <Input id="coal_power_plant_capacity_conventional" />
              <Input id="coal_power_plant_capacity_lignite" />
            </FieldSubGroup>
            <Input id="injection_of_biomethane_in_gas_mix" />
            <Input id="lng_imports" />
            <Input id="green_hydrogen" />
            <Input id="renewable_energy_capacity" />
          </FieldGroup>
        </div>
        <div className="w-full px-3 md:pt-4 xl:w-1/2 xl:pt-6">
          <FieldGroup title="Savings at home and office" className="mb-6">
            <Input id="electricity_storage_behind_the_meter" />
            <Input id="growth_of_installed_heat_pumps" />
            <InsulationInput id="insulation" />
            <FieldSubGroup title="Lowering household thermostat setting">
              <InputDescription isSubGroup>
                Define the how EU residents are willing to reduce their gas consumption by lowering
                their household temperature.
              </InputDescription>
              <Input id="thermostat_settings_percentage" />
              <Input id="thermostat_settings_reduce_temperature" />
            </FieldSubGroup>
          </FieldGroup>
          <FieldGroup title="Other" className="mb-6">
            <Input id="solar_thermal_collectors" />
            <FieldSubGroup title="Rooftop solar" helpText={helpTexts.rooftopSolar}>
              <InputDescription isSubGroup>
                What will be the share of homes with a PV-system installed? And what share of
                businesses?
              </InputDescription>
              <Input id="rooftop_pv_households" />
              <Input id="rooftop_pv_buildings" />
            </FieldSubGroup>
            <FieldSubGroup
              title="Large-scale energy storage"
              helpText={helpTexts.largeScaleEnergyStorage}
            >
              <InputDescription isSubGroup>
                What will be the installed capacity of large-scale (generation-side) battery storage
                systems? And the capacity of hydro-electric storage (water reservoirs)?
              </InputDescription>
              <Input id="large_scale_storage_batteries" />
              <Input id="large_scale_storage_reservoirs" />
            </FieldSubGroup>
            <FieldSubGroup
              title="Limit the use of natural gas in industry"
              helpText={helpTexts.gasUseInIndustry}
            >
              <InputDescription isSubGroup>
                What share of natural gas should be replaced by oil as feedstock for the production
                of basic chemicals? What share of the fertiliser industry should be shut down
                completely?
              </InputDescription>
              <Input id="replacement_of_gas_by_oil_in_chemical_industry" />
              <Input id="closure_of_fertiliser_industry" />
            </FieldSubGroup>
          </FieldGroup>
        </div>
      </div>
      <div className="sticky top-0 w-full self-start pl-6 pr-3 md:w-1/2 md:pt-12 xl:w-1/3">
        <Results />
        <div className="mt-6 px-5 pb-6 text-center text-xs leading-5 text-gray-500" id="tour-etm">
          Want more options? Go to the full version of the
          <br />
          <a
            href="https://pro.energytransitionmodel.com/"
            className="p-1 text-midnight-500 hover:text-midnight-700"
            target="_blank"
            rel="noreferrer"
          >
            Energy Transition Model
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-mt-1 ml-0.5 inline h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        </div>
      </div>
      <LoadingStatus />
    </div>
  );
}
