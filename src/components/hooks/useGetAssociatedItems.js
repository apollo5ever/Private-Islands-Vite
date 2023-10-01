import { Helpers, piAssetType } from '@/utils/helpers.js';

export const useGetAssociatedItems = (island, type, index) => {
  let otherBounties = [];
  let otherFundraisers = [];
  let otherSubscriptions = [];

  switch (type) {
    case piAssetType.BOUNTY:
      otherBounties = Helpers.getAssociatedBounties(island, index);
      break;
    case piAssetType.FUNDRAISER:
      otherFundraisers = Helpers.getAssociatedFundraisers(island, index);
      break;
    case piAssetType.SUBSCRIPTION:
      otherSubscriptions = Helpers.getAssociatedSubscriptions(island, index);
      console.log('YO FOUND SUBS', otherSubscriptions);
      break;
  }

  return {
    OtherBounties: otherBounties,
    OtherFundraisers: otherFundraisers,
    OtherSubscriptions: otherSubscriptions,
  };
};
