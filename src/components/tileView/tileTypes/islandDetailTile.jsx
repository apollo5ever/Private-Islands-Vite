import { Helpers, piAssetType } from '@/utils/helpers.js';
import treasureChest from '@/assets/icons/icon_locked-chest_tan.svg';
import flame from '@/assets/icons/icon_fire_orange.svg';
import unlitFlame from '/src/assets/icons/icon_fire_light.svg';
import bottle from '@/assets/icons/icon_bottle_blue.svg';
import { useTheme } from '@/components/hooks/useTheme.js';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TileContext } from '@/components/providers/TileContext.jsx';

export const IslandDetailTile = (props) => {
  const { tile, filteredIndex } = props;
  const { proseClass } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSelectedTile, setSelectedIndex } = useContext(TileContext);
  const [counts, setCounts] = useState({
    bounty: 0,
    subscription: 0,
    fundraiser: 0,
  });

  useEffect(() => {
    if (tile.SCID) {
      const { bountiesCount, tiersCount, fundraisersCount } =
        Helpers.getItemCounts(tile);
      setCounts({
        bounty: bountiesCount,
        subscription: tiersCount,
        fundraiser: fundraisersCount,
      });
    }
  }, [tile.SCID]);

  // TODO MTS - perhaps make into a hook if I want to use this elsewhere at some point

  /* Go to detail view for island or first element of given type for that island */
  const handleClick = (type) => {
    let params = { scid: tile.SCID, type: type };
    params.index = 0;
    console.log('CLICK', type, params);
    if (filteredIndex !== undefined) {
      setSelectedIndex(filteredIndex);
    }
    setSearchParams(params);
    const elementName = Helpers.getOnChainAssetName(type);
    if (
      (elementName in tile &&
        Array.isArray(tile[elementName]) &&
        tile[elementName].length > 0) ||
      type === piAssetType.ISLAND
    ) {
      const firstElement =
        type === piAssetType.ISLAND ? tile : tile[elementName][0];
      const item = { ...firstElement, type: type };
      setSelectedTile(item);
    }
  };

  return (
    <div className="main_card relative mx-auto flex w-full cursor-default rounded-lg bg-[#FBF8EC] px-4 pb-6 pt-4 shadow-xl ring-1 ring-gray-900/5 hover:bg-gray-100">
      <div className="mx-auto grid w-full flex-1 grid-cols-1 content-between">
        <div className="img_container relative w-full justify-center pt-[140px]">
          <div
            className="absolute -top-[55px] left-[50%] inline-block"
            style={{ transform: 'translate(-50%, 0%' }}
          >
            <div
              className="clip-deroHex main_card_img relative z-40 inline-block h-[158px] w-[150px] rounded-lg before:absolute before:-inset-1 before:block before:bg-[rgba(144,102,62,0.4)]"
              style={{
                clipPath:
                  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <img
                className="clip-deroHex h-[150px] w-full cursor-pointer"
                style={{
                  clipPath:
                    'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
                src={Helpers.getTileImage(tile)}
                onClick={() => handleClick(piAssetType.ISLAND)}
              />
            </div>
          </div>
        </div>

        {/*img_container*/}
        <div className="upper_content relative w-full space-y-3 text-center leading-6">
          <div className="title_content">
            <h2 className="font-fell text-4xl leading-10 text-[#607361]">
              {Helpers.getTileName(tile)}
            </h2>
          </div>

          {/*title_content*/}
          <div className="card_description">
            <p className="font-fell text-xl text-[#484541]">
              {Helpers.getTileTagline(tile)}
            </p>
            <p
              className={`${proseClass} line-clamp font-fell text-xl text-[#484541]`}
              dangerouslySetInnerHTML={{
                __html: Helpers.getTileDescription(tile),
              }}
            />
          </div>
          {/*card_description*/}
        </div>
        {/*upper_content*/}
        <div className="content_lower mt-7 text-center">
          <div className="funding_type grid grid-cols-3 content-center gap-2 text-center text-xl italic">
            <div
              className={`fire_icon ${
                counts.fundraiser === 0
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              } space-y-3 text-center`}
              onClick={() => handleClick(piAssetType.FUNDRAISER)}
            >
              <div className="font-black text-[#F89070]">
                {counts.fundraiser}
              </div>
              <div className="clear-both"></div>
              <div>
                <img
                  src={counts.fundraiser ? flame : unlitFlame}
                  className={`mx-auto w-[40px] ${
                    counts.fundraiser === 0
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  }`}
                />
              </div>
            </div>
            {/*fire_icon*/}
            <div
              className={`bottle_icon space-y-3 text-center ${
                counts.subscription === 0
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
              onClick={() => handleClick(piAssetType.SUBSCRIPTION)}
            >
              <div className="font-black text-[#46BDDC]">
                {counts.subscription}
              </div>
              <div className="clear-both"></div>
              <div>
                <img
                  src={bottle}
                  className={`mx-auto w-[40px] ${
                    counts.subscription === 0
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  }`}
                />
              </div>
            </div>
            {/*bottle_icon*/}
            <div
              className="tresure_icon space-y-3 text-center"
              onClick={() => handleClick(piAssetType.BOUNTY)}
            >
              <div
                className={`font-black text-[#90663E] ${
                  counts.bounty === 0 ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {counts.bounty}
              </div>
              <div className="clear-both"></div>
              <div>
                <img
                  src={treasureChest}
                  className={`mx-auto w-[40px] ${
                    counts.bounty === 0
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  }`}
                />
              </div>
            </div>
            {/*tresure_icon*/}
          </div>
          {/*funding_type*/}
        </div>
        {/*content_lower*/}
      </div>
    </div>
  );
};
