import React, { useState, useContext } from 'react';
import { LoginContext } from '../../LoginContext';
import to from 'await-to-js';

export function useSendTransaction() {
  const [state, setState] = useContext(LoginContext);

  const rpcSend = React.useCallback(async (d) => {
    const deroBridgeApi = state.deroBridgeApiRef.current;

    const [err, res] = await to(deroBridgeApi.wallet('start-transfer', d));
    console.log('useSendTransaction RPC res', res);
    return res.data.result.txid;
  });

  async function sendTransaction(data) {
    console.log(data);
    if (data.sc_rpc && data.sc_rpc.length > 0) {
      data.sc_rpc.push(
        { name: 'SC_ID', datatype: 'H', value: data.scid },
        { name: 'SC_ACTION', datatype: 'U', value: 0 }
      );
    }
    const response = await state.xswd.wallet.transfer(data);

    return response.result.txid;

    if (state.walletMode == 'rpc') {
      const rpcData = {
        scid: data.scid,
        ringsize: data.ringsize,
        transfers: data.transfers,
        sc_rpc: data.sc_rpc,
        sc: data.sc,
        fees: data.fees,
      };

      return await rpcSend(rpcData);
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
