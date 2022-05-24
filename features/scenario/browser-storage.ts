import { isEqual } from "lodash";

import { ScenarioState } from "./scenario-slice";
import inputs from "../../data/inputs";
import expectedQueries from "../../data/queries";

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

  const parsed = JSON.parse(serializedState);

  // Verify that the serialized state contains all the inputs.
  const expectedInputs = Object.keys(inputs);
  const actualInputs = Object.keys(parsed.inputs);

  if (!isEqual(new Set(expectedInputs), new Set(actualInputs))) {
    return undefined;
  }

  // Verify that all gqueries are present.
  const actualQueries = Object.keys(parsed.results);

  if (!isEqual(new Set(expectedQueries), new Set(actualQueries))) {
    return undefined;
  }

  return parsed;
}
