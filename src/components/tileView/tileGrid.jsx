import { useContext, useEffect, useState } from 'react';
import LoggerContext, { LOG } from '@/components/providers/LoggerContext.jsx';
import { Tile } from '@/components/tileView/tile.jsx';
import { PrimaryCard } from '@/components/tileView/mainView/primaryCard.jsx';
import { SidebarCard } from '@/components/tileView/sidebarView/sidebarCard.jsx';
import { piAssetType, Helpers, statusFilter } from '/src/utils/helpers';
import { TypeFilterBar } from '@/components/tileView/typeFilterBar.jsx';
import { GridToggleIcon } from '@/components/tileView/gridToggleIcon.jsx';
import { TileContext } from '@/components/providers/TileContext.jsx';

// TODO - DONE -- Get status search feature working on button filter
// TODO - DONE -- Get the fundraiser & subscription primary cards set up
// TODO - figure out side bar for all elements
// TODO - For bounties (and others) in the sidebar, when more than 1, show a summary of others in the sidebar
//         & if they click to see that one, set it as selectedTile so it will show in main window
// TODO - Fix wallet styling to hide stuff until clicked for adding wallets
// TODO - add other menu options in header and get rid of explore the islands drop down
// TODO - convert styling for old styled stuff reachable from other menu options
// TODO - have the Shuffle only happen when tiles page loads first time

export const TileGrid = () => {
  const logger = useContext(LoggerContext);
  const {
    selectedTile,
    setSelectedTile,
    selectedIndex,
    setSelectedIndex,
    allElements,
  } = useContext(TileContext);
  const [tilesPerRow, setTilesPerRow] = useState(8);
  const [selectedFilter, setSelectedFilter] = useState(piAssetType.ALL);
  const [selectedStatus, setSelectedStatus] = useState(statusFilter.ALL);
  const [filteredElements, setFilteredElements] = useState([]);
  const COMPNAME = 'tileGrid.jsx';

  const tileSize =
    tilesPerRow === 8
      ? 'h-[calc(100vw/8)] w-[calc(100vw/8)]'
      : 'h-[calc(100vw/6)] w-[calc(100vw/6)]';

  useEffect(() => {
    const filtered = allElements.filter((element) => {
      let typeCondition =
        selectedFilter === piAssetType.ALL || element.type === selectedFilter;

      let statusCondition = true;

      if ([piAssetType.BOUNTY, piAssetType.FUNDRAISER].includes(element.type)) {
        statusCondition =
          selectedStatus === statusFilter.ALL || selectedStatus === undefined
            ? true
            : element.Status === selectedStatus;
      }

      return typeCondition && statusCondition;
    });

    setFilteredElements(filtered);
  }, [allElements, selectedFilter, selectedStatus]);

  if (selectedTile) {
    logger(LOG.DEBUG, COMPNAME, 'SELECTED TILE', selectedTile);

    return (
      <div className="flex h-screen w-full">
        <div className="h-full w-3/4 overflow-x-hidden">
          <PrimaryCard
            data={selectedTile}
            selectedIndex={selectedIndex}
            setSelectedTile={setSelectedTile}
            setSelectedIndex={setSelectedIndex}
            tiles={allElements}
          />
        </div>
        <div className="h-full w-1/4 overflow-auto">
          <SidebarCard data={selectedTile} />
        </div>
      </div>
    );
  }

  logger(LOG.API, COMPNAME, 'TILE GRID', allElements);

  return (
    <div className="relative">
      <TypeFilterBar
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      <GridToggleIcon
        toggleTiles={() => setTilesPerRow((prev) => (prev === 8 ? 6 : 8))}
      />

      {/* Force tailwind to recognize these classes for tree shaking */}
      <div className="hidden grid-cols-6 grid-cols-8"></div>

      <div className={`grid gap-2 grid-cols-${tilesPerRow}`}>
        {filteredElements &&
          filteredElements.map((tile, index) => (
            <div
              key={tile.id}
              onClick={() => {
                setSelectedTile(tile);
                setSelectedIndex(filteredElements.indexOf(tile));
              }}
              className={`group relative m-0 ${tileSize} cursor-pointer overflow-hidden rounded-md p-0 transition-all duration-300 hover:bg-black hover:bg-opacity-40`}
            >
              {/* Title on hover */}
              <h2 className="absolute inset-x-2 top-2 z-10 rounded-md bg-black bg-opacity-50 p-1 text-center text-lg font-medium text-white opacity-0 group-hover:opacity-100">
                {tile.type === 'island'
                  ? tile.Name
                  : tile.Names[tile.Names.length - 1]}
              </h2>

              {/* Buttons on hover */}
              <div className="absolute bottom-0 right-0 z-10 space-x-2 p-2 opacity-0 group-hover:opacity-100">
                <button className="rounded bg-blue-500 px-2 py-1 text-white">
                  Button1
                </button>
                <button className="rounded bg-red-500 px-2 py-1 text-white">
                  Button2
                </button>
              </div>

              <Tile
                key={tile.SCID + '_' + index}
                name={Helpers.getTileName(tile)}
                tagline={Helpers.getTileTagline(tile)}
                image={Helpers.getTileImage(tile)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
