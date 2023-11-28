import React from 'react';
import { LoginContext } from '../LoginContext';
import { useSendTransaction } from './hooks/useSendTransaction';
import { useGetSC } from './hooks/useGetSC';
import { Button } from '@/components/common/Button.jsx';
import bgImage from '@/assets/parallax/BigIsland.png';
import { FullPageContainer } from '@/components/common/FullPageContainer.jsx';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';

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
      let registry = await getSC(
        'a5daa9a02a81a762c83f3d4ce4592310140586badb4e988431819f47657559f7',
        false,
        true
      );
      // console.log("registry ", registry.stringkeys.T_DERO);
      setRegistryTreasury(registry.stringkeys.T_DERO);
      if (registry.stringkeys[`${state.userAddress}_SHARES`]) {
        setRegistryShares(registry.stringkeys[`${state.userAddress}_SHARES`]);
      } else {
        setRegistryShares(0);
      }
      let bounty = await getSC(state.scid_bounties, false, true);
      console.log('bounty ', bounty.stringkeys.T_DERO);
      setBountyTreasury(bounty.stringkeys.T_DERO);
      if (bounty.stringkeys[`${state.userAddress}_SHARES`]) {
        setBountyShares(bounty.stringkeys[`${state.userAddress}_SHARES`]);
      } else {
        setBountyShares(0);
      }

      let fund = await getSC(state.scid_fundraisers, false, true);
      console.log('fund ', fund.stringkeys.T_DERO);
      setFundTreasury(fund.stringkeys.T_DERO);
      if (fund.stringkeys[`${state.userAddress}_SHARES`]) {
        setFundShares(fund.stringkeys[`${state.userAddress}_SHARES`]);
      } else {
        setFundShares(0);
      }

      let sub = await getSC(state.scid_subscriptions, false, true);
      console.log('sub ', sub.stringkeys.T_DERO);
      setSubTreasury(sub.stringkeys.T_DERO);
      if (sub.stringkeys[`${state.userAddress}_SHARES`]) {
        setSubShares(sub.stringkeys[`${state.userAddress}_SHARES`]);
      } else {
        setSubShares(0);
      }
    }
    fetchData();
  }, [state.walletMode, state.userAddress]);

  const checkOldFunds = async () => {
    console.log('check old funds');
    const migrateData = {
      ringsize: 2,
      scid: 'ce99faba61d984bd4163b31dd4da02c5bff32445aaaa6fc70f14fe0d257a15c3',
      sc_rpc: [
        {
          name: 'entrypoint',
          value: 'Migrate',
          datatype: 'S',
        },
      ],
    };
    await sendTransaction(migrateData);
    //  const oldSCdata = await getSC("ce99faba61d984bd4163b31dd4da02c5bff32445aaaa6fc70f14fe0d257a15c3",false,true)
  };

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
      scid: 'a5daa9a02a81a762c83f3d4ce4592310140586badb4e988431819f47657559f7',
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
    <FullPageContainer bgImage={bgImage} rightPct={-75}>
      <div className="mb-6 text-4xl font-bold">COCO Lotto - Update</div>
      <div class="text-2xl">Redeem Your COCO from deprecated system</div>
      <div className="text-xl">
        We are migrating to a better and simpler COCO LOTTO system. Please
        redeem your COCO from the old system.
      </div>
      <div className="flex flex-col justify-between">
        {registryShares ? (
          <FlexBoxColumn className="mx-auto mb-2 rounded-2xl border border-accent p-4">
            <div className="text-2xl">Registry</div>
            <div className="text-xl">Your Locked COCO</div>
            <div className="text-4xl">{registryShares * 10000}</div>

            <form onSubmit={RegistrySellShares}>
              <Button size="small" type={'submit'}>
                Redeem COCO
              </Button>
            </form>
          </FlexBoxColumn>
        ) : (
          ''
        )}
        {bountyShares ? (
          <FlexBoxColumn className="mx-auto mb-2 rounded-2xl border border-accent p-4">
            <div className="flex text-2xl">Bounties</div>

            <div className="text-xl">Your Locked COCO</div>
            <div className="text-4xl">{bountyShares * 10000}</div>

            <form onSubmit={BountySellShares}>
              <Button size="small" type={'submit'}>
                Redeem COCO
              </Button>
            </form>
          </FlexBoxColumn>
        ) : (
          ''
        )}
        {fundShares ? (
          <FlexBoxColumn className="mx-auto mb-2 rounded-2xl border border-accent p-4">
            <div className="text-2xl">Fundraisers</div>

            <div className="text-xl">Your Locked COCO</div>
            <div className="text-4xl">{fundShares * 10000}</div>

            <form onSubmit={FundSellShares}>
              <Button size="small" type={'submit'}>
                Redeem COCO
              </Button>
            </form>
          </FlexBoxColumn>
        ) : (
          ''
        )}
        {subShares ? (
          <FlexBoxColumn className="mx-auto mb-2 rounded-2xl border border-accent p-4">
            <div className="flex text-2xl">Subscriptions</div>

            <div className="text-xl">Your Locked COCO</div>
            <div className="text-4xl">{subShares * 10000}</div>

            <form onSubmit={SubSellShares}>
              <Button size="small" type={'submit'}>
                Redeem COCO
              </Button>
            </form>
          </FlexBoxColumn>
        ) : (
          ''
        )}
      </div>

      <div className="mt-3 text-xl">
        <div className="mb-6 text-4xl font-bold">
          If You Believe You Have Unclaimed Funds From Old Contracts
        </div>

        <p>Click here then DM apollo</p>
        <Button size="small" handleClick={checkOldFunds}>
          Check
        </Button>
      </div>
    </FullPageContainer>
  );
}
