import to from 'await-to-js';
import React from 'react';
import { LoginContext } from '../../LoginContext';
import { useContext } from 'react';
import { useGetSC } from './useGetSC';
import hex2a from '../hex2a';

export function useNameLookup() {
  const [state, setState] = useContext(LoginContext);
  const [getSC] = useGetSC();

  async function nameLookup(want, have) {
    let contract = await getSC(state.scid_registry);
    if (want == 'name' && contract.stringkeys[`N::PRIVATE-ISLANDS::${have}`]) {
      return hex2a(contract.stringkeys[`N::PRIVATE-ISLANDS::${have}`]);
    } else if (
      want == 'scid' &&
      contract.stringkeys[`S::PRIVATE-ISLANDS::${have}`]
    ) {
      return hex2a(contract.stringkeys[`S::PRIVATE-ISLANDS::${have}`]);
    } else return;
  }
  return [nameLookup];
}
