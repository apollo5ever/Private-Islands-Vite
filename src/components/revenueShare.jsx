import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import { useSendTransaction } from '../useSendTransaction';
import { useGetSC } from '../useGetSC';

export default function RevenueShare() {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = React.useContext(LoginContext);
  const [sendTransaction] = useSendTransaction();
  const [getSC] = useGetSC();
  const [registryTreasury, setRegistryTreasury] = React.useState(0);
  const [bountyTreasury, setBountyTreasury] = React.useState(0);
  const [fundTreasury, setFundTreasury] = React.useState(0);
  const [subTreasury, setSubTreasury] = React.useState(0);
  const [registryShares, setRegistryShares] = React.useState(0);
  const [bountyShares, setBountyShares] = React.useState(0);
  const [fundShares, setFundShares] = React.useState(0);
  const [subShares, setSubShares] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      let registry = await getSC(state.scid_registry);
      // console.log("registry ", registry.stringkeys.T_DERO);
      setRegistryTreasury(registry.stringkeys.T_DERO);
      if (
        registry.stringkeys[
          `${state.walletList[state.activeWallet].address}_SHARES`
        ]
      ) {
        setRegistryShares(
          registry.stringkeys[
            `${state.walletList[state.activeWallet].address}_SHARES`
          ]
        );
      } else {
        setRegistryShares(0);
      }
      let bounty = await getSC(state.scid_bounties);
      console.log('bounty ', bounty.stringkeys.T_DERO);
      setBountyTreasury(bounty.stringkeys.T_DERO);
      if (
        bounty.stringkeys[
          `${state.walletList[state.activeWallet].address}_SHARES`
        ]
      ) {
        setBountyShares(
          bounty.stringkeys[
            `${state.walletList[state.activeWallet].address}_SHARES`
          ]
        );
      } else {
        setBountyShares(0);
      }

      let fund = await getSC(state.scid_fundraisers);
      console.log('fund ', fund.stringkeys.T_DERO);
      setFundTreasury(fund.stringkeys.T_DERO);
      if (
        fund.stringkeys[
          `${state.walletList[state.activeWallet].address}_SHARES`
        ]
      ) {
        setFundShares(
          fund.stringkeys[
            `${state.walletList[state.activeWallet].address}_SHARES`
          ]
        );
      } else {
        setFundShares(0);
      }

      let sub = await getSC(state.scid_subscriptions);
      console.log('sub ', sub.stringkeys.T_DERO);
      setSubTreasury(sub.stringkeys.T_DERO);
      if (
        sub.stringkeys[`${state.walletList[state.activeWallet].address}_SHARES`]
      ) {
        setSubShares(
          sub.stringkeys[
            `${state.walletList[state.activeWallet].address}_SHARES`
          ]
        );
      } else {
        setSubShares(0);
      }
    }
    fetchData();
  }, [
    state.activeWallet,
    state.walletList,
    state.walletList[state.activeWallet].address,
  ]);

  const BountyBuyShares = React.useCallback(async (e) => {
    e.preventDefault();
    console.log('bounty selected');

    const data = new Object({
      scid: state.scid_bounties,
      ringsize: 2,
      transfers: [
        {
          destination: state.randomAddress,
          scid: 'a9a977297ed6ed087861bfa117e6fbbd603c2051b0cc1b0d704bc764011aabb6',
          burn: e.target.shares.value * 10000,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'D',
        },
      ],
    });
    sendTransaction(data);
  });

  const BountySellShares = React.useCallback(async (e) => {
    e.preventDefault();

    const data = new Object({
      scid: state.scid_bounties,
      ringsize: 2,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'SS',
        },
        {
          name: 'shares',
          datatype: 'U',
          value: parseInt(e.target.shares.value),
        },
      ],
    });
    sendTransaction(data);
  });

  const BountyWithdraw = React.useCallback(async (e) => {
    e.preventDefault();

    const data = new Object({
      scid: state.scid_bounties,
      ringsize: 2,
      sc_rpc: [
        {
          name: "entrypoint",
          datatype: "S",
          value: "W",
        },
      ],
    });
    sendTransaction(data);
  });
  const FundBuyShares = React.useCallback(async (e) => {
    e.preventDefault();
    console.log('bounty selected');

    const data = new Object({
      scid: state.scid_fundraisers,
      ringsize: 2,
      transfers: [
        {
          destination: state.randomAddress,
          scid: 'a9a977297ed6ed087861bfa117e6fbbd603c2051b0cc1b0d704bc764011aabb6',
          burn: e.target.shares.value * 10000,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'D',
        },
      ],
    });
    sendTransaction(data);
  });

  const FundSellShares = React.useCallback(async (e) => {
    e.preventDefault();

    const data = new Object({
      scid: state.scid_fundraisers,
      ringsize: 2,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'SS',
        },
        {
          name: 'shares',
          datatype: 'U',
          value: parseInt(e.target.shares.value),
        },
      ],
    });
    sendTransaction(data);
  });

  const FundWithdraw = React.useCallback(async (e) => {
    e.preventDefault();

    const data = new Object({
      scid: state.scid_fundraisers,
      ringsize: 2,
      sc_rpc: [
        {
          name: "entrypoint",
          datatype: "S",
          value: "W",
        },
      ],
    });
    sendTransaction(data);
  });

  const SubBuyShares = React.useCallback(async (e) => {
    e.preventDefault();
    console.log('bounty selected');

    const data = new Object({
      scid: state.scid_subscriptions,
      ringsize: 2,
      transfers: [
        {
          destination: state.randomAddress,
          scid: 'a9a977297ed6ed087861bfa117e6fbbd603c2051b0cc1b0d704bc764011aabb6',
          burn: e.target.shares.value * 10000,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'D',
        },
      ],
    });
    sendTransaction(data);
  });

  const SubSellShares = React.useCallback(async (e) => {
    e.preventDefault();

    const data = new Object({
      scid: state.scid_subscriptions,
      ringsize: 2,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'SS',
        },
        {
          name: 'shares',
          datatype: 'U',
          value: parseInt(e.target.shares.value),
        },
      ],
    });
    sendTransaction(data);
  });

  const SubWithdraw = React.useCallback(async (e) => {
    e.preventDefault();

    const data = new Object({
      scid: state.scid_subscriptions,
      ringsize: 2,
      sc_rpc: [
        {
          name: "entrypoint",
          datatype: "S",
          value: "W",
        },
      ],
    });
    sendTransaction(data);
  });

  const RegistryBuyShares = React.useCallback(async (e) => {
    e.preventDefault();
    console.log('bounty selected');

    const data = new Object({
      scid: state.scid_registry,
      ringsize: 2,
      transfers: [
        {
          destination: state.randomAddress,
          scid: 'a9a977297ed6ed087861bfa117e6fbbd603c2051b0cc1b0d704bc764011aabb6',
          burn: e.target.shares.value * 10000,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'D',
        },
      ],
    });
    sendTransaction(data);
  });

  const RegistrySellShares = React.useCallback(async (e) => {
    e.preventDefault();
    console.log('bounty selected');

    const data = new Object({
      scid: state.scid_registry,
      ringsize: 2,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'SS',
        },
        {
          name: 'shares',
          datatype: 'U',
          value: parseInt(e.target.shares.value),
        },
      ],
    });
    sendTransaction(data);
  });

  const RegistryWithdraw = React.useCallback(async (e) => {
    e.preventDefault();

    const data = new Object({
      scid: state.scid_registry,
      ringsize: 2,
      sc_rpc: [
        {
          name: "entrypoint",
          datatype: "S",
          value: "W",
        },
      ],
    });
    sendTransaction(data);
  });

  return (
    <div className="function">
      <h1>Private Islands Revenue Share</h1>
      <p>
        Deposit your coco to receive shares in the Private Islands Treasury. 10k
        coco = 1 share. The treasury is split across 4 contracts:
        <ul>
          <li>
            The registry contract which collects one-time registration fees as
            well as ratings fees.
          </li>
          <li>The Bounties contract which collects a 5% fee from bounties.</li>
          <li>
            The Fundraisers contract which collects a 10% fee from fundraisers.
          </li>
          <li>
            The Subscriptions contract which collects a 10% fee from
            subscriptions.
          </li>
        </ul>{' '}
      </p>
      <div className="flex flex-wrap justify-between">
        <div className="share-card">
          <h1>Registry</h1>
          <h3>Treasury: {registryTreasury / 100000} Dero</h3>
          <h3>Your shares: {registryShares}</h3>
          <form onSubmit={RegistryBuyShares}>
            <input type="number" placeholder="shares" id="shares" />
            <button type={'submit'}>Buy Shares</button>
          </form>
          <form onSubmit={RegistrySellShares}>
            <input type="number" placeholder="shares" id="shares" />
            <button type={'submit'}>Sell Shares</button>
          </form>
          <form onSubmit={RegistryWithdraw}>
            <button type={"submit"}>Withdraw</button>
          </form>
        </div>
        <div className="share-card">
          <h1>Bounties</h1>
          <h3>Treasury: {bountyTreasury / 100000} Dero</h3>
          <h3>Your shares: {bountyShares}</h3>
          <form onSubmit={BountyBuyShares}>
            <input type="number" placeholder="shares" id="shares" />
            <button type={'submit'}>Buy Shares</button>
          </form>
          <form onSubmit={BountySellShares}>
            <input type="number" placeholder="shares" id="shares" />
            <button type={'submit'}>Sell Shares</button>
          </form>
          <form onSubmit={BountyWithdraw}>
            <button type={"submit"}>Withdraw</button>
          </form>
        </div>
        <div className="share-card">
          <h1>Fundraisers</h1>
          <h3>Treasury: {fundTreasury / 100000} Dero</h3>
          <h3>Your shares: {fundShares}</h3>
          <form onSubmit={FundBuyShares}>
            <input type="number" placeholder="shares" id="shares" />
            <button type={'submit'}>Buy Shares</button>
          </form>
          <form onSubmit={FundSellShares}>
            <input type="number" placeholder="shares" id="shares" />
            <button type={'submit'}>Sell Shares</button>
          </form>
          <form onSubmit={FundWithdraw}>
            <button type={"submit"}>Withdraw</button>
          </form>
        </div>
        <div className="share-card">
          <h1>Subscriptions</h1>
          <h3>Treasury: {subTreasury / 100000} Dero</h3>
          <h3>Your shares: {subShares}</h3>
          <form onSubmit={SubBuyShares}>
            <input type="number" placeholder="shares" id="shares" />
            <button type={'submit'}>Buy Shares</button>
          </form>
          <form onSubmit={SubSellShares}>
            <input type="number" placeholder="shares" id="shares" />
            <button type={'submit'}>Sell Shares</button>
          </form>
          <form onSubmit={SubWithdraw}>
            <button type={"submit"}>Withdraw</button>
          </form>
        </div>
      </div>
    </div>
  );
}
