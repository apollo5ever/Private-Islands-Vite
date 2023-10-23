import { useState, useCallback, useContext, useEffect } from 'react';
import { default as GI } from '../getIslands.js';
import LoggerContext, { LOG } from '@/components/providers/LoggerContext.jsx';
import { Helpers } from '@/utils/helpers.js';
import { useGetBalance } from '@/components/hooks/useGetBalance';
import { LoginContext } from '@/LoginContext.jsx';

export const useGetIslands = () => {
  const logger = useContext(LoggerContext);
  const [state, setState] = useContext(LoginContext);
  const [getBalance] = useGetBalance();
  const [islands, setIslands] = useState([]);
  const [myIslands, setMyIslands] = useState();
  const [shuffledIslands, setShuffledIslands] = useState([]);
  const COMPNAME = 'useGetIslands.js';

  const getIslands = useCallback(async () => {
    try {
      const islandsData = await GI();
      console.log('USE GET ISLE island data', islandsData);
      setIslands(islandsData);
      let myisles = await Promise.all(
        islandsData.map(async (island) => {
          console.log('USE GET ISLE - GETTING BALANCE FOR', island.SCID);
          const balance = await getBalance(island.SCID);
          console.log('USE GET ISLE - Balance for scid', balance, island);
          if (balance > 0) {
            return { ...island, type: 'island' };
          } else {
            return null;
          }
        })
      ).then((results) => results.filter((result) => result !== null));
      setMyIslands(myisles);

      setShuffledIslands(Helpers.shuffleArray([...islandsData]));
      logger(LOG.API, COMPNAME, 'All Islands', islandsData);
    } catch (error) {
      logger(LOG.ERROR, COMPNAME, 'Error fetching islands', error);
    }
  }, [state.walletMode, logger]);

  useEffect(() => {
    console.log('USE GET ISL - getting islands', state.walletMode);
    getIslands();
  }, [getIslands, state.walletMode]);

  return {
    islands,
    shuffledIslands,
    getIslands,
    myIslands,
    setMyIslands,
  };
};
