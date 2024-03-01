import { DERO_DENOMINATOR, Helpers } from '@/utils/helpers.js';
import dateString from '@/utils/dateString.js';

export const FundProgress = ({ tile }) => {
  const { iconColor, iconFromGradient } = Helpers.getIconColor(tile.type);
  const iconSrc = Helpers.getIcon(tile.type);
  let progressBarClass = 'progress progress-accent w-full bg-gradient-to-l ';
  progressBarClass += iconFromGradient;

  return (
    <div className="fund_progress">
      <div className="relative grid grid-cols-12 gap-x-4">
        <div className="progress_bar col-span-10 mb-1 space-y-0 md:col-span-11">
          <div className="col-span-12 mb-0 w-full pb-0 text-left">
            <span className="text-2xl font-semibold text-accent sm:text-3xl">
              {tile.Raised / DERO_DENOMINATOR}
            </span>
            &nbsp; raised of the {tile.Goal / DERO_DENOMINATOR} DERO target
          </div>
          <div className="progress_bar_inner relative mt-1">
            <div className="inline-block w-full rounded-full">
              <progress
                className={progressBarClass}
                value={tile.Raised / DERO_DENOMINATOR}
                max={tile.Goal / DERO_DENOMINATOR}
              ></progress>
            </div>
          </div>
        </div>
        <div className="col-span-2 grid place-self-end align-middle md:col-span-1">
          <img src={iconSrc} className="h-1/2" />
        </div>
      </div>
      <p className="text-sm font-medium text-accent">
        {Helpers.calculatePercentage(tile.Raised, tile.Goal, 0)} Complete |
        Deadline: {dateString(tile.Expiry).local}
      </p>
    </div>
  );
};
