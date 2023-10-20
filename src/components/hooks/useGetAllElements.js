import { useGetIslands } from '@/components/hooks/useGetIslands';
import { useGetBounties } from '@/components/hooks/useGetBounties';
import { useGetFundraisers } from '@/components/hooks/useGetFundraisers';
import { useGetSubscriptions } from '@/components/hooks/useGetSubscriptions';
import { piAssetType, Helpers } from '@/utils/helpers.js';
import LoggerContext, { LOG } from '@/components/providers/LoggerContext.jsx';
import { useContext, useMemo } from 'react';

export const useGetAllElements = (state, isFirstVisit = true) => {
  const logger = useContext(LoggerContext);
  const { islands, shuffledIslands, getIslands, myIslands, setMyIslands } =
    useGetIslands(state);
  const { bounties } = useGetBounties(islands);
  const { fundraisers } = useGetFundraisers(islands);
  const { subscriptions } = useGetSubscriptions(islands);
  const COMPNAME = 'useGetAllElements';

  const allElements = useMemo(() => {
    let elements = [
      ...islands.map((island) => ({ ...island, type: piAssetType.ISLAND })),
      ...bounties.map((bounty) => ({ ...bounty, type: piAssetType.BOUNTY })),
      ...fundraisers.map((fundraiser) => ({
        ...fundraiser,
        type: piAssetType.FUNDRAISER,
      })),
      ...subscriptions.map((subscription) => ({
        ...subscription,
        type: piAssetType.SUBSCRIPTION,
      })),
    ];

    logger(LOG.DEBUG, COMPNAME, 'ISLANDS', islands);
    console.log('My Islands in get all elements', myIslands);
    // logger(LOG.DEBUG, COMPNAME, 'BOUNTIES', bounties);
    // logger(LOG.DEBUG, COMPNAME, 'FUNDRAISERS', fundraisers);
    // logger(LOG.DEBUG, COMPNAME, 'SUBSCRIPTIONS', subscriptions);

    console.log('USE GET ALL my Isle', myIslands);

    // TODO MST - had trouble with the state mgmt as this is called from TileContext so think I had a timing issue?  It never shuffled
    // For now, isFirstVisit doesnt exist or isn't being used -- but want to do something with this at some ponit to limit shuffle
    return isFirstVisit ? Helpers.shuffleArray(elements) : elements;
  }, [islands, bounties, fundraisers, subscriptions, isFirstVisit]);

  return {
    allElements: allElements,
    getIslands: getIslands,
    myIslands: myIslands,
    setMyIslands: setMyIslands,
  };
};
