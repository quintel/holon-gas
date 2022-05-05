import type { NextPage } from "next";

import FieldGroup from "../components/FieldGroup";
import Slider from "../components/Slider";

const Home: NextPage = () => {
  return (
    <div className="container mx-auto mt-6 flex text-sm">
      <div className="w-1/3 p-6">
        <h2 className="text-lg">Presets</h2>
        <div className="bg-gray-200 text-gray-600 rounded p-4 mb-6 h-40 flex items-center justify-center">
          Presets
        </div>
        <FieldGroup title="Gasproductie" className="mb-6">
          <Slider name="Extra gas uit Groningen" />
          <Slider name="Extra gas uit andere EU landen" />
        </FieldGroup>
        <FieldGroup title="Overig productie">
          <Slider name="Her-inzet kolencentrales" />
          <Slider name="Injectie biomethaan in gasmix" />
          <Slider name="Groene waterstof als alternatie" />
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
          <Slider name="Isoleren panden" />
          <Slider name="Optimaal instellen boilers" />
          <Slider name="Aanschaf zonnecollectoren" />
          <Slider name="Percentage bevolking" />
          <Slider name="Aantal graden lager" />
          <Slider name="Overstap warmtepomp" />
          <Slider name="PV op daken" />
          <Slider name="Electriciteitsopslag achter de meter" />
        </FieldGroup>
        <FieldGroup title="Overig" className="mb-6">
          <Slider name="Grootschalige opslag" />
          <Slider name="Sluiting industrie met gas als grondstof" />
          <Slider name="Industrie: bio-methaan als grondstof" />
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
