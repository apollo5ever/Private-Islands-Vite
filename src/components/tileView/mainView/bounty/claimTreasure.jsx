import { useBountyActions } from '@/components/hooks/useBountyActions.js';

export const ClaimTreasure = ({ tile }) => {
  const { handleClaimTreasure } = useBountyActions(tile);

  // TODO: form value not making it to sendTransaction function... need state mgmt??

  return (
    <form onSubmit={handleClaimTreasure} className="my-2 flex w-full">
      <div className="claim_form inline-block w-full rounded-lg bg-gradient-to-b from-[#FDFBEA] via-[#F0EBDD] to-[#E5D7B9] px-4 pb-6 pt-3 ring-1 ring-slate-300">
        <label
          for="proof"
          className="block text-sm font-medium leading-6 sm:text-base"
        >
          Enter the treasure proof of claim{' '}
          <button className="text-accent hover:underline dark:text-accent">
            (What's&nbsp;this?)
          </button>
        </label>
        <div className="clear-both h-3"></div>

        <input
          type="text"
          name="proof"
          id="proof"
          className="inline-block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-base leading-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#61C0A8]"
          placeholder="Proof of claim"
        />
        <div className="clear-both h-4"></div>
        <button
          type={'submit'}
          className="btn w-full rounded-bl-[25px] rounded-tr-[25px] bg-gradient-to-b from-[#61C0A8] to-[#6CCAB1] py-1 text-center font-fell text-3xl normal-case leading-tight text-[#FFF] hover:shadow-lg sm:rounded-bl-[35px] sm:rounded-tr-[35px]"
        >
          Claim Treasure
        </button>
      </div>
    </form>
  );
};
