import { isEqual } from "lodash";

import { ScenarioState } from "./scenario-slice";
import inputs from "../../data/inputs";
import expectedQueries from "../../data/queries";

/**
 * Determines if the queries in the persisted scenario contain all the data needed to show the
 * results.
 */
function areQueriesValid(currentQueries: ScenarioState["results"]) {
  return (
    currentQueries &&
    Object.keys(currentQueries).length === expectedQueries.length &&
    isEqual(new Set(Object.keys(currentQueries)), new Set(expectedQueries))
  );
}

/**
 * Determines if the inputs in the persisted scenario contain the keys needed to show the scenario.
 */
function areInputsValid(currentInputs: ScenarioState["inputs"]) {
  const expectedInputs = Object.keys(inputs);
  const actualInputs = Object.keys(currentInputs);

  return isEqual(new Set(expectedInputs), new Set(actualInputs));
}

export function saveState(state: ScenarioState) {
  localStorage.setItem("scenario-state", JSON.stringify(state));
}

export function loadState(): ScenarioState | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const serializedState = localStorage.getItem("scenario-state");

  if (!serializedState) {
    return undefined;
  }

  const parsed = JSON.parse(serializedState) as ScenarioState;

  if (
    areInputsValid(parsed.inputs) &&
    areQueriesValid(parsed.results) &&
    areQueriesValid(parsed.initialResults)
  ) {
    return parsed;
  }

  return;
}

export function clearState() {
  if (typeof window === "undefined") {
    return undefined;
  }

  localStorage.removeItem("scenario-state");
}
