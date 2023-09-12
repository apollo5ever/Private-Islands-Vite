import { Helpers, piAssetType } from '@/utils/helpers.js';
import { Button } from '@/components/common/Button.jsx';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import { TileContext } from '@/components/providers/TileContext.jsx';
import { useContext, useEffect, useState } from 'react';

export const HeaderButtons = ({ type }) => {
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
        island: 1,
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
    <FlexBoxRow gap="2">
      {Object.values(piAssetType)
        .filter((value) => value !== piAssetType.ALL && value !== type)
        .map((value, index) => (
          <Button
            variant="outline"
            btnColor="themeNeutral"
            size="xs"
            key={index}
            handleClick={() => gotoTile(value)}
          >
            {Helpers.ucfirst(value)}
            <br />
            {counts[value]}
          </Button>
        ))}
    </FlexBoxRow>
  );
};
