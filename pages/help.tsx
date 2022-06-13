import { Fragment } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import ExampleSlider from "../components/ExampleSlider";

const Help: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Hello</title>
      </Head>
      <div className="mx-auto py-12 text-sm" style={{ maxWidth: "65ch" }}>
        <h1 className="flex items-center border-b pb-3 text-xl text-gray-600">
          <Link href="/">
            <a className="">HOLON Russian Gas Tool</a>
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
        <div className="prose prose-sm mt-4 pt-3 ">
          <h3>The Tool</h3>
          <p>
            Cupcake ipsum dolor sit amet tart sugar plum. Biscuit cheesecake caramels halvah pie
            wafer. Pastry tiramisu tootsie roll sesame snaps bonbon topping tootsie roll.
          </p>
          <p>
            Sweet roll brownie muffin jelly beans danish. Dessert tart caramels jelly-o danish oat
            cake lemon drops jelly beans oat cake. Chupa chups fruitcake oat cake cheesecake muffin
            jelly beans fruitcake jelly beans jujubes. Gummi bears fruitcake ice cream marshmallow
            soufflé pastry chocolate dragée.
          </p>
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
