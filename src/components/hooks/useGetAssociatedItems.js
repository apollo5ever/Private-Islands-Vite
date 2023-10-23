import { Helpers, piAssetType } from '@/utils/helpers.js';

export const useGetAssociatedItems = (island, type, index, myIslands = []) => {
  let otherBounties = [];
  let otherFundraisers = [];
  let otherSubscriptions = [];
  let otherIslands = [];

  switch (type) {
    case piAssetType.BOUNTY:
      otherBounties = Helpers.getAssociatedBounties(island, index);
      break;
    case piAssetType.FUNDRAISER:
      otherFundraisers = Helpers.getAssociatedFundraisers(island, index);
      break;
    case piAssetType.SUBSCRIPTION:
      otherSubscriptions = Helpers.getAssociatedSubscriptions(island, index);
      break;
    case piAssetType.ISLAND:
      otherIslands = Helpers.getAssociatedIslands(island, myIslands);
      break;
  }

  return {
    OtherBounties: otherBounties,
    OtherFundraisers: otherFundraisers,
    OtherSubscriptions: otherSubscriptions,
    OtherIslands: otherIslands,
  };
};
