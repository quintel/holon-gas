import { isEqual } from "lodash";

import { ScenarioState, API_HOST } from "./scenario-slice";
import inputs from "../../data/inputs";
import expectedQueries from "../../data/queries";

/**
 * Increment this whenver you wish to expire the cached state for all users.
 */
const SCHEMA_VERSION = 7;

interface PersistedState {
  scenario: ScenarioState;
  version: string;
}

function currentSchemaVersion() {
  return `v${SCHEMA_VERSION}:${API_HOST}`;
}

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
  if (!currentInputs) {
    return false;
  }

  const expectedInputs = Object.keys(inputs);
  const actualInputs = Object.keys(currentInputs);

  return isEqual(new Set(expectedInputs), new Set(actualInputs));
}

export function saveState(state: ScenarioState) {
  localStorage.setItem(
    "scenario-state",
    JSON.stringify({ version: currentSchemaVersion(), scenario: state })
  );
}

export function loadState(): ScenarioState | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const serializedState = localStorage.getItem("scenario-state");

  if (!serializedState) {
    return undefined;
  }

  const parsed = JSON.parse(serializedState) as PersistedState;

  if (
    parsed.scenario &&
    parsed.version === currentSchemaVersion() &&
    areInputsValid(parsed.scenario.inputs) &&
    areQueriesValid(parsed.scenario.results) &&
    areQueriesValid(parsed.scenario.initialResults)
  ) {
    return parsed.scenario;
  }

  return;
}

export function clearState() {
  if (typeof window === "undefined") {
    return undefined;
  }

  localStorage.removeItem("scenario-state");
}
