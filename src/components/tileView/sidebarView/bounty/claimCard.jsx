import { DERO_DENOMINATOR, Helpers } from '@/utils/helpers.js';
import treasureChest from '/src/assets/icons/icon_locked-chest_tan.svg';
import dateString from '@/utils/dateString.js';
import { DeadlineDate } from '@/components/tileView/common/deadlineDate.jsx';
import { ClaimTreasure } from '@/components/tileView/mainView/bounty/claimTreasure.jsx';

export const ClaimCard = ({ bountyData }) => {
  return (
    <div className="upper_content relative w-full space-y-3 py-2 leading-6">
      <h3 className="col-span-10 text-2xl leading-8 sm:text-3xl">
        Claim the{' '}
        <strong className="text-accent">
          {Helpers.getTileName(bountyData)}
        </strong>{' '}
        Buried Treasure
      </h3>

      <div className="fund_bounty mx-2">
        <hr className="mb-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-[#E5D7B9] to-transparent opacity-25 dark:opacity-100" />

        <div className="relative grid grid-cols-12 gap-x-4">
          <div className="progress_bar col-span-10 mb-1 space-y-0">
            <div className="col-span-12 mb-0 w-full pb-0 text-left">
              <span className="text-2xl font-semibold text-[#61C0A8] sm:text-3xl">
                {bountyData.Amount / DERO_DENOMINATOR} DERO
              </span>
              &nbsp; treasure to be claimed
            </div>
          </div>

          <div className="col-span-2 grid place-self-end">
            <img src={treasureChest} className="h-full" />
          </div>
        </div>
        <p className="text-sm">
          Deadline: <DeadlineDate date={bountyData.Expiry} />
        </p>

        <hr className="mt-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-[#E5D7B9] to-transparent opacity-25 dark:opacity-100" />
      </div>
      <div className="clear-both h-1"></div>
      <ClaimTreasure tile={bountyData} />
    </div>
  );
};
