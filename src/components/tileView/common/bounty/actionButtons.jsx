import { useState } from 'react';
import { useBountyActions } from '@/components/hooks/useBountyActions.js';
import { ClaimTreasureModal } from '@/components/tileView/common/bounty/ClaimTreasureModal.jsx';

export const ActionButtons = ({ tile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleClaimTreasure } = useBountyActions(tile);

  return (
    <>
      {tile.Status === 0 && (
        <>
          {/*TODO Got rid of 'grid' until we add back other button so remainig will go full width*/}
          <div className="buttons justify-items-center gap-5 pb-2 pt-4 sm:grid-cols-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn w-full rounded-bl-[35px] rounded-tr-[35px] bg-gradient-to-b from-[#61C0A8] to-[#6CCAB1] py-1 text-center text-3xl normal-case leading-tight text-[#FFF] hover:shadow-lg"
            >
              Claim Treasure
            </button>
            {/*TODO Hiding this for now as we have not share functionality yet*/}
            {/*<button className="btn w-full cursor-pointer rounded-bl-[35px] rounded-tr-[35px] bg-gradient-to-b from-[#61C0A8] to-[#6CCAB1] py-1 text-center text-3xl leading-tight text-[#FFF] hover:shadow-lg">*/}
            {/*  Share*/}
            {/*</button>*/}
          </div>
        </>
      )}
      <ClaimTreasureModal
        tile={tile}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
