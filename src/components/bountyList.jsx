import { useCallback, useContext, useEffect, useState } from 'react';
import TreasureCard from './treasureCard';
import '../App.css';
import { useSearchParams } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';

export default function BountyList({ islands }) {
  const [state, setState] = useContext(LoginContext);
  const [funds, setFunds] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();

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

  const getFunds = useCallback(async () => {
    var bounties = [];

    for (var i = 0; i < islands.length; i++) {
      for (var b = 0; b < islands[i].bounties.length; b++) {
        bounties.push(islands[i].bounties[b]);
      }
    }
    setFunds(bounties);
  });

  useEffect(() => {
    getFunds();
  }, [state, islands]);

  useEffect(() => {
    // console.log('funds??', funds);
  }, [funds]);

  /*
   TODO - MTS -- searchParams.get('island') is always null -- PROB SHOULD REMOVE
   */
  const fundJSX = funds.map((f) => {
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
          key={f.name}
          JN={f.JN}
          image={f.image}
          index={f.index}
          treasure={f.treasure}
          deadline={f.deadline}
          profile={f.island}
          name={f.name}
          tagline={f.tagline}
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
      {fundJSX && fundJSX}
    </div>
  );
}
