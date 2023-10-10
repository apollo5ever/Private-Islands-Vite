import React, { useState, useContext, useCallback } from 'react';
import { LoginContext } from '../../LoginContext';

export function useGetTransfers() {
  const [state, setState] = useContext(LoginContext);

  async function getTransfers(data) {
    return new Promise((resolve, reject) => {
      const payload = {
        jsonrpc: '2.0',
        method: 'GetTransfers',
        id: `getTransfers`,
        params: {
          scid: data.scid,
          coinbase: data.coinbase,
          in: data.incoming,
          out: data.out,
          min_height: data.min_height,
          max_height: data.max_height,
          sender: data.sender,
          receiver: data.receiver,
          dstport: data.dstport,
          srcport: data.srcport,
        },
      };

      const handleResponse = (response) => {
        console.log('transfers response', response);
        if (response.id === payload.id) {
          resolve(response.result.balance);
        }
      };

      // Subscribe to WebSocket messages
      state.ws.socket.addEventListener('message', (event) => {
        const response = JSON.parse(event.data);
        handleResponse(response);
      });

      // Send the payload
      state.ws.sendPayload(payload);
    });
  }

  return [getTransfers];
}
