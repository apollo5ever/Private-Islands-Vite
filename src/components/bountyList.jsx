import { useState } from 'react';
import TreasureCard from './treasureCard';
import '../App.css';
import { useSearchParams } from 'react-router-dom';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { useGetBounties } from '@/components/hooks/useGetBounties.js';

export default function BountyList({ islands }) {
  const [activeFilter, setActiveFilter] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const { bounties } = useGetBounties(islands);

  const filterOptions = [
    { label: 'All', filter: 'treasure', status: '' },
    { label: 'Active', filter: 'treasure', status: 0 },
    { label: 'Successes', filter: 'treasure', status: 1 },
    { label: 'Failures', filter: 'treasure', status: 2 },
  ];

  const handleFilterSelection = (item) => {
    setSearchParams({ filter: item.filter, status: item.status });
    setActiveFilter(item.label);
  };

  /*
   TODO - MTS -- searchParams.get('island') is always null -- PROB SHOULD REMOVE
   */
  const bountyJSX = bounties.map((f) => {
    if (
      searchParams.get('status') &&
      f.status !== parseInt(searchParams.get('status'))
    )
      return;
    if (searchParams.get('island') && f.island != searchParams.get('island'))
      return;

    return (
      <div className="mb-3">
        <TreasureCard
          key={f.Names[f.Names.length - 1]}
          JN={f.JN}
          image={f.Images[f.Images.length - 1]}
          index={f.Index}
          treasure={f.Amount}
          deadline={f.Expiry}
          profile={f.Initiator.Name}
          name={f.Names[f.Names.length - 1]}
          tagline={f.Taglines[f.Taglines.length - 1]}
          initiator={f.Initiator}
        />
      </div>
    );
  });

  return (
    <div>
      <FlexBoxColumn className="my-3 flex justify-center">
        <div className="text-xl font-semibold text-info">
          Buried Treasure Bounties
        </div>
        <div className="join">
          {filterOptions.map((item, index) => (
            <input
              key={index}
              className={`join-item btn ${
                activeFilter === item.label ? 'btn-accent' : 'btn-info'
              }`}
              type="radio"
              name="options"
              aria-label={item.label}
              onClick={() => handleFilterSelection(item)}
              style={{
                backgroundColor:
                  activeFilter === item.label ? '#5ee596' : '#6c98d6',
                borderColor:
                  activeFilter === item.label ? '#5ee596' : '#6c98d6',
                color: activeFilter === item.label ? '#28353e' : '#28353e',
              }}
            />
          ))}
        </div>
      </FlexBoxColumn>
      {bountyJSX && bountyJSX}
    </div>
  );
}
