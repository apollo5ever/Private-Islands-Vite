import React from 'react';
import '../App.css';
import Subscribe from './subscribe';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';

export default function BottleList({ islands, state }) {
  const [tiers, setTiers] = React.useState([]);

  const getTiers = async () => {
    var tierList = [];

    for (var i = 0; i < islands.length; i++) {
      if (!islands[i].Tiers) continue;
      tierList = tierList.concat(islands[i].Tiers);
    }
    console.log('BOTTLELIST', tierList);
    setTiers(
      tierList.map((key) => (
        <Subscribe
          profile={key.SCID}
          image={key.Images[key.Images.length - 1]}
          name={key.Names[key.Names.length - 1]}
          index={key.Index}
          tagline={key.Taglines[key.Taglines.length - 1]}
          description={key.Descriptions[key.Descriptions.length - 1]}
          amount={key.Amount}
          interval={key.Interval}
          userAddress={state.walletList[state.activeWallet].address}
          dba={state.deroBridgeApiRef}
          scid={state.scid_subscriptions}
          randomAddress={state.randomAddress}
          available={key.Available}
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
