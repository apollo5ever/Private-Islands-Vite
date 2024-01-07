import { FundProgress } from '@/components/tileView/common/fundraiser/FundProgress.jsx';
import { Helpers } from '@/utils/helpers.js';
import { DonateForm } from '@/components/tileView/common/fundraiser/DonateForm.jsx';
import { RewardInfoBox } from '@/components/tileView/common/fundraiser/RewardInfoBox.jsx';
import { useFundraiserActions } from '@/components/hooks/useFundraiserActions.js';

export const DonateModal = ({ tile, isModalOpen, setIsModalOpen }) => {
  const closeModal = () => setIsModalOpen(false);

  if (!isModalOpen) return null;

  return (
    <dialog
      open
      className="z-50 w-full max-w-screen-sm rounded-lg bg-gradient-to-b from-zinc-100 to-zinc-50 shadow-2xl shadow-slate-500 ring-1 ring-accent"
    >
      <div className="relative pb-4">
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
              Make a donation to the{' '}
              <strong className="text-accent">
                {Helpers.getTileName(tile)}
              </strong>{' '}
              fundraiser
            </h3>
          </div>
          <div className="clear-both h-3"></div>

          <hr className="mb-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-[#E5D7B9] to-transparent opacity-25 dark:opacity-100" />
          <div className="clear-both"></div>
          <DonateForm tile={tile} />
          <FundProgress tile={tile} />
          <div className="clear-both"></div>
          <hr className="mt-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-[#E5D7B9] to-transparent opacity-25 dark:opacity-100" />
          {tile.ICO && <RewardInfoBox tile={tile} />}
        </div>
      </div>
    </dialog>
  );
};
