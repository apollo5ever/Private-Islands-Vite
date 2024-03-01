import { Helpers, piAssetType } from '@/utils/helpers.js';
import { Button } from '@/components/common/Button.jsx';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import { TileContext } from '@/components/providers/TileContext.jsx';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

// TODO MTS - Might be ready to delete this
export const HeaderButtons = ({ tile }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { iconColor, iconTextColorClass } = Helpers.getIconColor(tile.type);
  const { selectedTile, setSelectedTile, initiatorTile, myIslands, isMyTile } =
    useContext(TileContext);
  const [counts, setCounts] = useState({
    bounty: 0,
    subscription: 0,
    fundraiser: 0,
    island: 0,
  });

  useEffect(() => {
    if (initiatorTile) {
      const { bountiesCount, tiersCount, fundraisersCount } =
        Helpers.getItemCounts(initiatorTile);
      setCounts({
        bounty: bountiesCount,
        subscription: tiersCount,
        fundraiser: fundraisersCount,
        island: myIslands?.length ?? 1,
      });
    }
  }, [initiatorTile]);

  const gotoTile = (type) => {
    const islandTile = Helpers.getTileFromIsland(initiatorTile, type);
    if (islandTile) {
      let params = { scid: islandTile.SCID, type: islandTile.type };
      if (islandTile.Index !== undefined) {
        params.index = islandTile.Index;
      }
      setSearchParams(params);
      setSelectedTile(islandTile);
    }
  };

  const handleNew = (type) => {
    console.log('HANDLE NEW FOR ', type);
    switch (type) {
      case piAssetType.BOUNTY:
        navigate(
          `/pi/burytreasure/${selectedTile.SCID}/${
            (selectedTile.Bounties && selectedTile.Bounties.length) || 0
          }`
        );
        break;
      case piAssetType.FUNDRAISER:
        navigate(
          `/pi/newsignal/${selectedTile.SCID}/${
            (selectedTile.Fundraisers && selectedTile.Fundraisers.length) || 0
          }`
        );
        break;

      case piAssetType.SUBSCRIPTION:
        navigate(
          `/pi/island/${selectedTile.SCID}/modifyTier/${
            (selectedTile.Tiers && selectedTile.Tiers.length) || 0
          }`
        );
        break;
    }
  };

  return (
    <>
      <div className="lower_content w-full space-y-6 px-2">
        <div className="funding_type grid grid-cols-3 content-center gap-4 text-center text-lg italic leading-6 sm:text-xl">
          {Object.values(piAssetType)
            .filter((value) => value !== piAssetType.ALL && value !== tile.type)
            .map((value, index) => {
              const { iconTextColorClass } = Helpers.getIconColor(value);
              const assetColor = `text-xl font-black ${iconTextColorClass}`;
              return (
                <>
                  <div
                    className={`space-y-3 text-center ${
                      counts[value] === 0
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    }`}
                    key={index}
                    onClick={() => gotoTile(value)}
                    disabled={counts[value] === 0}
                  >
                    <div className={assetColor}>{counts[value]}</div>
                    <div className="clear-both"></div>
                    <div>
                      <img
                        src={Helpers.getIcon(value)}
                        className={'mx-auto w-full max-w-fit'}
                      />
                    </div>
                    <div className="clear-both"></div>
                    <h4 className={assetColor}>
                      {Helpers.getIconDescription(value)}
                    </h4>
                  </div>
                </>
              );
            })}
        </div>
      </div>

      {/*TODO MTS -- Need to style this!!!*/}
      {isMyTile && (
        <FlexBoxRow justify="even" className="mb-3">
          {Object.values(piAssetType)
            .filter((value) => value !== piAssetType.ALL && value !== tile.type)
            .map((value, index) => (
              <div className="z-10 flex-1" key={index}>
                <Button
                  className="w-11/12 px-1 text-center"
                  variant="outline"
                  btnColor="themeNeutral"
                  size="xs"
                  handleClick={() => handleNew(value)}
                >
                  New
                  <br />
                  {Helpers.ucfirst(value)}
                </Button>
              </div>
            ))}
        </FlexBoxRow>
      )}
    </>
  );
};
