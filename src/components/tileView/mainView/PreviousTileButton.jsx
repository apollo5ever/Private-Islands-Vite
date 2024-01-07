export const PreviousTileButton = ({ onClick, disabled = false }) => {
  const buttonClasses = `inline-flex h-8 items-center gap-2 rounded-md ${
    disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent'
  } pl-2 lg:gap-3 lg:pr-4`;

  const handleClick = disabled ? undefined : onClick;

  return (
    <div className="prev_btn justify-self-start">
      <div onClick={handleClick} className={buttonClasses}>
        <svg
          className="h-6 w-6 fill-white md:h-8 md:w-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
        </svg>
        <span className="hidden text-xs font-normal text-white lg:block">
          Prev
        </span>
      </div>
    </div>
  );
};
