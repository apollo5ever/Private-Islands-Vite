import React, { useState, useContext } from 'react';
import { LoginContext } from '../../LoginContext';
import to from 'await-to-js';
import { useInitializeWallet } from './useInitializeWallet';

export function useSendTransaction() {
  const [state, setState] = useContext(LoginContext);
  const [initializeWallet] = useInitializeWallet();

  const rpcSend = React.useCallback(async (data, deroBridgeApiRef) => {
    const deroBridgeApi = deroBridgeApiRef.current;

    const [err, res] = await to(deroBridgeApi.wallet('start-transfer', data));
    console.log('useSendTransaction RPC res', res);
    return res.data.result.txid;
  });

  async function sendTransaction(data) {
    if (state.walletMode == 'rpc') {
      const rpcData = {
        scid: data.scid,
        ringsize: data.ringsize,
        transfers: data.transfers,
        sc_rpc: data.sc_rpc,
        sc: data.sc,
        fees: data.fees,
      };
      if (!state.deroBridgeApiRef) {
        const deroBridgeApiRef = await initializeWallet();
        console.log(deroBridgeApiRef);
        return await rpcSend(rpcData, deroBridgeApiRef);
      }

      return await rpcSend(rpcData, state.deroBridgeApiRef);
    } else if (state.walletMode == 'xswd') {
      return new Promise((resolve, reject) => {
        const payload = {
          jsonrpc: '2.0',
          id: `sendTX`,
          method: 'transfer',
          params: {
            scid: data.scid,
            ringsize: data.ringsize,
            transfers: data.transfers,
            sc_rpc: data.sc_rpc,
            sc: data.sc,
            fees: data.fees,
          },
        };

        const handleResponse = (response) => {
          console.log('handling it', response.id);
          if (response.id === `sendTX`) {
            console.log('yep!', response);
            resolve(response.result);
          }
        };
        state.ws.socket.addEventListener('message', (event) => {
          const response = JSON.parse(event.data);
          handleResponse(response);
        });

        // Send the payload
        state.ws.sendPayload(payload);
      });
    }
  }

  return [sendTransaction];
}
