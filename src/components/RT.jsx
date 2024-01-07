import React from 'react';
import to from 'await-to-js';
import { useSendTransaction } from './hooks/useSendTransaction';
import { Button } from '@/components/common/Button.jsx';

export default function RT(props) {
  const [sendTransaction] = useSendTransaction();
  const accept = React.useCallback(async (e) => {
    e.preventDefault();
    let data;

    if (props.refund) {
      data = new Object({
        scid: props.scid,
        ringsize: 2,
        sc_rpc: [
          {
            name: 'entrypoint',
            datatype: 'S',
            value: 'RT',
          },
          {
            name: 'H',
            datatype: 'S',
            value: props.island + props.index,
          },
        ],
      });
    } else {
      data = new Object({
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
            value: 'RT',
          },
          {
            name: 'H',
            datatype: 'S',
            value: props.island + props.index,
          },
        ],
      });
    }

    sendTransaction(data);
  });

  return (
    <>
      <div>
        <form onSubmit={accept}>
          <button
            type={'submit'}
            className="btn w-full cursor-pointer rounded-bl-[35px] rounded-tr-[35px] bg-gradient-to-b from-accent to-[#6CCAB1] py-1 text-center text-xl leading-tight text-[#FFF] hover:shadow-lg"
          >
            Release Treasure
          </button>
        </form>
      </div>
    </>
  );
}
