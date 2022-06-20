import { Fragment, useEffect } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

import App from "../components/App";
import InitialLoading from "../components/InitialLoading";
import ResponseError from "../components/ResponseError";

import { useAppSelector, useAppDispatch } from "../features/hooks";
import {
  uiReadySelector,
  requestStateSelector,
  sendAPIRequest,
  scenarioIdSelector,
} from "../features/scenario/scenario-slice";

import { clearState } from "../features/scenario/browser-storage";

const Home: NextPage = () => {
  const { isFailure } = useAppSelector(requestStateSelector);

  const uiReady = useAppSelector(uiReadySelector);
  const scenarioId = useAppSelector(scenarioIdSelector);

  const dispatch = useAppDispatch();

  // Sends an initial API request to ETEngine to set default input values and get data for charts.
  useEffect(() => {
    if (!uiReady) {
      dispatch(sendAPIRequest());
    }
  }, [uiReady, dispatch]);

  let content;

  if (isFailure) {
    content = (
      <ResponseError
        onClose={() => {
          clearState();
          window.location = window.location;
        }}
      />
    );
  } else if (!uiReady) {
    content = <InitialLoading />;
  } else {
    content = <App scenarioId={scenarioId} />;
  }

  return (
    <Fragment>
      <Head>
        <title>Russian Gas Tool</title>
      </Head>
      {content}
    </Fragment>
  );
};

// Opt out of SSR since we're loading data from localStorage which differs from the server causing
// hydration errors. There's probably a better way to fix this.
export default dynamic(() => Promise.resolve(Home), { ssr: false });
