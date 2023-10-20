// App Constants

export const WALLET_INPUT_RENDERS = {
  createNewWallet: 'createNewWallet',
  recoverFromSeed: 'recoverFromSeed',
  recoverFromHexSeed: 'recoverFromHexSeed',
  recoverFromDisk: 'recoverFromDisk',
};

export const DERO_DENOMINATOR = 100000;

export const piAssetType = {
  ISLAND: 'island',
  BOUNTY: 'bounty',
  FUNDRAISER: 'fundraiser',
  SUBSCRIPTION: 'subscription',
  ALL: 'all',
};

export const statusFilter = {
  ALL: null,
  ACTIVE: 0,
  SUCCESS: 1,
  FAILURE: 2,
};

export const walletModes = {
  RPC: 'rpc',
  XSWD: 'xswd',
};

export const daemonModes = {
  USER: 'user',
  POOLS: 'pools',
};

// General utility functions
/*
 To get classnames formatted properly
 -- Usage example
 <button className={classNames('this is always applied',
        isTruthy && 'this only when the isTruthy is truthy',
        active ? 'active classes' : 'inactive classes')}>Text</button>
 */
export class Helpers {
  static getTileName = (tile) => {
    switch (tile.type) {
      case piAssetType.ISLAND:
      case piAssetType.BOUNTY:  
      case piAssetType.FUNDRAISER:
        return tile.Name;
      
      
      case piAssetType.SUBSCRIPTION:
        return tile.Names[tile.Names.length - 1];
    }
  };

  static getTileTagline = (tile) => {
    switch (tile.type) {
      case piAssetType.ISLAND:
      case piAssetType.BOUNTY:  
      case piAssetType.FUNDRAISER:
        return tile.Tagline;
      
      
      case piAssetType.SUBSCRIPTION:
        return tile.Taglines[tile.Taglines.length - 1];
    }
  };

  static getTileImage = (tile) => {
    switch (tile.type) {
      case piAssetType.ISLAND:
      case piAssetType.BOUNTY:  
       case piAssetType.FUNDRAISER:
        return tile.Image;
      
     
      case piAssetType.SUBSCRIPTION:
        return tile.Images[tile.Images.length - 1];
    }
  };

  static getTileDescription = (tile) => {
    switch (tile.type) {
      case piAssetType.ISLAND:
      case piAssetType.BOUNTY:  
      case piAssetType.FUNDRAISER:
        return tile.Description;
      
      
      case piAssetType.SUBSCRIPTION:
        return tile.Description[tile.Description.length - 1];
    }
  };

  static getInitiatorScid = (tile) => {
    switch (tile.type) {
      case piAssetType.ISLAND:
      case piAssetType.SUBSCRIPTION:
      case piAssetType.FUNDRAISER:
        return tile.SCID;
      case piAssetType.BOUNTY:
        return tile?.Initiator.SCID;
    }
  };

  static getInitiatorName = (tile) => {
    switch (tile.type) {
      case piAssetType.ISLAND:
      case piAssetType.SUBSCRIPTION:
        return tile.Name;
      case piAssetType.BOUNTY:
      case piAssetType.FUNDRAISER:
        return tile?.Initiator.Name;
    }
  };

  static getTileFromIsland = (island, type) => {
    switch (type) {
      case piAssetType.ISLAND:
        return { ...island, type: piAssetType.ISLAND };
      case piAssetType.SUBSCRIPTION:
        return { ...island.Tiers[0], type: piAssetType.SUBSCRIPTION };
      case piAssetType.BOUNTY:
        return { ...island.Bounties[0], type: piAssetType.BOUNTY };
      case piAssetType.FUNDRAISER:
        return { ...island.Fundraisers[0], type: piAssetType.FUNDRAISER };
    }
  };

  static getAssociatedBounties = (island, index) => {
    let otherBounties = [];
    if (island?.Bounties?.length > 1) {
      otherBounties = island.Bounties.filter((bounty) => {
        return bounty.Index !== index;
      }).map((bounty) => ({ ...bounty, type: piAssetType.BOUNTY }));
    }
    return otherBounties;
  };

  static getAssociatedFundraisers = (island, index) => {
    let otherFundraisers = [];
    if (island?.Fundraisers?.length > 1) {
      otherFundraisers = island.Fundraisers.filter((fundraiser) => {
        return fundraiser.Index !== index;
      }).map((fundraiser) => ({ ...fundraiser, type: piAssetType.FUNDRAISER }));
    }
    return otherFundraisers;
  };

  static getAssociatedSubscriptions = (island, index) => {
    let otherSubscriptions = [];
    if (island?.Tiers?.length > 1) {
      otherSubscriptions = island.Tiers.filter((tier) => {
        return tier.Index !== index;
      }).map((tier) => ({ ...tier, type: piAssetType.SUBSCRIPTION }));
    }
    return otherSubscriptions;
  };

  static getItemTypeName = (type) => {
    switch (type) {
      case piAssetType.BOUNTY:
        return { singular: 'Bounty', plural: 'Bounties' };
      case piAssetType.SUBSCRIPTION:
        return { singular: 'Subscription', plural: 'Subscriptions' };
      case piAssetType.FUNDRAISER:
        return { singular: 'Fundraiser', plural: 'Fundraisers' };
    }
  };

  static getItemCounts = (island) => {
    return {
      bountiesCount: island.Bounties ? island.Bounties.length : 0,
      tiersCount: island.Tiers ? island.Tiers.length : 0,
      fundraisersCount: island.Fundraisers ? island.Fundraisers.length : 0,
    };
  };

  static shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  static ucfirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  static formatClasses = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  static twFlexJustify = (justify) => {
    switch (justify) {
      case 'left':
      case 'start':
        return 'justify-start';
      case 'right':
      case 'end':
        return 'justify-end';
      case 'even':
        return 'justify-evenly';
      case 'between':
        return 'justify-between';
      case 'around':
        return 'justify-around';
      case 'stretch':
        return 'justify-stretch';
      case 'center':
      default:
        return 'justify-center';
    }
  };

  static twFlexAlignItems = (align) => {
    switch (align) {
      case 'left':
      case 'start':
        return 'center md:items-start';
      case 'right':
      case 'end':
        return 'center md:items-end';
      case 'stretch':
        return 'items-stretch';
      case 'center':
      default:
        return 'items-center';
    }
  };
}
