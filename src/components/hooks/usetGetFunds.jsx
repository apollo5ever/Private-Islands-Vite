import { useState, useEffect, useCallback } from 'react';
import GI from '@/components/getIslands';

export const useGetFunds = (island, index) => {
  const [treasure, setTreasure] = useState({});
  const [islandSCID, setIslandSCID] = useState('');
  const [recipients, setRecipients] = useState([]);

  const fetchFunds = useCallback(async () => {
    let profile = await GI(island);
    if (profile && profile.Bounties && profile.Bounties.length > index) {
      const bounty = profile.Bounties[index];
      setTreasure(bounty);
      setIslandSCID(profile.SCID);

      if (bounty.RecipientList && bounty.RecipientList.length > 0) {
        let totalWeight = bounty.RecipientList.reduce(
          (acc, current) => acc + current.Weight,
          0
        );
        let formattedList = bounty.RecipientList.map((x) => (
          <li key={x.Address}>{`${x.Address}: ${
            (100 * x.Weight) / totalWeight
          }%`}</li>
        ));
        setRecipients(formattedList);
      }
    }
  }, [island, index]);

  useEffect(() => {
    fetchFunds();
  }, [fetchFunds]);

  return { treasure, islandSCID, recipients, fetchFunds };
};
