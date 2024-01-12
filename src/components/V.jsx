import React from 'react';
import to from 'await-to-js';
import { useSendTransaction } from './hooks/useSendTransaction';
import { useGetRandomAddress } from './hooks/useGetRandomAddress';
import { Button } from '@/components/common/Button.jsx';

export default function V(props) {
  const [sendTransaction] = useSendTransaction();
  const [getRandomAddress] = useGetRandomAddress();

  const accept = React.useCallback(async (e) => {
    e.preventDefault();
    const randomAddress = await getRandomAddress();
    const data = new Object({
      scid: props.scid,
      ringsize: 2,
      transfers: [
        {
          destination: randomAddress,
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
      <form onSubmit={accept}>
        <Button size="small" type={'submit'}>
          Veto
        </Button>
      </form>
    </>
  );
}
