import React from 'react';
import { NavLink } from 'react-router-dom';
import IslandCard from './islandCard';
import { LoginContext } from '../LoginContext';
import { useSearchParams } from 'react-router-dom';
import BountyList from './bountyList';
import FundList from './fundList';
import { default as GI } from './getIslands';
import BottleList from './bottleList';
import { FeatureNav } from '@/components/common/FeatureNav.jsx';

export default function IslandList() {
  const [islands, setIslands] = React.useState([]);
  const [shuffledIslands, setShuffledIslands] = React.useState([]);
  const [state, setState] = React.useContext(LoginContext);
  const [view, setView] = React.useState('');
  let [searchParams, setSearchParams] = useSearchParams();

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const getIslands = React.useCallback(async () => {
    setIslands(await GI(state));
  });

  React.useEffect(() => {
    getIslands();
  }, []);

  React.useEffect(() => {
    // shuffle the array and update the state
    setShuffledIslands(shuffleArray(islands));
  }, [islands]); // specify an empty array as the dependencies to run the effect only when the component mounts or updates

  return (
    <div className="function">
      <NavLink to={`/archipelago`}>
        <h1>The Archipelago</h1>
      </NavLink>
      <FeatureNav setSearchParams={setSearchParams} />
      {!searchParams.get('filter') ? (
        <div>
          <div className="profile-card-grid">
            {islands.map((bio) => {
              return (
                <NavLink to={`/island/${bio.name}?view=main`} key={bio.name}>
                  <IslandCard
                    name={bio.name}
                    tagline={bio.tagline}
                    image={bio.image}
                  />
                </NavLink>
              );
            })}
          </div>
        </div>
      ) : searchParams.get('filter') == 'treasure' ? (
        <BountyList islands={islands} />
      ) : searchParams.get('filter') == 'smokesignals' ? (
        <FundList islands={islands} />
      ) : searchParams.get('filter') == 'mib' ? (
        <BottleList islands={islands} state={state} />
      ) : (
        ''
      )}
    </div>
  );
}
