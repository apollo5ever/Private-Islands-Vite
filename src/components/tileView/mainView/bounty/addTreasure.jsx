export const AddTreasure = () => {
  return (
    <form onSubmit={AddTreasure} className="my-2 flex w-1/2">
      <div className="flex-grow px-2">
        <input
          id="amount"
          type="text"
          placeholder="Amount (Dero)"
          className="input-bordered input w-full max-w-xs"
        />
      </div>
      <div className="p-2">
        <button type={'submit'}>Add Treasure</button>
      </div>
    </form>
  );

  // return <>PLACEHODER for ADD TREASURE</>;
};
