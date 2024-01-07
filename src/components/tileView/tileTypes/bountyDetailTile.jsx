import { Helpers } from '@/utils/helpers.js';
import { useInitiatorImage } from '@/components/hooks/useGetInitiatorImage.js';
import chest from '@/assets/icons/icon_locked-chest_tan.svg';
import { useTheme } from '@/components/hooks/useTheme.js';
import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { TileContext } from '@/components/providers/TileContext.jsx';

export const BountyDetailTile = (props) => {
  const { tile } = props;
  const initiatorImage = useInitiatorImage(tile);
  const { proseClass } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSelectedTile } = useContext(TileContext);
  const bountyAmount = tile.Amount / 100000;

  const handleClick = () => {
    let params = { scid: tile.SCID, type: tile.type };
    if (tile.Index !== undefined) {
      params.index = tile.Index;
    }
    setSearchParams(params);
    setSelectedTile(tile);
  };

  return (
    <div
      className="mx-auto grid h-full w-full flex-1 grid-cols-1 content-between rounded-lg bg-[#FBF8EC]"
      onClick={handleClick}
    >
      <div className="img_container relative">
        <div
          className="bounty_img relative inline-block h-36 w-full rounded-lg bg-cover bg-center bg-no-repeat"
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
            alt="Dero Bounty Private Islands"
            style={{
              clipPath:
                'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
            }}
          />
        </div>
      </div>
      <div className="card_content relative items-end">
        <div className="upper_content flex w-full space-y-6">
          <div className="w-1/4 space-y-10 pt-8 text-center">
            <img
              src={chest}
              className="mx-auto ml-2 w-full max-w-[70px]"
              alt="Dero Private Islands Bounty"
            />
            {/*TODO Update this content - For now leaving as a space as I'm not sure what this is*/}
            <div className="text-center">
              <h4 className="font-['Average Sans'] text-5xl text-[#444444]"></h4>
            </div>
          </div>
          <div className="w-3/4 flex-1 space-y-6 pl-7 leading-6">
            <div className="title_content space-y-3">
              <div className="font-fell text-4xl leading-10 text-[#484541]">
                Treasure Chest
              </div>
              <div className="font-fell text-3xl leading-6 text-[#B1AF94]">
                {Helpers.getTileName(tile)}
              </div>
              <div className="font-fell text-3xl leading-6 text-[#B1AF94]">
                {Helpers.getTileTagline(tile)}
              </div>
            </div>
            <div>
              <p
                className={`${proseClass} line-clamp-5 text-lg text-[#484541]`}
                dangerouslySetInnerHTML={{
                  __html: Helpers.getTileDescription(tile),
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bounty_amount mt-7 w-full flex-1 place-items-end">
        <p className="font-['Average Sans'] text-right text-4xl text-[#FFA450]">
          {bountyAmount} DERO
        </p>
      </div>
    </div>
  );
};
