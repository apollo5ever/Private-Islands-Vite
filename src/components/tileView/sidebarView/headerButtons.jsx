import { Helpers, piAssetType } from '@/utils/helpers.js';
import { Button } from '@/components/common/Button.jsx';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import { TileContext } from '@/components/providers/TileContext.jsx';
import React, { useContext, useEffect, useState } from 'react';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { useNavigate } from 'react-router-dom';

export const HeaderButtons = ({ type }) => {
  const navigate = useNavigate();
  const { selectedTile, setSelectedTile, initiatorTile, myIslands, isMyTile } =
    useContext(TileContext);
  const [counts, setCounts] = useState({
    bounty: 0,
    subscription: 0,
    fundraiser: 0,
    island: 1,
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
    const tile = Helpers.getTileFromIsland(initiatorTile, type);
    if (tile) {
      setSelectedTile(tile);
    }
  };

  const handleNew = (type) => {
    console.log('HANDLE NEW FOR ', type);
    switch (type) {
      case piAssetType.BOUNTY:
        navigate(
          `/burytreasure/${selectedTile.SCID}/${
            selectedTile.Bounties && selectedTile.Bounties.length
          }`
        );
      case piAssetType.FUNDRAISER:
        navigate(
          `/newsignal/${selectedTile.SCID}/${
            selectedTile.Fundraisers && selectedTile.Fundraisers.length
          }`
        );
    }
  };

  return (
    <FlexBoxColumn>
      <FlexBoxRow gap="2 mb-3 z-4">
        {Object.values(piAssetType)
          .filter((value) => value !== piAssetType.ALL && value !== type)
          .map((value, index) => (
            <button
              className={`hexagon bg-accent text-black ${
                counts[value] === 0 ? 'cursor-not-allowed opacity-50' : ''
              }`}
              key={index}
              onClick={() => gotoTile(value)}
              disabled={counts[value] === 0}
            >
              <span className="hex-content text-md">
                {Helpers.ucfirst(value)}
                <br />
                {counts[value]}
              </span>
            </button>
          ))}
      </FlexBoxRow>
      {isMyTile && (
        <FlexBoxRow justify="even" className="mb-3">
          {Object.values(piAssetType)
            .filter((value) => value !== piAssetType.ALL && value !== type)
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
    </FlexBoxColumn>
  );
};
