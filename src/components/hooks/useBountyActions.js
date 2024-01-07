import { useContext } from 'react';
import { LoginContext } from '@/LoginContext.jsx';
import {
  addTreasure,
  claimTreasure,
  setMetaData,
} from '@/utils/bountyActions.js';
import { useSendTransaction } from '@/components/hooks/useSendTransaction.jsx';
import { useGetRandomAddress } from '@/components/hooks/useGetRandomAddress.jsx';
import { useGetAddress } from '@/components/hooks/useGetAddress.jsx';

export const useBountyActions = (tile) => {
  const [state] = useContext(LoginContext);
  const [sendTransaction] = useSendTransaction();
  const [getRandomAddress] = useGetRandomAddress();
  const [getAddress] = useGetAddress();

  const handleSetMetaData = (event) => {
    event.preventDefault();
    setMetaData(tile, state, sendTransaction, getRandomAddress, event);
  };

  const handleAddTreasure = (event) => {
    event.preventDefault();
    addTreasure(tile, state, sendTransaction, getRandomAddress, event);
  };

  const handleClaimTreasure = (event) => {
    console.log('CLAIM TREAS', tile, event);
    event.preventDefault();
    claimTreasure(tile, state, sendTransaction, getAddress, event);
  };

  return {
    handleAddTreasure,
    handleClaimTreasure,
    handleSetMetaData,
  };
};
