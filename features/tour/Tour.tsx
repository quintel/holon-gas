import { Fragment, useCallback } from "react";
import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS, Step } from "react-joyride";

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

        {id === "production" && (
          <div className="mt-3 border-t-2">
            <p>
              Some sliders also have a recommended value. If you&apos;re uncertain about what value
              to set, the recommended value is a sensible default.
            </p>
            <ExampleSlider initialValue={0} mark={50}>
              <div className="flex justify-center">
                <div className="">Recommended value</div>
              </div>
            </ExampleSlider>
          </div>
        )}
      </div>
    </Fragment>
  );
};

const Tour: React.FC<{}> = () => {
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
      } else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
        dispatch(setStep(index + (action === ACTIONS.PREV ? -1 : 1)));
      }
    },
    [dispatch]
  );

  return (
    <div>
      <button
        className="inline-flex items-center rounded px-3 py-2 text-blue-500 transition hover:bg-gray-200 hover:text-blue-700 hover:no-underline active:bg-gray-300"
        onClick={() => dispatch(startTour())}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 -mt-1 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>{" "}
        Take a quick tour
      </button>
      <Joyride
        steps={[
          {
            target: "#presets",
            content: renderContent(tourTexts.presets, "presets"),
            placement: "right-start",
            disableBeacon: true,
          },
          {
            target: "#production",
            content: renderContent(tourTexts.production, "production"),
            placement: "right-start",
            disableBeacon: true,
          },
          {
            target: "#savings",
            content: renderContent(tourTexts.savings, "savings"),
            placement: "right-start",
            disableBeacon: true,
          },
          {
            target: "#results",
            content: renderContent(tourTexts.results, "results"),
            placement: "left-start",
            disableBeacon: true,
          },
        ]}
        continuous
        stepIndex={stepIndex}
        run={isActive}
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
