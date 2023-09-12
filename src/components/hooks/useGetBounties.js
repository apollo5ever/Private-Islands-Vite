import { useCallback, useState, useEffect, useContext } from 'react';
import LoggerContext, { LOG } from '@/components/providers/LoggerContext.jsx';

export const useGetBounties = (islands) => {
  const logger = useContext(LoggerContext);
  const [bounties, setBounties] = useState([]);
  const COMPNAME = 'useGetBounties.js';

  const getBounties = useCallback(async () => {
    let Bounties = [];
    for (let i = 0; i < islands.length; i++) {
      if (!islands[i].Bounties) continue;
      for (let b = 0; b < islands[i].Bounties.length; b++) {
        Bounties.push(islands[i].Bounties[b]);
      }
    }

    setBounties(Bounties);
    logger(LOG.API, COMPNAME, 'All Bounties', Bounties);
  }, [islands]);

  useEffect(() => {
    getBounties();
  }, [getBounties]);

  return { bounties };
};
