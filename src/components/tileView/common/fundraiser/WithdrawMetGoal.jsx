import { useFundraiserActions } from '@/components/hooks/useFundraiserActions.js';
export const WithdrawMetGoal = ({ tile }) => {
  const { handleWithdraw, handleOaoWithdraw } = useFundraiserActions(tile);

  // TODO MTS -- This hasn't been tested or formatted
  return (
    <>
      {tile.Status === 0 &&
      tile.WithdrawlType === 'address' &&
      tile.Raised >= tile.Goal ? (
        <form onSubmit={handleWithdraw}>
          <button
            className="btn w-full cursor-pointer rounded-bl-[35px] rounded-tr-[35px] bg-gradient-to-b from-[#61C0A8] to-[#6CCAB1] py-1 text-center text-3xl leading-tight text-[#FFF] hover:shadow-lg"
            type={'submit'}
          >
            Withdraw
          </button>
        </form>
      ) : (
        ''
      )}
      {tile.Status === 0 &&
      tile.WithdrawlType === 'token' &&
      tile.Raised >= tile.Goal ? (
        <form onSubmit={handleOaoWithdraw}>
          <input type="number" placeholder="amount" id="amount" />
          <button
            className="btn w-full cursor-pointer rounded-bl-[35px] rounded-tr-[35px] bg-gradient-to-b from-[#61C0A8] to-[#6CCAB1] py-1 text-center text-3xl leading-tight text-[#FFF] hover:shadow-lg"
            type={'submit'}
          >
            Withdraw
          </button>
        </form>
      ) : (
        <></>
      )}
    </>
  );
};
