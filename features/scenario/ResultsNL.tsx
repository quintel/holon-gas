import DemandChart from "./DemandChart";
import ResultsChartNL from "./ResultsChartNL";
import SecondaryResults from "./SecondaryResults";
import HelpButton from "../../components/HelpButton";

import helpTexts from "../../data/help-texts";

export default function ResultsNL() {
  return (
    <>
      <div className="relative flex">
        <h2 className="text-lg">Gas imported from Russia</h2>
        <div className="ml-auto">
          <HelpButton text={helpTexts.results} />
        </div>
      </div>
      <ResultsChartNL />
    </>
  );
}
