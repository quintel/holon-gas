import DemandChart from "./DemandChart";
import ResultsChartEU from "./ResultsChartEU";
import SecondaryResults from "./SecondaryResults";
import HelpButton from "../../components/HelpButton";

import helpTexts from "../../data/help-texts";

export default function ResultsEU() {
  return (
    <>
      <div className="relative flex">
        <h2 className="text-lg">Gas imported from Russia</h2>
        <div className="ml-auto">
          <HelpButton text={helpTexts.results} />
        </div>
      </div>
      <ResultsChartEU />
      <div id="tour-results-imports">
        <div className="relative flex pt-3">
          <h2 className="text-lg">Gas supply and demand</h2>
          <div className="ml-auto">
            <HelpButton text={helpTexts.gasSupplyAndDemand} />
          </div>
        </div>
        <div className="pb-3">
          <DemandChart />
        </div>
      </div>
      <SecondaryResults />
    </>
  );
}
