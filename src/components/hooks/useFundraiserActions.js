import { useContext } from 'react';
import { LoginContext } from '@/LoginContext.jsx';
import { useSendTransaction } from '@/components/hooks/useSendTransaction.jsx';
import { useGetRandomAddress } from '@/components/hooks/useGetRandomAddress.jsx';
import {
  withdraw,
  oaoWithdraw,
  getTokens,
  supportGoal,
  setMetaData,
} from '@/utils/fundraiserActions.js';

export const useFundraiserActions = (tile) => {
  const [state] = useContext(LoginContext);
  const [sendTransaction] = useSendTransaction();
  const [getRandomAddress] = useGetRandomAddress();

  const handleWithdraw = (event) => {
    event.preventDefault();
    withdraw(tile, state, sendTransaction, event);
  };

  const handleOaoWithdraw = (event) => {
    event.preventDefault();
    oaoWithdraw(tile, state, sendTransaction, event);
  };

  const handleGetTokens = (event) => {
    getTokens(tile, state, sendTransaction, event);
  };

  const handleSupportGoal = (event) => {
    event.preventDefault();
    supportGoal(tile, state, sendTransaction, getRandomAddress, event);
  };

  const handleSetMetaData = (event) => {
    event.preventDefault();
    console.log('SET META FOR TILE', tile);
    setMetaData(tile, state, sendTransaction, getRandomAddress, event);
  };

  return {
    handleWithdraw,
    handleGetTokens,
    handleSupportGoal,
    handleOaoWithdraw,
    handleSetMetaData,
  };
};
