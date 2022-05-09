import type { NextPage } from "next";

import FieldGroup from "../components/FieldGroup";
import Input from "../components/Input";

const Home: NextPage = () => {
  return (
    <div className="container mx-auto mt-6 flex text-sm">
      <div className="w-1/3 p-6">
        <h2 className="text-lg">Presets</h2>
        <div className="bg-gray-200 text-gray-600 rounded p-4 mb-6 h-40 flex items-center justify-center">
          Presets
        </div>
        <FieldGroup title="Gas production" className="mb-6">
          <Input
            name="Extra gas from Groningen"
            min={0}
            max={10}
            defaultValue={5}
          />
          <Input
            name="Extra gas from other EU countries"
            min={0}
            max={50}
            defaultValue={0}
          />
        </FieldGroup>
        <FieldGroup title="Other production">
          <Input
            name="Re-use of coal-fired power stations"
            min={0}
            max={25}
            defaultValue={0}
          />
          <Input
            name="Injection of biomethane in gas mix"
            min={0}
            max={20}
            defaultValue={10}
          />
          <Input
            name="Green hydrogen as an alternative"
            min={3}
            max={6}
            defaultValue={4}
          />
        </FieldGroup>
        <div className="mt-3 px-5 text-center text-xs">
          Want more options? Go to the full version of the{" "}
          <a href="https://pro.energytransitionmodel.com/">
            Energy Transition Model
          </a>
          .
        </div>
      </div>
      <div className="w-1/3 p-6">
        <FieldGroup title="Savings at home and office" className="mb-6">
          <Input name="Insulate buildings" min={0} max={100} defaultValue={0} />
          <Input
            name="Optimal boiler settings"
            min={0}
            max={100}
            defaultValue={0}
          />
          <Input
            name="Purchase solar collectors"
            min={0}
            max={100}
            defaultValue={0}
          />
          <Input
            name="Population percentage"
            min={0}
            max={100}
            defaultValue={0}
          />
          <Input
            name="Number of degrees lower"
            min={0}
            max={100}
            defaultValue={0}
          />
          <Input
            name="Switch to heat pumps"
            min={0}
            max={100}
            defaultValue={0}
          />
          <Input name="PV on roofs" min={0} max={100} defaultValue={0} />
          <Input
            name="Electricity storage behind the meter"
            min={0}
            max={100}
            defaultValue={0}
          />
        </FieldGroup>
        <FieldGroup title="Other" className="mb-6">
          <Input
            name="Large-scale storage"
            min={0}
            max={100}
            defaultValue={0}
          />
          <Input
            name="Closure of industry with gas as raw material"
            min={0}
            max={100}
            defaultValue={0}
          />
          <Input
            name="Industry: bio-methane as raw material"
            min={0}
            max={100}
            defaultValue={0}
          />
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
