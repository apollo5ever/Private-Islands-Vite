// App Constants

export const MOBILE_BREAKPOINT = '768px'


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
    return classes.filter(Boolean).join(" ")
  }

  static twFlexJustify = (justify) => {
    switch(justify) {
      case 'left':
      case 'start':
        return 'justify-start'
      case 'right':
      case 'end':
        return 'justify-end'
      case 'even':
        return 'justify-evenly'
      case 'between':
        return 'justify-between'
      case 'around':
        return 'justify-around'
      case 'center':
      default:
        return 'justify-center'
    }
  }

  static twFlexAlignItems = (align) => {
    switch(align) {
      case 'left':
      case 'start':
        return 'items-start'
      case 'right':
      case 'end':
        return 'items-end'
      case 'center':
      default:
        return 'items-center'
    }
  }

  static formattedDate = (timestamp) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(timestamp);
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    const month = months[monthIndex];
    return `${month} ${day}, ${year}`;
  }

  static formatNumber = (number) => {
    return number.toLocaleString();
  }
}

