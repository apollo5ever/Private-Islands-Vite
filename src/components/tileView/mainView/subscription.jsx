import React from 'react';
import { useSendTransaction } from '@/useSendTransaction.jsx';
import { useGetSC } from '@/useGetSC.jsx';
import { Button } from '@/components/common/Button.jsx';
import { useTheme } from '@/components/hooks/useTheme.js';
import { Divider } from '@/components/common/Divider.jsx';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { LoginContext } from '@/LoginContext.jsx';
import { Helpers } from '@/utils/helpers.js';

// TODO MST needs a card background
// TODO MST check out conditional render items to see how they look
// TODO MST -- for sidebar, with multiple subscriptions, list them & button will
//             set as primary tile
//          -- If not enough for sidebar, maybe change to a floating window with the nav content
export const Subscription = ({ subData }) => {
  console.log('SUB DATA', subData);
  const [state, setState] = React.useContext(LoginContext);
  const [sendTransaction] = useSendTransaction();
  const [availability, setAvailability] = React.useState('');
  const [subbed, setSubbed] = React.useState(false);
  const [expiry, setExpiry] = React.useState(null);
  const [integrated, setIntegrated] = React.useState(false);
  const [integratedAddress, setIntegratedAddress] = React.useState('');
  const [getSC] = useGetSC();
  const { proseClass } = useTheme();

  const checkAvailability = React.useCallback(async () => {
    const res = await getSC(state.scid_subscriptions);
    const obj = res.stringkeys;
    let search = subData.profile + subData.Index + '_Av';
    let avail = obj[search];
    console.log('avail', avail);
    setAvailability(avail);
  });

  const getIntegrated = async (e) => {
    e.preventDefault();
    console.log('integrate');
    const response = await fetch(
      `/api/islands/integrate/${e.target.address.value}/${
        subData.SCID + subData.Index
      }`
    );
    console.log(response);
    const body = await response.json();
    console.log(body);
    setIntegratedAddress(body.address);
  };

  const checkSubbed = React.useCallback(async () => {
    const res0 = await getSC(state.scid_subscriptions);
    var scData = res0.stringkeys;
    var supporterSearch = `${state.walletList[state.activeWallet].address}_${
      subData.SCID + subData.Index
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

    const TierHash = subData.SCID + subData.Index.toString();
    const SupporterHash = state.walletList[state.activeWallet].address;
    const data = new Object({
      scid: state.scid_subscriptions,
      ringsize: 2,
      transfers: [
        {
          burn: parseInt(event.target.amount.value * 100000),
          destination: state.randomAddress,
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

    const TierHash = subData.SCID + subData.Index.toString();
    const SupporterHash = state.walletList[state.activeWallet].address;
    const data = new Object({
      scid: state.scid_subscriptions,
      ringsize: 2,
      transfers: [
        {
          burn: parseInt(event.target.amount.value * 100000),
          destination: state.randomAddress,
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
  }, [subData]);

  return (
    <FlexBoxRow
      className={`${proseClass} align-center card card-side relative my-3 max-w-xs flex-col whitespace-normal bg-secondary font-fell text-xl shadow-xl md:flex-row`}
    >
      <img
        src={Helpers.getTileImage(subData)}
        className="rounded-lg object-cover object-center"
      />
      <FlexBoxColumn justify="start" align="start" className="ml-2 h-full px-2">
        <h3>{Helpers.getTileName(subData)}</h3>
        <p>
          {subData.Amount / 100000} Dero per{' '}
          {Math.round(subData.Interval / (60 * 60 * 24))} days
        </p>
        <p>{Helpers.getTileTagline(subData)}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: Helpers.getTileDescription(subData),
          }}
        />

        <p>Available Spots: {subData.Available}</p>
        {subbed ? (
          <form onSubmit={topUp}>
            {expiry === 0 ? (
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
      </FlexBoxColumn>
    </FlexBoxRow>
  );
};
