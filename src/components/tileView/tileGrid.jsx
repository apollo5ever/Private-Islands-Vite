import { useContext, useEffect, useState } from 'react';
import LoggerContext, { LOG } from '@/components/providers/LoggerContext.jsx';
import { Tile } from '@/components/tileView/tile.jsx';
import { TileDetail } from '@/components/tileView/tileDetail.jsx';
import { PrimaryCard } from '@/components/tileView/mainView/primaryCard.jsx';
import { SidebarCard } from '@/components/tileView/sidebarView/sidebarCard.jsx';
import { piAssetType, Helpers, statusFilter } from '/src/utils/helpers';
import { TypeFilterBar } from '@/components/tileView/typeFilterBar.jsx';
import { GridToggleIcon } from '@/components/tileView/gridToggleIcon.jsx';
import { TileContext } from '@/components/providers/TileContext.jsx';
import { useSearchParams } from 'react-router-dom';

// TODO - figure out how to poll status of dero txn to know when its complete (for claim island process)
// TODO - Now that state removed as dependency from getIslands - when new island added, need a way to trigger re-render so getAllElements will update

/*
  TODO Notes for myself as I transition to new styling
   - Had to get rid of dynamic sizign based on tiles per row & fixed tiles per row to 4 for now
   - commented out icon that would toggle sizes
   - PrimaryTileNav - buttons don't display/drop text --  (responsive design issue)

 */

export const TileGrid = () => {
  const logger = useContext(LoggerContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    selectedTile,
    setSelectedTile,
    selectedIndex,
    setSelectedIndex,
    isMobile,
    allElements,
  } = useContext(TileContext);
  const [tilesPerRow, setTilesPerRow] = useState(4);
  const [selectedFilter, setSelectedFilter] = useState(piAssetType.ALL);
  const [selectedStatus, setSelectedStatus] = useState(statusFilter.ALL);
  const [filteredElements, setFilteredElements] = useState([]);
  const COMPNAME = 'tileGrid.jsx';

  // const tileSize =
  //   tilesPerRow === 8
  //     ? 'h-[calc(100vw/8)] w-[calc(100vw/8)]'
  //     : 'h-[calc(100vw/6)] w-[calc(100vw/6)]';

  const tileSize =
    tilesPerRow === 8
      ? 'h-[calc((100vw/8)*7/3)] w-[calc(100vw/8)]' // 4:3 aspect ratio for 8 tiles per row
      : 'h-[calc((100vw/6)*7/3)] w-[calc(100vw/6)]'; // 4:3 aspect ratio for 6 tiles per row

  useEffect(() => {
    const scid = searchParams.get('scid');
    const type = searchParams.get('type');
    const index = searchParams.get('index');
    if (scid && type && index) {
      const foundElement = allElements.find((x) => x.SCID === scid);
      // Ensure foundElement exists and has the necessary properties based on type
      if (
        foundElement &&
        ((type === piAssetType.FUNDRAISER && 'Fundraisers' in foundElement) ||
          (type === piAssetType.BOUNTY && 'Bounties' in foundElement) ||
          (type === piAssetType.SUBSCRIPTION && 'Tiers' in foundElement) ||
          type === piAssetType.ISLAND)
      ) {
        const foundTile = Helpers.getTileFromIsland(foundElement, type, index);
        if (foundTile) {
          setSelectedTile(foundTile);
        }
      } else {
        console.log(
          `No element found with SCID: ${scid} or missing expected property for type: ${type}`
        );
        // TODO reset selectedTile here if needed
      }
    }
  }, [allElements, searchParams, setSelectedTile]);

  useEffect(() => {
    const filtered = allElements.filter((element) => {
      let typeCondition =
        selectedFilter === piAssetType.ALL ||
        element.type === selectedFilter ||
        selectedFilter.includes(element.SCID);

      let statusCondition = true;

      if ([piAssetType.BOUNTY, piAssetType.FUNDRAISER].includes(element.type)) {
        statusCondition =
          selectedStatus === statusFilter.ALL || selectedStatus === undefined
            ? true
            : element.Status === selectedStatus;
      }

      return typeCondition && statusCondition;
    });

    logger(LOG.DEBUG, COMPNAME, 'Filtered Elements', filtered);
    setFilteredElements(filtered);
  }, [allElements, selectedFilter, selectedStatus]);

  if (selectedTile) {
    logger(LOG.DEBUG, COMPNAME, 'SELECTED TILE', selectedTile);

    return (
      <div className="main_container relative mx-5 mb-12 mt-0 grid h-full grid-cols-1 items-start gap-x-5 gap-y-2 lg:grid-cols-3">
        <PrimaryCard
          data={selectedTile}
          selectedIndex={selectedIndex}
          setSelectedTile={setSelectedTile}
          setSelectedIndex={setSelectedIndex}
          tiles={allElements}
        />
        <SidebarCard data={selectedTile} />
      </div>
    );
  }

  logger(LOG.API, COMPNAME, 'TILE GRID', allElements);

  return (
    <div className="relative flex min-h-screen flex-col justify-start overflow-hidden">
      {/*TODO add gradient once we have colors refined*/}
      {/*<div className="relative flex min-h-screen flex-col justify-start overflow-hidden bg-gradient-to-b from-[#FDFBEA] via-[#F0EBDD] to-[#E5D7B9]">*/}
      {!isMobile && (
        <TypeFilterBar
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      )}
      {/*// TODO - hiding this as per note below, I've fixed to 4 cols per row and no dynamic tileSize for now*/}
      {/*{!isMobile && (*/}
      {/*  <GridToggleIcon*/}
      {/*    toggleTiles={() => setTilesPerRow((prev) => (prev === 4 ? 4 : 4))}*/}
      {/*  />*/}
      {/*)}*/}
      {/*// TODO - Got rid of the Tiles Per Row & Dynamic Sizing, i.e. tileSize,for now & perhaps permanently*/}
      {/* Force tailwind to recognize these classes for tree shaking */}
      {/*<div className="hidden grid-cols-6 grid-cols-8"></div>*/}
      {/*<div className={`grid gap-2 grid-cols-${tilesPerRow}`}>*/}
      <div className="main_container relative mx-5 mb-20 mt-20 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredElements &&
          filteredElements.map((tile, index) => (
            <div
              key={tile.Name}
              className={`tile-wrapper m-0 cursor-pointer p-0 transition-all duration-300`}
            >
              <TileDetail
                tileClass="tile-detail"
                tileSize={tileSize}
                key={tile.SCID + '_detail_' + index}
                tile={tile}
                filteredIndex={filteredElements.indexOf(tile)}
              />
              <Tile
                tileClass="tile"
                key={tile.SCID + '_' + index}
                tile={tile}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
