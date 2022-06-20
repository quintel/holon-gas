export default function InitialLoading(): React.ReactElement {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex items-center rounded-full border-2 border-gray-300 bg-white py-3 px-5 text-gray-800">
        <svg
          width="32"
          height="32"
          viewBox="0 0 28 28"
          className="mr-2"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#1d4ed8"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="2">
              <circle stroke="#d1d5db" cx="12" cy="12" r="12" />
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
        <span className="text-xg">Loading&hellip;</span>
      </div>
    </div>
  );
}
