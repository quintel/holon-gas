interface Props {
  onClose: () => void;
}

export default function ResponseError({ onClose }: Props): React.ReactElement {
  return (
    <div
      className="text-center mt-32 p-9 bg-gray-100 mx-auto rounded-lg"
      style={{ width: "650px" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-red-700 mb-3 inline-block"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
      </svg>
      <h1 className="text-2xl text-red-700 font-semibold">An error occurred</h1>
      <p className="pt-5 w-10/12 mx-auto">
        Sorry, an error occurred while trying to save your choices and we cannot show you the
        results.
      </p>
      <p className="pt-6 flex justify-center">
        <button
          onClick={onClose}
          className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow active:shadow-none transition-color duration-150 p-3 rounded font-semibold flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try again
        </button>
      </p>
    </div>
  );
}
