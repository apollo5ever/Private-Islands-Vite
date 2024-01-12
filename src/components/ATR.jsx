import React, { useState } from 'react';
import to from 'await-to-js';
import { useSendTransaction } from './hooks/useSendTransaction';
import { useGetRandomAddress } from './hooks/useGetRandomAddress';
import { Button } from '@/components/common/Button.jsx';

export default function ATR(props) {
  const [sendTransaction] = useSendTransaction();
  const [getRandomAddress] = useGetRandomAddress();
  const [recipient, setRecipient] = useState();

  const handleRecipientChange = (e) => {
    let index = e.target.value;

    if (index >= props.recipientList.length) {
      setRecipient('');
    } else {
      setRecipient(props.recipientList[index].Address);
    }
  };

  const addRecipient = React.useCallback(async (e) => {
    e.preventDefault();
    const randomAddress = getRandomAddress();

    var f = 0;
    if (e.target.final.checked) f = 1;

    const data = new Object({
      scid: props.scid,
      ringsize: 2,
      transfers: [
        {
          destination: randomAddress,
          burn: 1,
          scid: props.judge,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'ATR',
        },
        {
          name: 'H',
          datatype: 'S',
          value: props.island + props.index,
        },
        {
          name: 'R',
          datatype: 'S',
          value: e.target.recipient.value,
        },
        {
          name: 'I',
          datatype: 'U',
          value: parseInt(e.target.index.value),
        },
        {
          name: 'W',
          datatype: 'U',
          value: parseInt(e.target.weight.value),
        },
        {
          name: 'F',
          datatype: 'U',
          value: f,
        },
      ],
    });

    sendTransaction(data);

    /*      const [err0, res0] = await to(deroBridgeApi.wallet('start-transfer', {
        

      
         "scid": props.scid,
         "ringsize": 2,
          "sc_rpc": [{
             "name": "entrypoint",
             "datatype": "S",
             "value": "ATR"
         },
         {
             "name": "H",
             "datatype": "S",
             "value": props.island+props.index
         },
         {
             "name": "R",
             "datatype": "S",
             "value": e.target.recipient.value
         },
         {
          "name":"I",
          "datatype":"U",
          "value":parseInt(e.target.index.value)
         },
         {
            "name":"W",
            "datatype":"U",
            "value":parseInt(e.target.weight.value)
         },
         {
            "name":"F",
            "datatype":"U",
            "value":f
         }
     ]
     })) */
  });

  return (
    <>
      <div>
        Choose one or more Dero addresses to receive the bounty.
        <form onSubmit={addRecipient}>
          <select onChange={(e) => handleRecipientChange(e)} id="index">
            {props.recipientList.map((x, i) => (
              <option value={i}>Modify {x.Address}</option>
            ))}
            <option value={props.recipientList.length}>Add New</option>
          </select>
          <br />
          <input
            style={{ width: '33vw' }}
            id="recipient"
            placeholder="recipient dero address"
            type="text"
            defaultValue={recipient}
          />
          <br />
          <input id="weight" placeholder="weight" type="number" />

          <p>
            Check Box if this is final recipient and treasure is ready to be
            released. <input id="final" type="checkbox" />
          </p>

          <Button size="small" type="submit">
            Add Recipient
          </Button>
        </form>
      </div>
    </>
  );
}
