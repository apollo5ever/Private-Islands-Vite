import { useState, useCallback, useContext } from 'react';
import { default as GI } from '../getIslands.js';
import LoggerContext, { LOG } from '@/components/providers/LoggerContext.jsx';
import { Helpers } from '@/utils/helpers.js';

export const useGetIslands = (state) => {
  const logger = useContext(LoggerContext);
  const [islands, setIslands] = useState([]);
  const [shuffledIslands, setShuffledIslands] = useState([]);
  const COMPNAME = 'useGetIslands.js';

  const getIslands = useCallback(async () => {
    const islandsData = await GI(state);
    setIslands(islandsData);
    setShuffledIslands(Helpers.shuffleArray([...islandsData]));
    logger(LOG.API, COMPNAME, 'All Islands', islandsData);
  }, [state]);

  return { islands, shuffledIslands, getIslands };
};
