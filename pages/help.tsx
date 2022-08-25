import { Fragment } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import ExampleSlider from "../components/ExampleSlider";

const Help: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Help - Russian Gas Tool</title>
      </Head>
      <div className="mx-auto py-3 px-6 text-sm sm:py-12 md:px-0" style={{ maxWidth: "65ch" }}>
        <h1 className="flex items-center border-b pb-3 text-xl text-gray-600">
          <Link href="/">
            <a className="">Russian Gas Tool</a>
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-1 h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-semibold">Help</span>
        </h1>
        <div className="prose prose-sm mt-4 pt-3">
          <h3>About the tool</h3>
          <p>
            It’s 24th February as Russia begins an invation of Ukraine. For many, it’s the beginning
            of a fearful and uncertain time. 9.1 Million Ukrainians flee the country.
          </p>
          <p>
            The rest of the world condemns the invasion and together engage a number of sanctions
            against the Russian regime.
          </p>
          <p>
            While theoretically straight-forward, the implementation is hard. Many countries depend
            on Russia for their food and energy and shutting them off completely could cause more
            humanitarian disasters than it could help resolve. Most of Russia’s exports are in fuels
            &amp; energy products (63 percent of total shipments), so the EU’s plan to ban Russian
            coal imports, announced in April, would seem a strike to the heart.
          </p>
          <p>
            However, coal is only responsible for a small share of the flow of capital from the EU,
            and with the actual implementation being postponed to mid-August this year, it seems
            like progress lags far behind urgency.
          </p>
          <p>
            Moreover, as a solid fuel, coal (like oil) can be shipped to other places such as China,
            who has denounced sanctions and proclaimed to maintain normal economic relations with
            Russia.
          </p>
          <p>
            A more effective strategy would be to ban the imports on natural gas, the second-most
            valuable import product from Russia to the EU. Even since the start of the war, EU
            member states have contributed over 30 billion Euros to the Russian state that funds the
            very same war they wish to terminate.
          </p>
          <p>
            Moreover, unlike oil and coal, natural gas is supplied by massive pipelines which cannot
            be rerouted or built elsewhere in a foreseeable future.
          </p>
          <p>But how can the EU cover for a source that supplies almost half of its consumption?</p>
          <p>
            Several countries have asked themselves this question, and while on paper some countries
            can do with a little more import of Liquified Natural Gas (LNG), others, like Germany,
            don’t even come close with their greatest effort.
          </p>
          <p>
            An integral approach, including all EU members states is required. Reports from the IEA
            [1] and European Commission [2] give us some clue of what levers we can pull and knobs
            we can turn, but only give us a vague sense of the overall problem.
          </p>
          <p>
            What happens when we do more of this and less of that? Can we close down an industry
            like we did during the global pandemic of 2019? When we take all these measures, what
            sector takes up the lion’s share of the remaining consumption?
          </p>
          <p>
            These questions are indispensable for the people in charge. How can they decide on
            solutions if they don’t understand the rules of the game?
          </p>
          <p>
            The interactive model presented here provides the user with a system-wide perspective of
            the different things we can do to reduce our reliance on natural gas and consequently
            imports from Russia.
          </p>
          <p>
            We’ve collected a number of sliders from the Energy Transition Model (ETM) which, using
            a 2019 EU-wide scenario, can be set to various values, ranging from minimum effort to a
            realistic and theoretical ideal.
          </p>
          <p>
            Different combinations of settings amongst the sliders give the user a feel of their
            impacts on supply and demand, but also show the implications in terms of cost and
            emissions. Because as the war in Ukraine is definitely a crisis in our time, it’s also
            by no means the only one we should consider.
          </p>
          <p>
            As said, the tool is based on sliders from the Energy Transition Model. To explore
            future scenarios beyond the selection and assumptions made here, check out the complete
            online model [here](https://energytransitionmodel.com/).
          </p>
          <ol>
            <li>
              [1] IEA, “A 10-Point Plan to Reduce the European Union’s Reliance on Russian Natural
              Gas,” 2022.
            </li>
            <li>[2] European Commission, “REPowerEU Plan,” 2022.</li>
          </ol>
        </div>
        <div className="prose prose-sm mt-4 pt-3 ">
          <h3>Sliders</h3>
          <p>
            Most settings in the model are controlled with a slider. You can change a value by
            clicking the blue circle and dragging your mouse to the left or right. Keyboard users,
            or those using assistive technologies can focus a slider by pressing <kbd>Tab</kbd> then
            using the up or down arrows to change the value.
          </p>
          <p>Sliders have minimum and maximum values:</p>
          <ExampleSlider initialValue={50}>
            <div className="flex justify-between">
              <div>Minimum value</div>
              <div>Maximum value</div>
            </div>
          </ExampleSlider>
          <p>
            Some sliders also have a recommended value. This value is based on our research and if
            you&apos;re uncertain about what value to set, the recommended value is a sensible
            default:
          </p>
          <ExampleSlider initialValue={80} mark={37}>
            <div className="flex">
              <div className="w-1/4"></div>
              <div className="">Recommended value</div>
            </div>
          </ExampleSlider>
        </div>
        <div className="mt-12">
          <Link href="/">
            <a className="rounded bg-emerald-500 px-3 py-2 text-base font-medium text-white transition hover:bg-emerald-600 hover:text-white hover:no-underline active:bg-emerald-700">
              ← Back to the tool
            </a>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Help;
