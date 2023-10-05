import DeroBridgeApi from 'dero-rpc-bridge-api';
import React from 'react';
import ReactDOM from 'react-dom';
import to from 'await-to-js';
import sha256 from 'crypto-js/sha256';
import { useParams, useSearchParams } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import Success from './success';
import { useSendTransaction } from './hooks/useSendTransaction';
import { useGetSC } from './hooks/useGetSC';

export default function ModifyTier() {
  const [sendTransaction] = useSendTransaction();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const [state, setState] = React.useContext(LoginContext);
  const [tierObj, setTierObj] = React.useState({ name: null });
  const [custom, setCustom] = React.useState(false);
  const [getSC] = useGetSC();
  const [island, setIsland] = React.useState(null);

  function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  const getTier = React.useCallback(async () => {
    if (!state.myIslands) return;
    let island = state.myIslands.filter((x) => x.Name == params.island);
    setIsland(island[0]);
    if (island[0].Tiers[params.tier]) {
      setTierObj(island[0].Tiers[params.tier]);
    }
  });

  React.useEffect(() => {
    getTier();
  }, [state.myIslands]);

  const handleChange = (e) => {
    if (e.target.value === 'custom') setCustom(true);
    else {
      setCustom(false);
    }
  };

  const DoIt = React.useCallback(async (event) => {
    event.preventDefault();

    const transfers = [
      {
        destination: state.randomAddress,
        scid: island.SCID,
        burn: 1,
      },
    ];

    var interval = 0;
    console.log(event.target.wl.value);
    if (custom) interval = event.target.custom_interval.value;
    else {
      interval = event.target.interval.value;
    }

    if (event.target.wl.checked) {
      var whitelisted = 1;
    } else {
      var whitelisted = 0;
    }

    const txData = new Object({
      scid: state.scid_subscriptions,
      ringsize: 2,
      transfers: transfers,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'AOMT',
        },
        {
          name: 'Am',
          datatype: 'U',
          value: parseInt(event.target.amount.value * 100000),
        },
        {
          name: 'I',
          datatype: 'U',
          value: parseInt(interval),
        },
        {
          name: 'L',
          datatype: 'U',
          value: parseInt(event.target.limit.value),
        },
        {
          name: 'Ad',
          datatype: 'S',
          value: event.target.address.value,
        },
        {
          name: 'H',
          datatype: 'S',
          value: island.SCID,
        },
        {
          name: 'i',
          datatype: 'U',
          value: parseInt(params.tier),
        },
        {
          name: 'W',
          datatype: 'U',
          value: whitelisted,
        },
        {
          name: 'name',
          datatype: 'S',
          value: event.target.tierName.value,
        },
      ],
    });
    sendTransaction(txData);

    setSearchParams({ status: 'metadata', name: event.target.tierName.value });
  });

  const SetMetadata = React.useCallback(async (event) => {
    event.preventDefault();

    let fee;
    if (event.target.description.value.length > 360) fee = 10000;

    const transfers = [
      {
        destination: state.randomAddress,
        scid: island.SCID,
        burn: 1,
      },
    ];

    const txData = new Object({
      scid: state.scid_subscriptions,
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
          value: island.SCID,
        },
        {
          name: 'i',
          datatype: 'U',
          value: parseInt(params.tier),
        },
        {
          name: 'Name',
          datatype: 'S',
          value: event.target.tierName.value,
        },
        {
          name: 'Image',
          datatype: 'S',
          value: event.target.image.value,
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
            placeholder="Tier Name"
            id="tierName"
            defaultValue={
              tierObj.Names && tierObj.Names[tierObj.Names.length - 1]
            }
            type="text"
          />
          <input
            placeholder="image url"
            id="image"
            defaultValue={
              tierObj.Images && tierObj.Images[tierObj.Images.length - 1]
            }
            type="text"
          />
          <input
            placeholder="Tagline"
            id="tagline"
            type="text"
            defaultValue={
              tierObj.Taglines && tierObj.Taglines[tierObj.Taglines.length - 1]
            }
          />
          <textarea
            placeholder="Description"
            rows="44"
            cols="80"
            id="description"
            defaultValue={
              tierObj.Descriptions &&
              tierObj.Descriptions[tierObj.Descriptions.length - 1]
            }
          />
          {custom ? (
            <input
              placeholder="Subscription Interval in Seconds"
              id="custom-interval"
              type="text"
            />
          ) : (
            ''
          )}
          <button type={'submit'}>Submit</button>
        </form>
      ) : searchParams.get('status') == 'success' ? (
        <Success />
      ) : (
        <>
          <h3>Modify Your Subscription Tier</h3>

          <form onSubmit={DoIt}>
            <input
              placeholder="Tier Name"
              id="tierName"
              defaultValue={
                tierObj.Names && tierObj.Names[tierObj.Names.length - 1]
              }
              type="text"
            />
            <input
              placeholder="address"
              id="address"
              type="text"
              defaultValue={tierObj.Address}
            />
            <input
              placeholder="max number of subscribers"
              id="limit"
              defaultValue={tierObj.Available}
              type="text"
            />
            <p>Can anybody subscribe or will there be a whitelist?</p>
            <p>
              whitelisted
              <input id="wl" type="checkbox" />
            </p>
            <input
              placeholder="Amount(Dero)"
              id="amount"
              defaultValue={tierObj.Amount}
              type="text"
            />
            <select onChange={handleChange} id="interval">
              <option value="2629800">Monthly</option>
              <option value="7889400">Quarterly</option>
              <option value="31557600">Anual</option>
              <option value="custom">Custom</option>
            </select>
            {custom ? (
              <input
                placeholder="Subscription Interval in Seconds"
                id="custom_interval"
                type="text"
              />
            ) : (
              ''
            )}
            <button type={'submit'}>Submit</button>
          </form>
        </>
      )}
    </div>
  );
}
