import { Transition } from "@headlessui/react";

import { useAppSelector } from "../hooks";
import { requestStateSelector } from "./scenario-slice";

/**
 * The animated SVG icon is MIT licensed.
 * https://github.com/SamHerbert/SVG-Loaders
 */

export default function LoadingStatus() {
  const { isLoading } = useAppSelector(requestStateSelector);

  return (
    <Transition
      show={isLoading}
      enter="transition duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed right-6 bottom-6 bg-gray-900 text-gray-100 p-3 rounded"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 28 28"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#fff"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".5" cx="12" cy="12" r="12" />
            <path d="M24 12c0-9.94-8.06-12-12-12">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 12 12"
                to="360 12 12"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    </Transition>
  );
}
