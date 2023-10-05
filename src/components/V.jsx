import React from 'react';
import to from 'await-to-js';
import { useSendTransaction } from './hooks/useSendTransaction';

export default function V(props) {
  const accept = React.useCallback(async () => {
    const [sendTransaction] = useSendTransaction();
    const data = new Object({
      scid: props.scid,
      ringsize: 2,
      transfers: [
        {
          destination: props.randomAddress,
          burn: 1,
          scid: props.executer,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'V',
        },
        {
          name: 'H',
          datatype: 'S',
          value: props.island + props.index,
        },
      ],
    });
    sendTransaction(data);

    /*     const deroBridgeApi = props.dba.current
     const [err0, res0] = await to(deroBridgeApi.wallet('start-transfer', {
      
         "scid": props.scid,
         "ringsize": 2,
          "sc_rpc": [{
             "name": "entrypoint",
             "datatype": "S",
             "value": "V"
         },
         {
             "name": "H",
             "datatype": "S",
             "value": props.island+props.index
         }
     ]
     })) */
  });

  return (
    <>
      <div>
        <button onClick={() => accept()}>Veto</button>
      </div>
    </>
  );
}
