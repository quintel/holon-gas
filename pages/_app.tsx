import "../styles/globals.css";
import type { AppProps } from "next/app";

import "@fontsource/inter/variable.css";

import { Provider } from "react-redux";
import { store } from "../features/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
