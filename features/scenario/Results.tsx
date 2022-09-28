import { Fragment } from "react";

import { Tab } from "@headlessui/react";

import ResultsEU from "./ResultsEU";
import ResultsNL from "./ResultsNL";

import { useAppDispatch, useAppSelector } from "../hooks";
import { resultsRegionSelector, setResultsRegion } from "./scenario-slice";

const baseStyles =
  "w-1/2 font-medium text-base transition outline-0 flex items-center justify-center gap-1";
const standardStyles = `${baseStyles} opacity-70 hover:opacity-90`;
const selectedStyles = `${baseStyles} opacity-100 cursor-default`;

function NLFlag() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="flag-icons-nl"
      viewBox="0 0 640 480"
      width="24"
      className="rounded"
    >
      <path fill="#21468b" d="M0 0h640v480H0z" />
      <path fill="#fff" d="M0 0h640v320H0z" />
      <path fill="#ae1c28" d="M0 0h640v160H0z" />
    </svg>
  );
}

function EUFlag() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="flag-icons-eu"
      viewBox="0 0 640 480"
      width="24"
      className="rounded"
    >
      <defs>
        <g id="d">
          <g id="b">
            <path id="a" d="m0-1-.3 1 .5.1z" />
            <use xlinkHref="#a" transform="scale(-1 1)" />
          </g>
          <g id="c">
            <use xlinkHref="#b" transform="rotate(72)" />
            <use xlinkHref="#b" transform="rotate(144)" />
          </g>
          <use xlinkHref="#c" transform="scale(-1 1)" />
        </g>
      </defs>
      <path fill="#039" d="M0 0h640v480H0z" />
      <g fill="#fc0" transform="translate(320 242.3) scale(23.7037)">
        <use xlinkHref="#d" width="100%" height="100%" y="-6" />
        <use xlinkHref="#d" width="100%" height="100%" y="6" />
        <g id="e">
          <use xlinkHref="#d" width="100%" height="100%" x="-6" />
          <use xlinkHref="#d" width="100%" height="100%" transform="rotate(-144 -2.3 -2.1)" />
          <use xlinkHref="#d" width="100%" height="100%" transform="rotate(144 -2.1 -2.3)" />
          <use xlinkHref="#d" width="100%" height="100%" transform="rotate(72 -4.7 -2)" />
          <use xlinkHref="#d" width="100%" height="100%" transform="rotate(72 -5 .5)" />
        </g>
        <use xlinkHref="#e" width="100%" height="100%" transform="scale(-1 1)" />
      </g>
    </svg>
  );
}

export default function Results() {
  const dispatch = useAppDispatch();
  const region = useAppSelector(resultsRegionSelector);
  const selectedIndex = region == "nl" ? 1 : 0;

  const setSelectedIndex = (index: number) => {
    dispatch(setResultsRegion(index === 1 ? "nl" : "eu"));
  };

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List className="mb-5 flex gap-1">
        <Tab as={Fragment}>
          {({ selected }) => (
            <button className={selected ? selectedStyles : standardStyles}>
              <EUFlag /> EU-27
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button className={selected ? selectedStyles : standardStyles}>
              <NLFlag /> Netherlands
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <ResultsEU />
        </Tab.Panel>
        <Tab.Panel>
          <ResultsNL />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
