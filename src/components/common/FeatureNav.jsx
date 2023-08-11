import React from 'react';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';

/*
 This requires the Parent rendering the component to expect one of the following values for 'filter':
  - treasure
  - smokesignals
  - mib
 */

export const FeatureNav = (props) => {
  const handleClick = (filter) => {
    console.log('CLICKED it', filter);
    props.setSearchParams(filter);
  };

  return (
    <FlexBoxRow className="">
      <FlexBoxColumn className="">
        <div
          className="icons-treasure"
          onClick={() => handleClick({ filter: 'treasure' })}
        />
        <div className="">Bounties</div>
      </FlexBoxColumn>
      <FlexBoxColumn>
        <div
          className="icons-signal"
          onClick={() => handleClick({ filter: 'smokesignals' })}
        />
        <div className="icons-text">Fundraisers</div>
      </FlexBoxColumn>
      <FlexBoxColumn>
        <div
          className="icons-mail"
          onClick={() => handleClick({ filter: 'mib' })}
        />
        <div className="icons-text">Subscriptions</div>
      </FlexBoxColumn>
    </FlexBoxRow>
  );
};
