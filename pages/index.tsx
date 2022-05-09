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
        <FieldGroup title="Gasproductie" className="mb-6">
          <Input
            name="Extra gas uit Groningen"
            min={0}
            max={10}
            initialValue={5}
          />
          <Input
            name="Extra gas uit andere EU landen"
            min={0}
            max={50}
            initialValue={0}
          />
        </FieldGroup>
        <FieldGroup title="Overig productie">
          <Input
            name="Her-inzet kolencentrales"
            min={0}
            max={25}
            initialValue={0}
          />
          <Input
            name="Injectie biomethaan in gasmix"
            min={0}
            max={20}
            initialValue={10}
          />
          <Input
            name="Groene waterstof als alternatie"
            min={3}
            max={6}
            initialValue={4}
          />
        </FieldGroup>
        <div className="mt-3 px-5 text-center text-xs">
          Meer opties bekijken? Ga naar de volledige versie van het{" "}
          <a href="https://pro.energytransitionmodel.com/">
            Energy Transition Model
          </a>
          .
        </div>
      </div>
      <div className="w-1/3 p-6">
        <FieldGroup title="Besparing thuis en kantoor" className="mb-6">
          <Input name="Isoleren panden" min={0} max={100} initialValue={0} />
          <Input
            name="Optimaal instellen boilers"
            min={0}
            max={100}
            initialValue={0}
          />
          <Input
            name="Aanschaf zonnecollectoren"
            min={0}
            max={100}
            initialValue={0}
          />
          <Input
            name="Percentage bevolking"
            min={0}
            max={100}
            initialValue={0}
          />
          <Input
            name="Aantal graden lager"
            min={0}
            max={100}
            initialValue={0}
          />
          <Input
            name="Overstap warmtepomp"
            min={0}
            max={100}
            initialValue={0}
          />
          <Input name="PV op daken" min={0} max={100} initialValue={0} />
          <Input
            name="Electriciteitsopslag achter de meter"
            min={0}
            max={100}
            initialValue={0}
          />
        </FieldGroup>
        <FieldGroup title="Overig" className="mb-6">
          <Input
            name="Grootschalige opslag"
            min={0}
            max={100}
            initialValue={0}
          />
          <Input
            name="Sluiting industrie met gas als grondstof"
            min={0}
            max={100}
            initialValue={0}
          />
          <Input
            name="Industrie: bio-methaan als grondstof"
            min={0}
            max={100}
            initialValue={0}
          />
        </FieldGroup>
      </div>
      <div className="w-1/3 p-6">
        <h2 className="text-lg">Resultaten</h2>
        <div className="bg-gray-200 text-gray-600 rounded p-4 mb-6 h-48 flex items-center justify-center">
          Chart
        </div>

        <h2 className="text-lg mt-3">Geld naar Putin</h2>
        <p>Het gel dat (alleen voor gas) dit jaar alsnog naar Rusland gaat.</p>
        <div className="h-6 bg-gray-200 rounded mt-1" />

        <h2 className="text-lg mt-3">Kosten</h2>
        <p>Benodigde (eenmalige) investering</p>
        <div className="h-6 bg-gray-200 rounded mt-1" />

        <h2 className="text-lg mt-3">Utistoot</h2>
        <p>Effect op EU uitstoot-cijfers</p>
        <div className="h-6 bg-gray-200 rounded mt-1" />
      </div>
    </div>
  );
};

export default Home;
