import { Fragment, useCallback, useEffect } from "react";
import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS } from "react-joyride";

import { useAppSelector, useAppDispatch } from "../hooks";
import { startTour, closeTour, setStep, isActiveSelector, stepSelector } from "./tour-slice";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import ExampleSlider from "../../components/ExampleSlider";
import tourTexts from "../../data/tour-texts";

const renderContent = (content: string, id: string) => {
  return (
    <Fragment>
      <div className="prose prose-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]} linkTarget="_blank">
          {content}
        </ReactMarkdown>

        {id === "slider-settings" && (
          <ExampleSlider initialValue={0} mark={50}>
            <div className="flex justify-center">
              <div className="">Recommended value</div>
            </div>
          </ExampleSlider>
        )}
      </div>
    </Fragment>
  );
};

const Tour: React.FC = () => {
  const isActive = useAppSelector(isActiveSelector);
  const stepIndex = useAppSelector(stepSelector);

  const dispatch = useAppDispatch();

  const callback = useCallback(
    ({ action, index, status, type }: CallBackProps) => {
      if (
        ([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status) ||
        action === ACTIONS.CLOSE
      ) {
        dispatch(closeTour());
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
        dispatch(setStep(index + (action === ACTIONS.PREV ? -1 : 1)));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (stepIndex < 2) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [stepIndex]);

  return (
    <div>
      <button
        className="inline-flex items-center rounded px-2 py-1 text-midnight-500 transition hover:bg-gray-200 hover:text-midnight-700 hover:no-underline active:bg-gray-300"
        onClick={() => dispatch(startTour())}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        Take a quick tour
      </button>
      <Joyride
        steps={[
          {
            target: "#gas-production",
            content: renderContent(tourTexts.howItWorks, "gas-production"),
            placement: "right-start",
            disableBeacon: true,
          },
          {
            target: "#tour-slider-settings",
            content: renderContent(tourTexts.sliderSettings, "slider-settings"),
            placement: "right-start",
            disableBeacon: true,
          },
          {
            target: "#tour-results-imports",
            content: renderContent(tourTexts.resultsImports, "results-imports"),
            placement: "left-start",
            disableBeacon: true,
          },
          {
            target: "#tour-results-capital-flow",
            content: renderContent(tourTexts.resultsCapitalFlow, "results-capital-flow"),
            placement: "left-start",
            disableBeacon: true,
          },
          {
            target: "#tour-results-costs",
            content: renderContent(tourTexts.resultsCosts, "results-costs"),
            placement: "left-end",
            disableBeacon: true,
          },
          {
            target: "#tour-results-emissions",
            content: renderContent(tourTexts.resultsEmissions, "results-emissions"),
            placement: "left-end",
            disableBeacon: true,
          },
          {
            target: "#tour-etm",
            content: renderContent(tourTexts.etm, "etm"),
            placement: "left-end",
            disableBeacon: true,
          },
        ]}
        continuous
        stepIndex={stepIndex}
        run={isActive}
        disableScrolling={stepIndex < 2}
        callback={callback}
        styles={{
          options: {
            primaryColor: "rgb(59, 130, 246)",
          },
          tooltipContainer: {
            textAlign: "left",
            fontSize: "0.875rem",
            margin: "-20px 0",
          },
          buttonNext: {
            padding: "0.5rem 0.75rem",
          },
          buttonSkip: {
            padding: "0.5rem 0.75rem",
          },
          buttonBack: {
            padding: "0.5rem 0.75rem",
          },
        }}
      />
    </div>
  );
};

export default Tour;
