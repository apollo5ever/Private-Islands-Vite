import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import { useGetAllElements } from '@/components/hooks/useGetAllElements.js';
import { Helpers, piAssetType } from '@/utils/helpers.js';

export const TileContext = createContext();

export const TileProvider = ({ children }) => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [initiatorTile, setInitiatorTile] = useState();
  const [isMyTile, setIsMyTile] = useState(false);
  const { allElements, getIslands, myIslands } = useGetAllElements();

  useEffect(() => {
    getIslands();
  }, [getIslands]);

  useEffect(() => {
    if (!selectedTile) return;
    const foundTile = allElements.find(
      (item) =>
        item?.SCID === Helpers.getInitiatorScid(selectedTile) &&
        item.type === piAssetType.ISLAND
    );

    console.log('FOUND TILE', foundTile, myIslands);
    if (foundTile) {
      setInitiatorTile(foundTile);
      const isTileMine = myIslands?.some(
        (island) => island.SCID === foundTile.SCID
      );
      console.log('IS TIME MINE? ', isTileMine);
      setIsMyTile(!!isTileMine);
    } else {
      setIsMyTile(false);
    }
  }, [allElements, selectedTile, myIslands]);

  const gotoIslandTile = useCallback(
    (scid) => {
      const island = allElements.find(
        (item) => item?.SCID === scid && item.type === piAssetType.ISLAND
      );
      if (island) {
        setSelectedTile(island);
      }
    },
    [allElements, setSelectedTile]
  );

  return (
    <TileContext.Provider
      value={{
        selectedTile,
        setSelectedTile,
        selectedIndex,
        setSelectedIndex,
        allElements,
        getIslands,
        initiatorTile,
        gotoIslandTile,
        myIslands,
        isMyTile,
      }}
    >
      {children}
    </TileContext.Provider>
  );
};
