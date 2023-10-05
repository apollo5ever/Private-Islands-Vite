import DeroBridgeApi from 'dero-rpc-bridge-api';
import React from 'react';
import ReactDOM from 'react-dom';
import to from 'await-to-js';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSendTransaction } from './hooks/useSendTransaction';
import { useGetSC } from './hooks/useGetSC';

import { LoginContext } from '../LoginContext';
import Success from './success.jsx';

export default function CreateFund() {
  const [sendTransaction] = useSendTransaction();
  const [state, setState] = React.useContext(LoginContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [getSC] = useGetSC();
  const params = useParams();
  const island = params.island;
  const index = params.index;

  const DoIt = React.useCallback(async (event) => {
    event.preventDefault();

    var deadline = new Date(event.target.deadline.value).getTime() / 1000;

    const transfers = [
      {
        destination: state.randomAddress,
        scid: island,
        burn: 1,
      },
    ];

    const txData = new Object({
      scid: state.scid_fundraisers,
      ringsize: 2,
      transfers: transfers,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'NF',
        },

        {
          name: 'G',
          datatype: 'U',
          value: parseInt(event.target.goal.value) * 100000,
        },
        {
          name: 'D',
          datatype: 'U',
          value: deadline,
        },
        {
          name: 'A',
          datatype: 'S',
          value: event.target.address.value,
        },
        {
          name: 'H',
          datatype: 'S',
          value: island,
        },
        {
          name: 'i',
          datatype: 'U',
          value: parseInt(index),
        },
        {
          name: 'name',
          datatype: 'S',
          value: event.target.fundName.value,
        },
        {
          name: 't',
          datatype: 'S',
          value: '',
        },
      ],
    });
    sendTransaction(txData);

    setSearchParams({ status: 'metadata', name: event.target.fundName.value });
  });

  const SetMetadata = React.useCallback(async (event) => {
    event.preventDefault();
    let fee;
    if (event.target.description.value.length > 380) fee = 10000;

    const transfers = [
      {
        destination: state.randomAddress,
        scid: island,
        burn: 1,
      },
    ];

    const txData = new Object({
      scid: state.scid_fundraisers,
      ringsize: 2,
      fees: fee,
      transfers: transfers,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'SetMetadata',
        },

        {
          name: 'H',
          datatype: 'S',
          value: island,
        },
        {
          name: 'i',
          datatype: 'U',
          value: parseInt(index),
        },
        {
          name: 'Name',
          datatype: 'S',
          value: event.target.fundName.value,
        },
        {
          name: 'Image',
          datatype: 'S',
          value: event.target.fundPhoto.value,
        },
        {
          name: 'Tagline',
          datatype: 'S',
          value: event.target.tagline.value,
        },
        {
          name: 'Description',
          datatype: 'S',
          value: event.target.description.value,
        },
      ],
    });
    sendTransaction(txData);

    setSearchParams({ status: 'success' });
  });

  return (
    <div className="function">
      {searchParams.get('status') == 'metadata' ? (
        <form onSubmit={SetMetadata}>
          <input
            placeholder="Name"
            id="fundName"
            type="text"
            defaultValue={searchParams.get('name')}
          />
          <input placeholder="Image URL" id="fundPhoto" type="text" />
          <input placeholder="Tagline" id="tagline" type="text" />

          <textarea
            placeholder="Description"
            rows="44"
            cols="80"
            id="description"
          />

          <button type={'submit'}>Launch</button>
        </form>
      ) : searchParams.get('status') == 'success' ? (
        <Success />
      ) : (
        <div className="profile">
          <h3>Launch a Fundraiser</h3>

          <form onSubmit={DoIt}>
            <input placeholder="Name" id="fundName" type="text" />

            <p>Deadline</p>
            <input type="date" id="deadline" name="deadline"></input>

            <input placeholder="Goal" id="goal" type="text" />
            <input placeholder="Address" id="address" type="text" />

            <button type={'submit'}>Launch</button>
          </form>
        </div>
      )}
    </div>
  );
}
