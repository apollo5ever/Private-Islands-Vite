import { PrimaryTileNav } from '@/components/tileView/mainView/PrimaryTileNav.jsx';
import { Island } from '@/components/tileView/mainView/island.jsx';
import { piAssetType, Helpers } from '@/utils/helpers.js';
import { Bounty } from '@/components/tileView/mainView/bounty.jsx';
import { Subscription } from '@/components/tileView/mainView/subscription.jsx';
import { Fundraiser } from '@/components/tileView/mainView/fundraiser/fundraiser.jsx';

export const PrimaryCard = ({ data, tiles }) => {
  return (
    <>
      <PrimaryTileNav tiles={tiles} />
      <div className="main_info relative mx-auto mb-8 w-full rounded-lg bg-[white] pb-6 shadow-xl ring-1 ring-gray-900/5 lg:col-span-2 lg:mb-0">
        {data?.type === piAssetType.BOUNTY && <Bounty bountyData={data} />}
        {data?.type === piAssetType.ISLAND && <Island island={data} />}
        {data?.type === piAssetType.FUNDRAISER && (
          <Fundraiser fundData={data} />
        )}
        {data?.type === piAssetType.SUBSCRIPTION && (
          <Subscription subData={data} />
        )}
      </div>
    </>
  );
};
