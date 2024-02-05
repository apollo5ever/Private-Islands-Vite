import { default as GI } from '@/components/getIslands.js';

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

export const assetOnChainName = {
  ISLAND: 'island',
  BOUNTY: 'Bounties',
  FUNDRAISER: 'Fundraisers',
  SUBSCRIPTION: 'Tiers',
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

export const breakPoint = {
  SMALL: 640,
  MEDIUM: 768,
  LARGE: 1024,
  DESKTOP: 1280,
};

// TODO - Install i18next component & set up json file to for text replacement/translation
export const seniorCocoMessages = {
  home: {
    [piAssetType.FUNDRAISER]:
      'A Fundraiser (or Smoke Signal in my island life) offers you a way to raise Dero for a cause.  Basically it is a private, unstoppable, uncensorable GoFundMFe tool',
    [piAssetType.SUBSCRIPTION]:
      'A Subscription (or Message in a Bottle in my island life) enables you to offered tiered subscriptions to information you want to periodically provide for a fee, or simply a tiered subscription service',
    [piAssetType.BOUNTY]:
      'A Bounty (or Buried Treasure in my island life) offers you a way to get tasks done by offering a reward for the task at hand',
  },
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
      case piAssetType.SUBSCRIPTION:
        return tile.Name;
    }
  };

  static getTileTagline = (tile) => {
    switch (tile.type) {
      case piAssetType.ISLAND:
      case piAssetType.BOUNTY:
      case piAssetType.FUNDRAISER:
      case piAssetType.SUBSCRIPTION:
        return tile.Tagline;
    }
  };

  static getTileImage = (tile) => {
    switch (tile.type) {
      case piAssetType.ISLAND:
      case piAssetType.BOUNTY:
      case piAssetType.FUNDRAISER:
      case piAssetType.SUBSCRIPTION:
        return tile.Image ? tile.Image : this.getPlaceholderImage();
    }
  };

  static getPlaceholderImage = () => {
    let numbers = [1, 2, 3, 4];
    let randomIndex = Math.floor(Math.random() * numbers.length);
    return `assets/images/islandPlaceholder_${numbers[randomIndex]}.png`;
  };

  static getTileDescription = (tile) => {
    switch (tile.type) {
      case piAssetType.ISLAND:
      case piAssetType.BOUNTY:
      case piAssetType.FUNDRAISER:
      case piAssetType.SUBSCRIPTION:
        return tile.Description;
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

  static getInitiatorImage = async (tile) => {
    const island = await GI(this.getInitiatorScid(tile));
    return island.Image;
  };

  static getInitiatorName = (tile) => {
    switch (tile.type) {
      case piAssetType.ISLAND:
        return tile.Name;
      case piAssetType.SUBSCRIPTION:

      case piAssetType.BOUNTY:
      case piAssetType.FUNDRAISER:
        return tile?.Initiator.Name;
    }
  };

  static getTileFromIsland = (island, type, index = 0) => {
    switch (type) {
      case piAssetType.ISLAND:
        return { ...island, type: piAssetType.ISLAND };
      case piAssetType.SUBSCRIPTION:
        return { ...island.Tiers[index], type: piAssetType.SUBSCRIPTION };
      case piAssetType.BOUNTY:
        return { ...island.Bounties[index], type: piAssetType.BOUNTY };
      case piAssetType.FUNDRAISER:
        return { ...island.Fundraisers[index], type: piAssetType.FUNDRAISER };
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

  static getAssociatedIslands = (island, myIslands) => {
    let otherIslands = [];
    if (myIslands.length > 1 && island && island.SCID) {
      otherIslands = myIslands
        .filter((item) => {
          return item.SCID !== island.SCID;
        })
        .map((item) => ({ ...item, type: piAssetType.ISLAND }));
    }

    return otherIslands;
  };

  static getItemTypeName = (type) => {
    switch (type) {
      case piAssetType.BOUNTY:
        return { singular: 'Bounty', plural: 'Bounties' };
      case piAssetType.SUBSCRIPTION:
        return { singular: 'Subscription', plural: 'Subscriptions' };
      case piAssetType.FUNDRAISER:
        return { singular: 'Fundraiser', plural: 'Fundraisers' };
      case piAssetType.ISLAND:
        return { singular: 'Island', plural: 'Islands' };
    }
  };

  static getItemCounts = (island) => {
    if (
      island.SCID ===
      'cf530bd98d200171a94bcd6ef1e3ad6348bfa3e6691196e64e93e7953b64a2e4'
    ) {
      console.log('GETIN ITME COUNTS FOR ', island);
    }
    return {
      bountiesCount: island.Bounties ? island.Bounties.length : 0,
      tiersCount: island.Tiers ? island.Tiers.length : 0,
      fundraisersCount: island.Fundraisers ? island.Fundraisers.length : 0,
    };
  };

  static getOnChainAssetName = (type) => {
    const value = Object.keys(piAssetType).find(
      (key) => piAssetType[key] === type
    );
    return assetOnChainName[value];
  };

  static getSeniorCocoMessage = (page, type) => {
    const DEFAULT_MESSAGE = '';

    console.log('PAGE?TYPE', page, type);

    if (seniorCocoMessages[page] && seniorCocoMessages[page][type]) {
      return seniorCocoMessages[page][type];
    }

    return DEFAULT_MESSAGE;
  };

  static isDateBeforeToday = (dateStr) => {
    const givenDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to 00:00:00.000

    return givenDate < today;
  };

  static formatDate = (dateStr) => {
    const date = new Date(dateStr * 1000);
    return date.toLocaleString();
  };

  static shuffleArray = (array) => {
    console.log('shuffle!');
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
