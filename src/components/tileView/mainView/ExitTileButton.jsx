export const ExitTileButton = ({ onClick }) => (
  <div
    onClick={onClick}
    className="inline-flex items-center rounded-md bg-accent px-2 hover:cursor-pointer"
  >
    <div className="flex flex-col items-end">
      <span className="text-md text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 stroke-white md:h-8 md:w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
    </div>
  </div>
);
