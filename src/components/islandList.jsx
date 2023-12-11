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
    console.log('shuffle!');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const getIslands = React.useCallback(async () => {
    setIslands(shuffleArray(await GI()));
    console.log('shuffle');
  });

  // specify an empty array as the dependencies to run the effect only when the component mounts or updates

  return (
    <>
      <NavLink to={`/archipelago`}>
        <div className="flex text-3xl font-bold text-info">The Archipelago</div>
      </NavLink>
      <FeatureNav setSearchParams={setSearchParams} />
      {!searchParams.get('filter') ? (
        <div>
          <div className="flex flex-wrap justify-between">
            {islands.map((bio) => {
              return (
                <NavLink to={`/island/${bio.SCID}?view=main`} key={bio.SCID}>
                  <IslandCard
                    name={bio.Name}
                    tagline={bio.Tagline}
                    image={bio.Image}
                  />
                </NavLink>
              );
            })}
          </div>
        </div>
      ) : searchParams.get('filter') === 'treasure' ? (
        <BountyList islands={islands} />
      ) : searchParams.get('filter') === 'smokesignals' ? (
        <FundList islands={islands} />
      ) : searchParams.get('filter') === 'mib' ? (
        <BottleList islands={islands} state={state} />
      ) : (
        ''
      )}
    </>
  );
}
