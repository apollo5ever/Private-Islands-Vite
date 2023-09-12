import React from 'react';
import { useSendTransaction } from '../useSendTransaction';
import { useGetSC } from '../useGetSC';
import { Button } from '@/components/common/Button.jsx';
import { useTheme } from '@/components/hooks/useTheme.js';
import { Divider } from '@/components/common/Divider.jsx';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';

export default function Subscribe(props) {
  const [sendTransaction] = useSendTransaction();
  const [availability, setAvailability] = React.useState('');
  const [subbed, setSubbed] = React.useState(false);
  const [expiry, setExpiry] = React.useState(null);
  const [integrated, setIntegrated] = React.useState(false);
  const [integratedAddress, setIntegratedAddress] = React.useState('');
  const [getSC] = useGetSC();
  const { proseClass } = useTheme();

  const checkAvailability = React.useCallback(async () => {
    const res = await getSC(props.scid);
    const obj = res.stringkeys;
    let search = props.profile + props.index + '_Av';
    let avail = obj[search];
    console.log('avail', avail);
    setAvailability(avail);
  });

  const getIntegrated = async (e) => {
    e.preventDefault();
    console.log('integrate');
    const response = await fetch(
      `/api/islands/integrate/${e.target.address.value}/${
        props.profile + props.index
      }`
    );
    console.log(response);
    const body = await response.json();
    console.log(body);
    setIntegratedAddress(body.address);
  };

  const checkSubbed = React.useCallback(async () => {
    const res0 = await getSC(props.scid);
    var scData = res0.stringkeys;
    var supporterSearch = `${props.userAddress}_${
      props.profile + props.index
    }_E`;
    var expiry = scData[supporterSearch];
    if (expiry) {
      if (expiry > new Date().getTime() / 1000) {
        setSubbed(true);
        setExpiry(
          Math.round((expiry - new Date().getTime() / 1000) / (60 * 60 * 24))
        );
      } else {
        setSubbed(true);
        setExpiry(0);
      }
    } else {
      setSubbed(false);
    }
  });

  const [error, setError] = React.useState('');

  const topUp = React.useCallback(async (event) => {
    event.preventDefault();
    setError('');

    const TierHash = props.profile + props.index.toString();
    const SupporterHash = props.userAddress;
    const data = new Object({
      scid: props.scid,
      ringsize: 2,
      transfers: [
        {
          burn: parseInt(event.target.amount.value * 100000),
          destination: props.randomAddress,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'TU',
        },
        {
          name: 'T',
          datatype: 'S',
          value: TierHash,
        },
        {
          name: 'S',
          datatype: 'S',
          value: SupporterHash,
        },
      ],
    });
    sendTransaction(data);
  });

  const subscribe = React.useCallback(async (event) => {
    event.preventDefault();
    setError('');

    const TierHash = props.profile + props.index.toString();
    const SupporterHash = props.userAddress;
    const data = new Object({
      scid: props.scid,
      ringsize: 2,
      transfers: [
        {
          burn: parseInt(event.target.amount.value * 100000),
          destination: props.randomAddress,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'AS',
        },
        {
          name: 'T',
          datatype: 'S',
          value: TierHash,
        },
        {
          name: 'S',
          datatype: 'S',
          value: SupporterHash,
        },
      ],
    });
    sendTransaction(data);

    setTimeout(() => {
      checkAvailability();
    }, 10000);
  });
  React.useEffect(() => {
    console.log('executed only once!');
    //checkAvailability();
    checkSubbed();
  }, [props]);

  return (
    <div className={proseClass}>
      <img src={props.image} className="rounded-lg" />
      <h3>{props.name}</h3>
      <p>
        {props.amount / 100000} Dero per{' '}
        {Math.round(props.interval / (60 * 60 * 24))} days
      </p>
      <p>{props.tagline}</p>
      <p dangerouslySetInnerHTML={{ __html: props.description }} />

      <p>Available Spots: {props.available}</p>
      {subbed ? (
        <form onSubmit={topUp}>
          {expiry == 0 ? (
            <p>Your subscription has expired.</p>
          ) : (
            <p>
              You are subscribed to this tier. Your subscription ends in{' '}
              {expiry} days.
            </p>
          )}
          <input
            placeholder="Dero Amount"
            id="amount"
            type="text"
            className="input-bordered input w-full max-w-xs"
          />
          <Button size="small" type={'submit'}>
            Top Up
          </Button>
        </form>
      ) : (
        <form onSubmit={subscribe}>
          <FlexBoxRow justify="stretch">
            <input
              placeholder="Dero Amount"
              id="amount"
              type="text"
              className="input-bordered input w-full max-w-xs"
            />
            <Button size="small" type={'submit'}>
              Subscribe
            </Button>
          </FlexBoxRow>
        </form>
      )}
      <div className="error"> {error}</div>
      <div
        onClick={() => setIntegrated(!integrated)}
        className="cursor-pointer pt-6 text-sm"
      >
        Get Integrated Address
      </div>
      {integrated ? (
        <form onSubmit={getIntegrated}>
          <FlexBoxRow justify="stretch">
            <input
              id="address"
              type="text"
              placeholder="Subscriber's Dero Address"
              className="input-bordered input w-full max-w-xs"
            />
            <Button size="small" type={'submit'}>
              Get
            </Button>
          </FlexBoxRow>
        </form>
      ) : (
        ''
      )}
      {integratedAddress}
      <Divider />
    </div>
  );
}
