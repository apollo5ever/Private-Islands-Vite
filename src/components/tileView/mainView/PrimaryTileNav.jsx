import { useContext } from 'react';
import { TileContext } from '@/components/providers/TileContext.jsx';
import { ExitTileButton } from '@/components/tileView/mainView/ExitTileButton.jsx';
import { useSearchParams } from 'react-router-dom';
import { PreviousTileButton } from '@/components/tileView/mainView/PreviousTileButton.jsx';
import { NextTileButton } from '@/components/tileView/mainView/NextTileButton.jsx';

export const PrimaryTileNav = ({ tiles }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSelectedTile, selectedIndex, setSelectedIndex, isMobile } =
    useContext(TileContext);

  const handleExitClick = () => {
    setSelectedTile(null);
    setSearchParams({});
  };

  const handlePreviousClick = () => {
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
  };

  const handleNextClick = () => {
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
  };

  return (
    <div className="fund_nav_btns sticky inset-y-0 left-0 z-50 grid grid-cols-4 content-center rounded-b-lg bg-[#FDFBEA] px-2 pb-1 pt-2 shadow-xl lg:col-span-2">
      <div className="prev_next_btns flex justify-start gap-3">
        <PreviousTileButton
          onClick={handlePreviousClick}
          disabled={selectedIndex === 0}
        />
        <NextTileButton
          onClick={handleNextClick}
          disabled={selectedIndex === tiles.length - 1}
        />
      </div>
      <div className="close_btn col-span-3 justify-self-end">
        <ExitTileButton onClick={handleExitClick} />
      </div>
    </div>
  );
};
