import { useEffect, useState } from 'react';

export const useCocoChat = (type) => {
  const [messageType, setMessageType] = useState('primary');
  const [index, setIndex] = useState(0);

  console.log('COOCCHATE TYPE', type);

  const chats = {
    bounty: {
      primary: {
        title: 'Buried Treasure Bounties',
        msg:
          'Need a task done for you? Create a Bounty!  Dero is stored in the contract until the bounty is completed.  A Judge' +
          ' decides who has earned the bounty. An executor approves or vetos the decision.',
      },
      general: [
        {
          title: 'Need A Challenge & Want To Earn Dero',
          msg:
            'Bounties are tasks that someone needs completed.  Often times is a software project or other online ' +
            'or digital task that they are willing to pay for',
        },
        {
          title: 'Filter to see only Bounties',
          msg:
            'From the main page you can filter the tiles to see only Bounties.  You can further filter by bounty status ' +
            'by hovering over the bounty button after you have selected it',
        },
      ],
    },
    fundraiser: {
      primary: {
        title: 'Smoke Signal Fundraiser',
        msg:
          'Need to raise funds? Set a goal & a deadline. Users donate Dero & it is stored in the contract.  When the goal is met' +
          'the Dero is sent to the fundee. If not met & the deadline is past, users are refunding their contributions',
      },
    },
    subscription: {
      primary: {
        title: 'Message-in-a-Bottle Subscriptions',
        msg:
          'Create multiple Tiers to a subscription service by setting an amount and an interval. For example, 10 Dero per month ' +
          'for access to a newsletter. Your content in encrypted in decentralize storage & your subscribers are sent a transaction ' +
          'with the decryption key each period.',
      },
    },
    island: {
      primary: {
        title: ' Island',
        msg:
          'Private Islands is a decentralized, trustless financial support system using Dero currency on the Dero Smart Contract ' +
          'network.  Raise funds, sell subscriptions, earn bounties.',
      },
    },
  };

  const messages = chats[type][messageType];
  const generalMessages = chats[type].general;

  useEffect(() => {
    if (messageType === 'primary' && generalMessages) {
      const timer = setTimeout(() => {
        setMessageType('general');
      }, 20000);
      return () => clearTimeout(timer);
    } else if (generalMessages) {
      // Added an additional check here
      const timer = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % generalMessages.length);
      }, 20000);
      return () => clearInterval(timer);
    }
  }, [messageType, generalMessages?.length]); // Used optional chaining to avoid error if generalMessages is undefined

  return messages instanceof Array ? messages[index] : messages;
};
