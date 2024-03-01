export const RewardInfoBox = ({ tile }) => {
  return (
    <>
      {tile.Status === 0 && tile.IcoAmount > 0 ? (
        <div className="reward_container sticky bottom-0 left-0 right-0 z-40 mx-4 rounded-lg bg-emerald-50 px-6 py-4 shadow-lg ring-1 ring-accent">
          <h3 className="text-xl font-[800] sm:text-2xl">REWARD!</h3>
          <div className="clear-both h-1 w-full"></div>
          <p className="mb-0 w-full text-sm leading-6 drop-shadow-lg sm:text-base">
            Supporters of this fundraiser split a reward of{' '}
            {tile.IcoAmount.toLocaleString()} tokens.
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
