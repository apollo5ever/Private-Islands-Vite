export const WithdrawInfoBox = ({ tile }) => {
  return (
    <div className="fund_address mb-2 rounded-lg bg-zinc-100 px-4 py-4 text-accent shadow-lg ring-1 ring-accent">
      <h3 className="text-xl font-[800] text-accent sm:text-2xl">
        {tile.WithdrawlType === 'token' ? (
          <>Funds can only be accessed by burning withdrawl token:</>
        ) : (
          <>Funds can only be withdrawn by Dero address:</>
        )}
      </h3>
      <div className="clear-both h-1 w-full"></div>
      <p className="w-full break-words text-sm drop-shadow-lg sm:text-base">
        {tile.WithdrawlType === 'token' ? (
          <>{tile.WithdrawlToken}</>
        ) : (
          <>{tile.Address}</>
        )}
      </p>
    </div>
  );
};
