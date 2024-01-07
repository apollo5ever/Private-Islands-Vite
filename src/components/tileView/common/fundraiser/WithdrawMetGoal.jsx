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
          <button type={'submit'}>Withdraw</button>
        </form>
      ) : (
        ''
      )}
      {tile.Status === 0 &&
      tile.WithdrawlType === 'token' &&
      tile.Raised >= tile.Goal ? (
        <form onSubmit={handleOaoWithdraw}>
          <input type="number" placeholder="amount" id="amount" />
          <button type={'submit'}>Withdraw</button>
        </form>
      ) : (
        <></>
      )}
    </>
  );
};
