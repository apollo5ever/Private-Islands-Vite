import { Helpers, piAssetType } from '@/utils/helpers.js';
import { Button } from '@/components/common/Button.jsx';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import { TileContext } from '@/components/providers/TileContext.jsx';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../../LoginContext';

export const HeaderButtons = ({ type }) => {
  const [state, setState] = useContext(LoginContext);
  const { selectedTile, setSelectedTile, initiatorTile } =
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
        island: state.myIslands?.length,
      });
    }
  }, [initiatorTile]);

  const gotoTile = (type) => {
    const tile = Helpers.getTileFromIsland(initiatorTile, type);
    if (tile) {
      setSelectedTile(tile);
    }
  };

  return (
    <FlexBoxRow gap="2 mb-3">
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
          // <Button
          //   variant="outline"
          //   btnColor="themeNeutral"
          //   size="xs"
          //   key={index}
          //   handleClick={() => gotoTile(value)}
          // >
          //   {Helpers.ucfirst(value)}
          //   <br />
          //   {counts[value]}
          // </Button>
        ))}
    </FlexBoxRow>
  );
};
