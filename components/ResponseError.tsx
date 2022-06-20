interface Props {
  onClose: () => void;
}

export default function ResponseError({ onClose }: Props): React.ReactElement {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="rounded-lg bg-gray-100 p-9 text-center" style={{ width: "650px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mb-3 inline-block h-10 w-10 text-red-700"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <h1 className="text-2xl font-semibold text-red-700">An error occurred</h1>
        <p className="mx-auto w-10/12 pt-5">
          Sorry, an error occurred while trying to save your choices and we cannot show you the
          results.
        </p>
        <p className="flex justify-center pt-6">
          <button
            onClick={onClose}
            className="transition-color flex rounded bg-emerald-600 p-3 font-semibold text-white shadow duration-150 hover:bg-emerald-700 active:bg-emerald-800 active:shadow-none"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try again
          </button>
        </p>
      </div>
    </div>
  );
}
