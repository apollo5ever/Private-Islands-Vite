// App Constants

export const WALLET_INPUT_RENDERS = {
  createNewWallet: 'createNewWallet',
  recoverFromSeed: 'recoverFromSeed',
  recoverFromHexSeed: 'recoverFromHexSeed',
  recoverFromDisk: 'recoverFromDisk',
};

export const DERO_DENOMINATOR = 100000;

// General utility functions
/*
 To get classnames formatted properly
 -- Usage example
 <button className={classNames('this is always applied',
        isTruthy && 'this only when the isTruthy is truthy',
        active ? 'active classes' : 'inactive classes')}>Text</button>
 */
export class Helpers {
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
