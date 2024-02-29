import { DonateModal } from '@/components/tileView/common/fundraiser/DonateModal.jsx';
import { useState } from 'react';
import { useFundraiserActions } from '@/components/hooks/useFundraiserActions.js';

export const ActionButtons = ({ tile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleWithdraw, handleGetTokens } = useFundraiserActions(tile);

  return (
    <>
      {tile.Status === 0 ? (
        <div className="buttons grid justify-items-center gap-5 pb-2 pt-4 sm:grid-cols-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn w-full cursor-pointer rounded-bl-[35px] rounded-tr-[35px] bg-gradient-to-b from-[#61C0A8] to-[#6CCAB1] py-1 text-center text-3xl leading-tight text-[#FFF] hover:shadow-lg"
          >
            Donate
          </button>
          {/*TODO Hiding this for now as we have not share functionality yet*/}
          {/*<button className="btn w-full cursor-pointer rounded-bl-[35px] rounded-tr-[35px] bg-gradient-to-b from-[#61C0A8] to-[#6CCAB1] py-1 text-center text-3xl leading-tight text-[#FFF] hover:shadow-lg">*/}
          {/*  Share*/}
          {/*</button>*/}
        </div>
      ) : tile.Status === 1 ? (
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
                  If you are the owner, you can withdraw the funds to the fundee
                  now.
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
      ) : tile.Status === 2 ? (
        <>
          <div className="clear-both h-2"></div>
          <div className="failed_withdraw mb-4 w-full pb-2">
            <div className="failed_msg content-center items-center gap-4 rounded-lg bg-gradient-to-b from-inherit to-inherit px-4 py-4 shadow-lg ring-1 ring-slate-300">
              <div className="message_text">
                <h3 className="text-2xl font-[800] drop-shadow-lg">
                  This Smoke Signal failed to meet its goal.
                </h3>
                <div className="clear-both h-2 w-full"></div>
                <p className="drop-shadow-lg">
                  If you made a refundable donation, you can withdraw those
                  funds now.
                </p>
              </div>
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
      ) : (
        <></>
      )}
      <DonateModal
        tile={tile}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
