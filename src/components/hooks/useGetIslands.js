import { useState, useCallback, useContext, useEffect } from 'react';
import { default as GI } from '../getIslands.js';
import LoggerContext, { LOG } from '@/components/providers/LoggerContext.jsx';
import { Helpers } from '@/utils/helpers.js';
import { useGetBalance } from '@/components/hooks/useGetBalance';

export const useGetIslands = () => {
  const logger = useContext(LoggerContext);
  const [getBalance] = useGetBalance();
  const [islands, setIslands] = useState([]);
  const [myIslands, setMyIslands] = useState();
  const [shuffledIslands, setShuffledIslands] = useState([]);
  const COMPNAME = 'useGetIslands.js';

  const getIslands = useCallback(async () => {
    try {
      const islandsData = await GI();
      setIslands(islandsData);
      let myisles = await Promise.all(
        islandsData.map(async (island) => {
          let balance = await getBalance(island.SCID);
          console.log('USE GET ISL - Balance for scid', balance, island);
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
  }, [logger]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getIslands();
    }

    return () => {
      isMounted = false;
    };
  }, [getIslands]);

  return {
    islands,
    shuffledIslands,
    getIslands,
    myIslands,
    setMyIslands,
  };
};
