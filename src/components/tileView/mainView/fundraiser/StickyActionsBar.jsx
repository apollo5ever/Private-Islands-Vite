import { useFundraiserActions } from '@/components/hooks/useFundraiserActions.js';
import { DERO_DENOMINATOR, Helpers } from '@/utils/helpers.js';
import { DonateModal } from '@/components/tileView/common/fundraiser/DonateModal.jsx';
import { useState } from 'react';

export const StickyActionsBar = ({ tile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { iconColor, iconFromGradient } = Helpers.getIconColor(tile.type);
  const { handleWithdraw, handleGetTokens } = useFundraiserActions(tile);

  let progressBarClass = 'progress progress-accent w-full bg-gradient-to-l';
  progressBarClass += iconFromGradient;

  return (
    <>
      <div className="floating_donation_bar fixed bottom-0 left-0 right-0 z-40 mx-auto inline-block w-full rounded-t-lg bg-gradient-to-b from-zinc-100 to-zinc-50 px-4 py-3 shadow-[0_20px_30px_25px_rgba(0,0,0,0.6)] ring-1 ring-accent lg:hidden">
        <div className="upper_content relative mx-auto grid w-full content-between">
          {tile.Status === 0 && (
            <div className="fund_progress relative w-full">
              <div className="progress_amount mb-2 grid grid-cols-12 place-items-center gap-x-4 space-y-0">
                <div className="col-span-8 mb-0 w-full pb-0 text-sm font-semibold sm:text-lg">
                  <span className="text-xl text-accent sm:text-3xl">
                    {tile.Raised / DERO_DENOMINATOR}
                  </span>
                  &nbsp; raised of the {tile.Goal / DERO_DENOMINATOR} DERO
                  target
                </div>
                <div className="donate_button col-span-4 mb-0 w-full pb-0">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn w-full cursor-pointer rounded-bl-[25px] rounded-tr-[25px] bg-gradient-to-b from-accent to-[#6CCAB1] py-1 text-center text-lg italic text-[#FFF] hover:scale-105 hover:shadow-inner sm:rounded-bl-[35px] sm:rounded-tr-[35px] sm:text-3xl"
                  >
                    Donate
                  </button>
                </div>
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
          )}
          {tile.Status === 1 && (
            <>
              <div className="clear-both h-2"></div>
              <div className="failed_withdraw mb-4 w-full pb-2">
                <div className="failed_msg content-center items-center gap-4 rounded-lg bg-gradient-to-b from-inherit to-inherit px-4 py-4 shadow-lg ring-1 ring-slate-300">
                  <div className="message_text">
                    <h3 className="text-2xl font-[800] drop-shadow-lg">
                      This Smoke Signal has met its fundraiser goal!
                    </h3>
                    <div className="clear-both h-2 w-full"></div>
                    <p className="drop-shadow-lg">
                      If you are the owner, you can withdraw the funds to the
                      fundee now.
                    </p>
                  </div>
                  {tile.ICO && (
                    <>
                      <button
                        onClick={(event) => {
                          handleGetTokens(event);
                        }}
                        className="btn w-1/2 cursor-pointer rounded-bl-[25px] rounded-tr-[25px] bg-gradient-to-b from-accent to-[#6CCAB1] py-1 text-center text-lg text-[#FFF] hover:scale-105 hover:shadow-inner sm:rounded-bl-[35px] sm:rounded-tr-[35px] sm:text-3xl"
                      >
                        Get Tokens
                      </button>
                    </>
                  )}
                  <div className="clear-both h-4"></div>
                  <form onSubmit={handleWithdraw}>
                    <button
                      type={'submit'}
                      className="btn w-full cursor-pointer rounded-bl-[25px] rounded-tr-[25px] bg-gradient-to-b from-accent to-[#6CCAB1] py-1 text-center text-lg text-[#FFF] hover:scale-105 hover:shadow-inner sm:rounded-bl-[35px] sm:rounded-tr-[35px] sm:text-3xl"
                    >
                      Withdraw
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
          {tile.Status === 2 && (
            <>
              <div className="text-xl font-semibold">
                This Smoke Signal failed to meet its goal. If you made a
                refundable donation, you can withdraw those funds now.
              </div>
              <form onSubmit={handleWithdraw}>
                <button
                  type={'submit'}
                  className="btn w-full cursor-pointer rounded-bl-[25px] rounded-tr-[25px] bg-gradient-to-b from-accent to-[#6CCAB1] py-1 text-center text-lg italic text-[#FFF] hover:scale-105 hover:shadow-inner sm:rounded-bl-[35px] sm:rounded-tr-[35px] sm:text-3xl"
                >
                  Withdraw
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <DonateModal
        tile={tile}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
