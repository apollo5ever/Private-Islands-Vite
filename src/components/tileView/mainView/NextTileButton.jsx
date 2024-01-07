export const NextTileButton = ({ onClick, disabled = false }) => {
  const buttonClasses = `inline-flex h-8 items-center gap-2 rounded-md ${
    disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent'
  } pl-2 lg:gap-3 lg:pr-4`;

  const handleClick = disabled ? undefined : onClick;

  return (
    <div className="next_btn justify-self-start">
      <div onClick={handleClick} className={buttonClasses}>
        <div className="flex flex-col items-start">
          <span className="hidden text-xs font-normal text-white lg:block">
            Next
          </span>
        </div>
        <svg
          className="h-6 w-6 fill-white md:h-8 md:w-8"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
        </svg>
      </div>
    </div>
  );
};
