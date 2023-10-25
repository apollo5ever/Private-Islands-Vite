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
import { useSearchParams } from 'react-router-dom';

export const PrimaryCard = ({ data, tiles }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSelectedTile, selectedIndex, setSelectedIndex } =
    useContext(TileContext);

  return (
    <div className="relative flex w-full justify-between">
      <Button
        className="absolute right-5 top-5 z-10"
        variant="circle"
        btnColor="black"
        size="xs"
        handleClick={() => {
          setSelectedTile(null);
          setSearchParams({});
        }}
      >
        X
      </Button>
      {/* Left chevron */}
      {selectedIndex > 0 && (
        <button
          className="z-10 ml-2 cursor-pointer"
          onClick={() => {
            setSelectedTile(tiles[selectedIndex - 1]);
            let params = {
              scid: tiles[selectedIndex - 1].SCID,
              type: tiles[selectedIndex - 1].type,
            };
            if (tiles[selectedIndex - 1].Index !== undefined) {
              params.index = tiles[selectedIndex - 1].Index;
            }
            console.log('tiles', tiles);
            setSearchParams(params);
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
            let params = {
              scid: tiles[selectedIndex + 1].SCID,
              type: tiles[selectedIndex + 1].type,
            };
            if (tiles[selectedIndex + 1].Index !== undefined) {
              params.index = tiles[selectedIndex + 1].Index;
            }
            setSearchParams(params);
            setSelectedIndex(selectedIndex + 1);
          }}
        >
          <RightChevron />
        </button>
      )}
    </div>
  );
};
