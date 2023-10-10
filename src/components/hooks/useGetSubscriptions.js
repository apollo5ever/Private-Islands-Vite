import React, { useEffect, useState } from 'react';
import { LoginContext } from '@/LoginContext.jsx';

export const useGetSubscriptions = (islands) => {
  const [state, setState] = React.useContext(LoginContext);
  const [subscriptions, setSubscriptions] = useState([]);

  const getSubscriptions = async () => {
    const subscriptionList = [];

    for (let i = 0; i < islands.length; i++) {
      if (!islands[i].Tiers) continue;
      subscriptionList.push(...islands[i].Tiers);
    }

    setSubscriptions(subscriptionList);
  };

  useEffect(() => {
    getSubscriptions();
  }, [islands, state.userWallet, state.randomAddress]);

  return { subscriptions };
};
