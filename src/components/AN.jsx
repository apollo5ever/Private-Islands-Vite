import React from 'react';
import to from 'await-to-js';
import { useSendTransaction } from './hooks/useSendTransaction';
import { useGetRandomAddress } from './hooks/useGetRandomAddress';
import { Button } from '@/components/common/Button.jsx';

export default function AN(props) {
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
          scid: props.JX,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'AN',
        },
        {
          name: 'H',
          datatype: 'S',
          value: props.island + props.index,
        },
        {
          name: 'JX',
          datatype: 'S',
          value: props.JX,
        },
        {
          name: 'l',
          datatype: 'S',
          value: props.l,
        },
      ],
    });

    sendTransaction(data);
  });

  return (
    <>
      <div>
        <form onSubmit={accept}>
          <Button type={'submit'}>
            Accept {props.l == 'J' ? 'Judge' : 'Executer'} Nomination
          </Button>
        </form>
      </div>
    </>
  );
}
