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
      enterFrom="opacity-0 translate-y-3"
      enterTo="opacity-100 translate-y-0"
      leave="transition duration-500"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-3"
      className="fixed right-6 bottom-6 translate-y-0 rounded bg-gray-900 p-3 text-gray-100"
    >
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#fff"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="4">
            <circle strokeOpacity=".5" cx="18" cy="18" r="16" />
            <g transform="translate(2 2)">
              <path d="M32 16c0-9.94-8.06-16-16-16">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 16 16"
                  to="360 16 16"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </g>
      </svg>
    </Transition>
  );
}
