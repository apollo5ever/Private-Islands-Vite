import DeroBridgeApi from 'dero-rpc-bridge-api';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import to from 'await-to-js';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSendTransaction } from './hooks/useSendTransaction';
import { useGetSC } from './hooks/useGetSC';
import { useGetGasEstimate } from './hooks/useGetGasEstimate';

import { LoginContext } from '../LoginContext';
import Success from './success.jsx';
import RichTextEditor from './common/richTextEditor.jsx';

export default function CreateFund() {
  const [sendTransaction] = useSendTransaction();
  const [getGasEstimate] = useGetGasEstimate();
  const [state, setState] = React.useContext(LoginContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [getSC] = useGetSC();
  const params = useParams();
  const island = params.island;
  const index = params.index;
  const [editorHtml, setEditorHtml] = useState('');
  const [formData, setFormData] = useState({
    image: '',
    bio: '',
    tagline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const DoIt = React.useCallback(async (event) => {
    event.preventDefault();

    let oao = 0;
    if (event.target.OAO.checked) {
      oao = 1;
    }
    let ico = 0;
    if (event.target.ICO.checked) {
      ico = 1;
    }

    var deadline = new Date(event.target.deadline.value).getTime() / 1000;

    let transfers = [
      {
        destination: state.randomAddress,
        scid: island,
        burn: 1,
      },
    ];

    if (ico == 1 && event.target.icoAmount.value > 0) {
      transfers = transfers.concat({
        burn: parseInt(event.target.icoAmount.value),
        scid: event.target.icoToken.value,
      });
    }

    const txData = new Object({
      scid: state.scid_fundraisers,
      ringsize: 2,
      transfers: transfers,
      signer: state.userAddress,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'NF',
        },

        {
          name: 'Goal',
          datatype: 'U',
          value: parseInt(event.target.goal.value) * 100000,
        },
        {
          name: 'Deadline',
          datatype: 'U',
          value: deadline,
        },
        {
          name: 'Recipient',
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
          name: 'icoToken',
          datatype: 'S',
          value: event.target.icoToken.value,
        },
        {
          name: 'image',
          datatype: 'S',
          value: event.target.fundPhoto.value,
        },
        {
          name: 'tagline',
          datatype: 'S',
          value: event.target.tagline.value,
        },

        {
          name: 'desc',
          datatype: 'S',
          value: formData.bio,
        },
        {
          name: 'WithdrawlType',
          datatype: 'U',
          value: oao,
        },
        {
          name: 'ICO',
          datatype: 'U',
          value: ico,
        },
      ],
    });
    const gas_rpc = [
      {
        name: 'SC_ACTION',
        datatype: 'U',
        value: 0,
      },
      {
        name: 'SC_ID',
        datatype: 'H',
        value: state.scid_fundraisers,
      },
    ].concat(txData.sc_rpc);
    txData.gas_rpc = gas_rpc;

    let fees = await getGasEstimate(txData);
    txData.fees = fees;

    sendTransaction(txData);
  });

  const SetMetadata = React.useCallback(async (event) => {
    event.preventDefault();

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
      fees: fees,
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
          value: formData.bio,
        },
      ],
    });
    const gas_rpc = [
      {
        name: 'SC_ACTION',
        datatype: 'U',
        value: 0,
      },
      {
        name: 'SC_ID',
        datatype: 'H',
        value: state.scid_fundraisers,
      },
    ].concat(txData.sc_rpc);

    txData.gas_rpc = gas_rpc;

    let fees = await getGasEstimate(txData);
    txData.fees = fees;
    sendTransaction(txData);
  });

  return (
    <div className="function">
      {searchParams.get('status') == 'success' ? (
        <Success />
      ) : (
        <div className="profile">
          <h3>Launch a Fundraiser</h3>

          <form onSubmit={DoIt}>
            <input placeholder="Name" id="fundName" type="text" />

            <p>Deadline</p>
            <input type="date" id="deadline" name="deadline"></input>

            <input placeholder="Goal" id="goal" type="text" />
            <input
              placeholder="Recipient Address or Withdrawl Token"
              id="address"
              type="text"
            />

            <input placeholder="Image URL" id="fundPhoto" type="text" />
            <input placeholder="Tagline" id="tagline" type="text" />

            <RichTextEditor
              editorHtml={editorHtml}
              setEditorHtml={setEditorHtml}
              bio={formData.bio}
              handleChange={handleChange}
              formData={formData}
              setFormData={setFormData}
            />

            <div>
              <input type="checkbox" id="OAO" />
              <label htmlFor="OAO">
                Check if using withdrawl token in place of address
              </label>
            </div>

            <div>
              <input type="checkbox" id="ICO" />
              <label htmlFor="ICO">Check to reward funders with token</label>
            </div>
            <input type="text" placeholder="ICO token SCID" id="icoToken" />
            <input
              type="number"
              placeholder="ICO token Amount"
              id="icoAmount"
            />

            <button type={'submit'}>Launch</button>
          </form>
        </div>
      )}
    </div>
  );
}
