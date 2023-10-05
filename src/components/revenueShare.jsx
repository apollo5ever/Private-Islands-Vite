import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import { useSendTransaction } from './hooks/useSendTransaction';
import { useGetSC } from './hooks/useGetSC';
import { Button } from '@/components/common/Button.jsx';

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
          value: bountyShares,
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
          name: 'entrypoint',
          datatype: 'S',
          value: 'W',
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
          value: fundShares,
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
          name: 'entrypoint',
          datatype: 'S',
          value: 'W',
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
          value: subShares,
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
          name: 'entrypoint',
          datatype: 'S',
          value: 'W',
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
          value: registryShares,
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
          name: 'entrypoint',
          datatype: 'S',
          value: 'W',
        },
      ],
    });
    sendTransaction(data);
  });

  return (
    <div className="function">
      <h1>Redeem Your COCO from deprecated system</h1>
      <p>
        We are migrating to a better and simpler COCO LOTTO system. Please
        redeem your COCO from the old system.
      </p>
      <div className="flex flex-wrap justify-between">
        {registryShares ? (
          <div className="share-card">
            <h1>Registry</h1>
            <h3>Your Locked COCO: {registryShares * 10000}</h3>

            <form onSubmit={RegistrySellShares}>
              <Button size="small" type={'submit'}>
                Redeem COCO
              </Button>
            </form>
          </div>
        ) : (
          ''
        )}
        {bountyShares ? (
          <div className="share-card">
            <h1>Bounties</h1>

            <h3>Your Locked COCO: {bountyShares * 10000}</h3>

            <form onSubmit={BountySellShares}>
              <Button size="small" type={'submit'}>
                Redeem COCO
              </Button>
            </form>
          </div>
        ) : (
          ''
        )}
        {fundShares ? (
          <div className="share-card">
            <h1>Fundraisers</h1>

            <h3>Your Locked COCO: {fundShares * 10000}</h3>

            <form onSubmit={FundSellShares}>
              <Button size="small" type={'submit'}>
                Redeem COCO
              </Button>
            </form>
          </div>
        ) : (
          ''
        )}
        {subShares ? (
          <div className="share-card">
            <h1>Subscriptions</h1>

            <h3>Your Locked COCO: {subShares * 10000}</h3>

            <form onSubmit={SubSellShares}>
              <Button size="small" type={'submit'}>
                Redeem COCO
              </Button>
            </form>
          </div>
        ) : (
          ''
        )}
      </div>
      <h1>Bounty Migration</h1>
    </div>
  );
}
