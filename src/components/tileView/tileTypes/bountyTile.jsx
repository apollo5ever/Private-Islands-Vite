import { Helpers } from '@/utils/helpers.js';
import { useInitiatorImage } from '@/components/hooks/useGetInitiatorImage.js';
import chest from '@/assets/icons/icon_locked-chest_tan.svg';

export const BountyTile = (props) => {
  const { tile } = props;
  const initiatorImage = useInitiatorImage(tile);
  const bountyAmount = tile.Amount / 100000;

  return (
    <div className="mx-auto grid w-full flex-1 grid-cols-1 content-between">
      <div className="img_container relative">
        <div
          className="bounty_img relative inline-block h-96 w-full rounded-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${Helpers.getTileImage(tile)})` }}
        />
        <div
          className="absolute bottom-[-25px] left-0 inline-block h-[100px] w-[100px] overflow-hidden bg-[#FBF8EC] p-[5px]"
          style={{
            clipPath:
              'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
          }}
        >
          <img
            className="w-full overflow-hidden"
            src={initiatorImage}
            alt="Dero Private Island Bounty"
            style={{
              clipPath:
                'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
            }}
          />
        </div>
      </div>
      <div className="relative flex min-w-full flex-row-reverse pt-10">
        <div className="w-3/4 items-end space-y-3 leading-6">
          <div className="text-right font-fell text-3xl leading-6 text-[#484541]">
            Treasure Chest
          </div>
          <p className="font-['Average Sans'] text-right text-4xl text-[#FFA450]">
            {bountyAmount} DERO
          </p>
          <div className="bg-conver absolute bottom-0 left-0 inline-block max-h-[90px] min-h-[70px] w-1/4 bg-center bg-no-repeat">
            <img src={chest} alt="Dero Private Island Bounty" />
          </div>
        </div>
      </div>
    </div>
  );
};
