import React from 'react';
import '../App.css';
import Subscribe from './subscribe';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { useGetSubscriptions } from '@/components/hooks/useGetSubscriptions.js';

export default function BottleList({ islands, state }) {
  const { subscriptions } = useGetSubscriptions(islands);

  return (
    <>
      <FlexBoxColumn className="my-3 flex justify-center">
        <div className="text-xl font-semibold text-info">
          Island Subscriptions
        </div>
        {subscriptions.map((key) => (
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
        ))}
      </FlexBoxColumn>
    </>
  );
}
