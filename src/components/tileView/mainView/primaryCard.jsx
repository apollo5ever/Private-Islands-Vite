import { LeftChevron } from '@/components/common/LeftChevron.jsx';
import { RightChevron } from '@/components/common/RightChevron.jsx';
import { Island } from '@/components/tileView/mainView/island.jsx';
import { piAssetType, Helpers } from '@/utils/helpers.js';
import { Button } from '@/components/common/Button.jsx';
import { useContext } from 'react';
import { Bounty } from '@/components/tileView/mainView/bounty.jsx';
import { TileContext } from '@/components/providers/TileContext.jsx';
import { Subscription } from '@/components/tileView/mainView/subscription.jsx';
import { Fundraiser } from '@/components/tileView/mainView/fundraiser.jsx';

export const PrimaryCard = ({ data, tiles }) => {
  const { setSelectedTile, selectedIndex, setSelectedIndex } =
    useContext(TileContext);

  return (
    <div className="relative flex w-full justify-between">
      <Button
        className="absolute right-5 top-5 z-10"
        variant="circle"
        btnColor="black"
        size="xs"
        handleClick={() => setSelectedTile(null)}
      >
        X
      </Button>
      {/* Left chevron */}
      {selectedIndex > 0 && (
        <button
          className="z-10 ml-2 cursor-pointer"
          onClick={() => {
            setSelectedTile(tiles[selectedIndex - 1]);
            setSelectedIndex(selectedIndex - 1);
          }}
        >
          <LeftChevron />
        </button>
      )}
      {data?.type === piAssetType.BOUNTY && <Bounty bountyData={data} />}
      {data?.type === piAssetType.ISLAND && <Island island={data} />}
      {data?.type === piAssetType.FUNDRAISER && <Fundraiser fundData={data} />}
      {data?.type === piAssetType.SUBSCRIPTION && (
        <Subscription subData={data} />
      )}
      {/* Right chevron */}
      {selectedIndex < tiles.length - 1 && (
        <button
          className="z-10 ml-2 cursor-pointer"
          onClick={() => {
            setSelectedTile(tiles[selectedIndex + 1]);
            setSelectedIndex(selectedIndex + 1);
          }}
        >
          <RightChevron />
        </button>
      )}
    </div>
  );
};
