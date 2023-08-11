import React from 'react';
import '../App.css';
import Subscribe from './subscribe';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';

export default function BottleList({ islands, state }) {
  const [tiers, setTiers] = React.useState([]);

  const getTiers = async () => {
    var tierList = [];

    for (var i = 0; i < islands.length; i++) {
      tierList = tierList.concat(islands[i].tiers);
    }
    console.log('BOTTLELIST', tierList);
    setTiers(
      tierList.map((key) => (
        <Subscribe
          profile={key.scid}
          image={key.image}
          name={key.name}
          index={key.index}
          tagline={key.tagline}
          description={key.description}
          amount={key.amount}
          interval={key.interval}
          userAddress={state.walletList[state.activeWallet].address}
          dba={state.deroBridgeApiRef}
          scid={state.scid_subscriptions}
          randomAddress={state.randomAddress}
          available={key.available}
        />
      ))
    );
  };

  React.useEffect(() => {
    getTiers();
  }, [islands, state.walletList, state.randomAddress, state.activeWallet]);

  return (
    <>
      <FlexBoxColumn className="my-3 flex justify-center">
        <div className="text-xl font-semibold text-info">
          Island Subscriptions
        </div>
        {tiers.map((x) => (
          <div className="function">{x}</div>
        ))}
      </FlexBoxColumn>
    </>
  );
}
