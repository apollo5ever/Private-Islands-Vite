import { piAssetType } from '@/utils/helpers.js';
import { IslandDetailTile } from '@/components/tileView/tileTypes/islandDetailTile.jsx';
import { BountyDetailTile } from '@/components/tileView/tileTypes/bountyDetailTile.jsx';
import { SubscriptionDetailTile } from '@/components/tileView/tileTypes/subscriptionDetailTile.jsx';
import { FundraiserDetailTile } from '@/components/tileView/tileTypes/fundraiserDetailTile.jsx';

export const TileDetail = (props) => {
  const { tileClass, tileSize, tile } = props;

  return (
    <div className={`${tileClass}`}>
      {/*<div className={`${tileClass} ${tileSize}`}>*/}
      {tile.type === piAssetType.ISLAND && <IslandDetailTile tile={tile} />}
      {tile.type === piAssetType.BOUNTY && <BountyDetailTile tile={tile} />}
      {tile.type === piAssetType.SUBSCRIPTION && (
        <SubscriptionDetailTile tile={tile} />
      )}
      {tile.type === piAssetType.FUNDRAISER && (
        <FundraiserDetailTile tile={tile} />
      )}
    </div>
  );
};
