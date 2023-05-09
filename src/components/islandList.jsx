import {useCallback, useContext, useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom';
import IslandCard from './islandCard';
import {LoginContext} from '../LoginContext';
import {useSearchParams} from 'react-router-dom';
import BountyList from './bountyList';
import FundList from './fundList';
import {default as GI} from './getIslands'
import BottleList from './bottleList';
import {Card} from 'react-daisyui';
import {FlexBoxColumn} from "@/components/common/FlexBoxColumn.jsx";
import {FlexBoxRow} from "@/components/common/FlexBoxRow.jsx";
import {Divider} from "@/components/common/Divider.jsx";
import {FeatureNav} from "@/components/common/FeatureNav.jsx";

export default function IslandList() {
  const [islands, setIslands] = useState([])
  const [shuffledIslands, setShuffledIslands] = useState([]);
  const [state, setState] = useContext(LoginContext);
  let [searchParams, setSearchParams] = useSearchParams();

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  const getIslands = useCallback(async () => {
    setIslands(await GI(state))
  })

  useEffect(() => {
    getIslands()
  }, [])

  useEffect(() => {
    // shuffle the array and update the state
    setShuffledIslands(shuffleArray(islands));
  }, [islands]); // specify an empty array as the dependencies to run the effect only when the component mounts or updates

  return (
    <FlexBoxRow className='p-8'>
      <Card side='lg' bordered='true' image-full='false' className='bg-secondary shadow-md w-screen'>
        <Card.Body className=''>
          <FlexBoxColumn>
            <div className='prose'>
              <Card.Title className='justify-center'>
                <NavLink to={`/archipelago`} className='no-underline'>
                  <h1 className='text-center'>The Archipelago</h1>
                </NavLink>
              </Card.Title>
            </div>
            <FeatureNav setSearchParams={setSearchParams} />
            <Divider />
            {!searchParams.get("filter") ?
              <div>
                <div className="profile-card-grid">{islands.map(bio => {
                  return (<NavLink to={`/island/${bio.name}?view=main`} key={bio.name}>
                    <IslandCard name={bio.name} tagline={bio.tagline} image={bio.image} />
                  </NavLink>)
                })}
                </div>
              </div>
              : searchParams.get("filter") === "treasure" ? <BountyList islands={islands} />
                : searchParams.get("filter") === "smokesignals" ? <FundList islands={islands} />
                  : searchParams.get("filter") === "mib" ? <BottleList islands={islands} state={state} />
                    : ""}
          </FlexBoxColumn>
        </Card.Body>
      </Card>
    </FlexBoxRow>
  )
}
