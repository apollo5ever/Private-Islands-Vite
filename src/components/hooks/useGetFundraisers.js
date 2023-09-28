import { useEffect, useState, useCallback, useContext } from 'react';
import LoggerContext, { LOG } from '@/components/providers/LoggerContext.jsx';

export const useGetFundraisers = (islands) => {
  const logger = useContext(LoggerContext);
  const [fundraisers, setFundraisers] = useState([]);
  const COMPNAME = 'useGetBounties.js';

  const getFundraisers = useCallback(() => {
    const funders = [];

    for (let i = 0; i < islands.length; i++) {
      if (!islands[i].Fundraisers) continue;
      for (let b = 0; b < islands[i].Fundraisers.length; b++) {
        funders.push(islands[i].Fundraisers[b]);
      }
    }

    setFundraisers(funders);
    logger(LOG.API, COMPNAME, 'All Fundraisers', fundraisers);
  }, [islands]);

  useEffect(() => {
    getFundraisers();
  }, [islands]);

  return { fundraisers, getFundraisers };
};
