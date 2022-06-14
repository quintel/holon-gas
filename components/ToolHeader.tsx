import Link from "next/link";

import Tour from "../features/tour/Tour";

const ToolHeader: React.FC<{}> = () => {
  return (
    <div className="-mb-2 flex w-full items-center justify-between gap-3 px-6 pt-5">
      <h1 className="text-xl font-medium">Russian Gas Tool</h1>
      <div className="flex items-center">
        <Tour />

        <Link href="/help">
          <a className="inline-flex items-center rounded px-2 py-1 text-blue-500 transition hover:bg-gray-200 hover:text-blue-700 hover:no-underline">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>{" "}
            About the tool
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ToolHeader;
