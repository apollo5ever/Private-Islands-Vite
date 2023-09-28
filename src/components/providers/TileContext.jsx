import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGetAllElements } from '@/components/hooks/useGetAllElements.js';
import { LoginContext } from '@/LoginContext.jsx';
import { Helpers, piAssetType } from '@/utils/helpers.js';

export const TileContext = createContext();

export const TileProvider = ({ children }) => {
  const [state, setState] = useContext(LoginContext);
  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [initiatorTile, setInitiatorTile] = useState();
  const { allElements, getIslands } = useGetAllElements(state);

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

    if (foundTile) {
      setInitiatorTile(foundTile);
    }
  }, [allElements, selectedTile]);

  const gotoIslandTile = (scid) => {
    const island = allElements.find(
      (item) => item?.SCID === scid && item.type === piAssetType.ISLAND
    );
    if (island) {
      setSelectedTile(island);
    }
  };

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
      }}
    >
      {children}
    </TileContext.Provider>
  );
};
