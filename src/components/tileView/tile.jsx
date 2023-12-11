import { piAssetType } from '@/utils/helpers.js';
import { IslandTile } from '@/components/tileView/tileTypes/islandTile.jsx';
import { BountyTile } from '@/components/tileView/tileTypes/bountyTile.jsx';
import { SubscriptionTile } from '@/components/tileView/tileTypes/subscriptionTile.jsx';
import { FundraiserTile } from '@/components/tileView/tileTypes/fundraiserTile.jsx';

export const Tile = (props) => {
  const { tileClass, tile } = props;

  return (
    <div
      className={`relative mx-auto flex w-full rounded-lg bg-[#FBF8EC] px-4 pb-6 pt-4 shadow-xl ring-1 ring-gray-900/5 hover:bg-gray-100 ${tileClass}`}
    >
      {tile.type === piAssetType.ISLAND && <IslandTile tile={tile} />}
      {tile.type === piAssetType.BOUNTY && <BountyTile tile={tile} />}
      {tile.type === piAssetType.SUBSCRIPTION && (
        <SubscriptionTile tile={tile} />
      )}
      {tile.type === piAssetType.FUNDRAISER && <FundraiserTile tile={tile} />}
    </div>
  );
};
