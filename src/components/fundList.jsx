import { useCallback, useContext, useEffect, useState } from 'react';
import FundCard from './fundCard';
import '../App.css';
import { useSearchParams, NavLink } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { SummaryCard } from '@/components/smokeSignal/SummaryCard.jsx';

export default function FundList({ islands }) {
  const [state, setState] = useContext(LoginContext);
  const [activeFilter, setActiveFilter] = useState('');

  const [funds, setFunds] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();

  const filterOptions = [
    { label: 'All', filter: 'smokesignals', status: '' },
    { label: 'Active', filter: 'smokesignals', status: 0 },
    { label: 'Successes', filter: 'smokesignals', status: 1 },
    { label: 'Failures', filter: 'smokesignals', status: 2 },
  ];

  const handleFilterSelection = (item) => {
    setSearchParams({ filter: item.filter, status: item.status });
    setActiveFilter(item.label);
  };

  const getFunds = useCallback(async () => {
    var fundraisers = [];
    console.log(islands);

    for (var i = 0; i < islands.length; i++) {
      for (var b = 0; b < islands[i].fundraisers.length; b++) {
        fundraisers.push(islands[i].fundraisers[b]);
      }
    }
    setFunds(fundraisers);
  });

  useEffect(() => {
    getFunds();
  }, [islands]);

  const fundJSX = funds.map((f) => {
    if (searchParams.get('status') && f.status !== searchParams.get('status'))
      return;
    if (searchParams.get('island') && f.island !== searchParams.get('island'))
      return;

    return (
      <SummaryCard
        image={f.image}
        index={f.index}
        goal={f.goal}
        deadline={f.deadline}
        profile={f.island}
        name={f.name}
        tagline={f.tagline}
      />
    );
  });

  /*
   I spent hours trying to override the 'join-item' styling for a selected item.  It should be very simple, but
   I tried everything with no luck, including the dynamic btn class assignments I have left in place below.  They
   don't do shit -- So I had to apply inline styling, but referencing the 'theme' colors via variables didn't work,
   so have the least optimal solution possible at this point, which is manually applying styles which don't toggle
   on the theme and have hex code colors copied from tailwind.config.cjs light theme
   */
  return (
    <div>
      <FlexBoxColumn className="my-3 flex justify-center">
        <div className="text-xl font-semibold text-info">
          Smoke Signal Fundraisers
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
      {fundJSX}
    </div>
  );
}
