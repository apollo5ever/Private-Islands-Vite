import leftChevron from '/src/assets/images/ChevronLeft.svg';

export const LeftChevron = () => {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
      <ChevronIcon className="h-10 w-10" src={leftChevron} />
    </div>
  );
};

const ChevronIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={298}
    height={512}
    fillRule="evenodd"
    clipRule="evenodd"
    imageRendering="optimizeQuality"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    viewBox="0 0 298 511.93"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="nonzero"
      d="M285.77 441c16.24 16.17 16.32 42.46.15 58.7-16.16 16.24-42.45 16.32-58.69.16l-215-214.47c-16.24-16.16-16.32-42.45-.15-58.69L227.23 12.08c16.24-16.17 42.53-16.09 58.69.15 16.17 16.24 16.09 42.54-.15 58.7l-185.5 185.04L285.77 441z"
    />
  </svg>
);
export default ChevronIcon;
