import { DERO_DENOMINATOR, Helpers } from '@/utils/helpers.js';
import { useState } from 'react';
import { useBountyActions } from '@/components/hooks/useBountyActions.js';
import { ClaimTreasureModal } from '@/components/tileView/common/bounty/ClaimTreasureModal.jsx';

export const StickyActionsBar = ({ tile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { iconColor, iconFromGradient } = Helpers.getIconColor(tile.type);
  const {} = useBountyActions(tile);

  return (
    <>
      <div className="floating_donation_bar fixed bottom-0 left-0 right-0 z-40 mx-auto inline-block w-full rounded-t-lg bg-gradient-to-b from-zinc-100 to-zinc-50 px-4 py-3 shadow-[0_20px_30px_25px_rgba(0,0,0,0.6)] ring-1 ring-accent lg:hidden">
        <div className="upper_content relative mx-auto grid w-full content-between">
          {tile.Status === 0 && (
            <div className="fund_progress relative w-full">
              <div className="progress_amount mb-2 grid grid-cols-12 place-items-center gap-x-4 space-y-0">
                <div className="col-span-8 mb-0 w-full pb-0 text-sm font-semibold sm:text-lg">
                  <span className="text-xl text-accent sm:text-3xl">
                    {tile.Amount / DERO_DENOMINATOR}
                  </span>
                  &nbsp; treasure to be claimed
                </div>
                <div className="donate_button col-span-4 mb-0 w-full pb-0">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn w-full cursor-pointer rounded-bl-[25px] rounded-tr-[25px] bg-gradient-to-b from-accent to-[#6CCAB1] py-1 text-center text-lg italic text-[#FFF] hover:scale-105 hover:shadow-inner sm:rounded-bl-[35px] sm:rounded-tr-[35px] sm:text-3xl"
                  >
                    Claim Now!
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ClaimTreasureModal
        tile={tile}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
