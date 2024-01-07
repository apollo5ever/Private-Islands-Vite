import { ClaimTreasure } from '@/components/tileView/mainView/bounty/claimTreasure.jsx';
import { DERO_DENOMINATOR } from '@/utils/helpers.js';
import treasureChest from '@/assets/icons/icon_locked-chest_tan.svg';
import { DeadlineDate } from '@/components/tileView/common/deadlineDate.jsx';

export const ClaimTreasureModal = ({ tile, isModalOpen, setIsModalOpen }) => {
  const closeModal = () => setIsModalOpen(false);

  if (!isModalOpen) return null;

  return (
    <>
      <dialog
        open
        id="modal_claim"
        className="z-50 w-full max-w-screen-sm rounded-lg bg-gradient-to-b from-zinc-100 to-zinc-50 shadow-2xl shadow-slate-500 ring-1 ring-accent"
      >
        <div className="-box relative pb-2">
          <div className="close modal-action sticky right-0 top-0 z-40 mb-8 mt-0 w-full text-right">
            <form method="dialog">
              <button
                className="btn cursor-pointer rounded-bl-[25px] rounded-tr-lg bg-gradient-to-b from-[#61C0A8] to-[#6CCAB1] px-6 py-2 text-center text-lg text-[#FFF] hover:scale-105 hover:shadow-inner sm:rounded-bl-[35px] sm:text-2xl"
                onClick={closeModal}
              >
                Close
              </button>
            </form>
          </div>

          <div className="modal_content -mt-[35px] px-4 md:px-6">
            <div className="grid grid-cols-12">
              <h3 className="col-span-10 text-2xl leading-8 sm:text-3xl">
                Claim the <strong className="text-accent">Big Baby</strong>{' '}
                Buried Treasure
              </h3>
            </div>
            <div className="clear-both h-1"></div>
            <div className="claim_info mx-auto grid w-full flex-1 grid-cols-1 content-between">
              <div className="upper_content relative w-full space-y-3 py-4 leading-6">
                <div className="fund_bounty mx-2">
                  <hr className="mb-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-[#E5D7B9] to-transparent opacity-25 dark:opacity-100" />
                  <div className="relative grid grid-cols-12 gap-x-4">
                    <div className="progress_bar col-span-10 mb-1 space-y-0">
                      <div className="col-span-12 mb-0 w-full pb-0 text-left">
                        <span className="text-2xl font-semibold text-[#61C0A8] sm:text-3xl">
                          {tile.Amount / DERO_DENOMINATOR} DERO
                        </span>
                        &nbsp; treasure to be claimed
                      </div>
                    </div>

                    <div className="col-span-2 grid place-self-end">
                      <img src={treasureChest} className="h-full" />
                    </div>
                  </div>
                  <p className="text-sm">
                    Deadline: <DeadlineDate date={tile.Expiry} />
                  </p>
                  <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-[#E5D7B9] to-transparent opacity-25 dark:opacity-100" />
                </div>
              </div>
            </div>
            <ClaimTreasure tile={tile} />
          </div>
        </div>
      </dialog>
    </>
  );
};
