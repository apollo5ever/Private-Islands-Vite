import { useState, useCallback, useContext } from 'react';
import { default as GI } from '../getIslands.js';
import LoggerContext, { LOG } from '@/components/providers/LoggerContext.jsx';
import { Helpers } from '@/utils/helpers.js';
import { LoginContext } from '../../LoginContext.jsx';

export const useGetContracts = () => {
  const logger = useContext(LoggerContext);

  const COMPNAME = 'useGetContracts.js';
  const [state,setState] = useContext(LoginContext)

  const getContracts = async () => {
    const contractsData =  await fetch(`http://127.0.0.1:5000/api/contracts`);
    console.log(contractsData)
    const contracts = await contractsData.json()
    console.log(contracts)
    setState((state)=>({...state,scid_registry:
      contracts.registry,
    scid_bounties:
      contracts.bounties,
    scid_fundraisers:
      contracts.fundraisers,
    scid_subscriptions:
      contracts.subscriptions,}))
  }

  return [getContracts];
};
