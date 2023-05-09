import React from 'react'
import {useParams} from 'react-router-dom'
import {LoginContext} from '../LoginContext';
import {useSearchParams, NavLink} from 'react-router-dom'
import TreasureCard from './treasureCard';
import FundCard from './fundCard';
import Subscribe from './subscribe';
import TrustIsland from './trustIsland';
import getMIB from './getMIB';
import GI from './getIslands'
import getBounties from './getBounties';
import getFundraisers from './getFundraisers';
import {FlexBoxColumn} from "@/components/common/FlexBoxColumn.jsx";
import {Card} from "react-daisyui";
import {FlexBoxRow} from "@/components/common/FlexBoxRow.jsx";
import {FeatureNav} from "@/components/common/FeatureNav.jsx";

export default function Island() {
  const [post, setPost] = React.useState([])
  const [editing, setEditing] = React.useState("")
  const [tierToModify, setTierToModify] = React.useState(0)
  const [postTier, setPostTier] = React.useState(0)
  const [postToEdit, setPostToEdit] = React.useState(0)
  const [signalToClaim, setSignalToClaim] = React.useState(0)
  const [treasureToClaim, setTreasureToClaim] = React.useState(0)
  const [state, setState] = React.useContext(LoginContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const [treasures, setTreasures] = React.useState([])
  const [judging, setJudging] = React.useState([])
  const [signals, setSignals] = React.useState([])
  const [bottles, setBottles] = React.useState([])
  const [trust, setTrust] = React.useState(0)
  const params = useParams()
  const [island, setIsland] = React.useState(null)

  const getIslands = React.useCallback(async () => {
    setIsland(await GI(state, params.island))
  })

  const getIslandObjects = React.useCallback(async () => {
    setTreasures([])
    setSignals([])
    setJudging([])
    setBottles([])

    console.log('GET ISL OBJ', postFiltered[0])
    setBottles(await getMIB(postFiltered[0], -1, state))
    setTreasures(await getBounties(state, params.island))
    setSignals(await getFundraisers(state, params.island))
  })

  React.useEffect(() => {
    // getIslandObjects()
  }, [post, searchParams, state.ipfs])


  React.useEffect(() => {
    setPost([])
    getIslands()

  }, [state.myIslands])


  const changeTierToModify = e => {
    e.preventDefault()
    setTierToModify(e.target.value)
  }
  const changePostTier = e => {
    e.preventDefault()
    setPostTier(e.target.value)
  }
  const changePostToEdit = e => {
    e.preventDefault()
    setPostToEdit(e.target.value)
  }

  const changeSignalToClaim = e => {
    e.preventDefault()
    setSignalToClaim(e.target.value)
  }
  const changeTreasureToClaim = e => {
    e.preventDefault()
    setTreasureToClaim(e.target.value)
  }

  return (
    <FlexBoxRow className='p-8'>
      <Card side='lg' bordered='true' image-full='false' className='bg-secondary shadow-md'>
        <Card.Body>
          <FlexBoxColumn className="">
            {island ? <div className="prose">
                <div>
                  <FlexBoxColumn>
                    <img src={island.image} className='mask mask-decagon h-32' />
                    <h1 onClick={() => setSearchParams({"view": "main"})}>{island.name}</h1>
                  </FlexBoxColumn>
                  {searchParams.get("filter") === "main" ?
                    <>
                      <p>{island.tagline}</p>
                      <p>Social Coconut Score:{trust ? trust : "Not trusted by any island operators"}</p>
                      <p dangerouslySetInnerHTML={{__html: island.bio}} />
                    </>
                    : searchParams.get("filter") === "treasure" ?
                      <>
                        {island.bounties && island.bounties.length > 0 ?
                          <>
                            {island.bounties.map(x => <TreasureCard key={x.name} className="mytreasure" name={x.name}
                                                                    profile={island.name}
                                                                    tagline={x.tagline} treasure={x.treasure}
                                                                    image={x.image}
                                                                    judgeList={x.judgeList} index={x.index} />)}
                          </>
                          : <p>No Buried Treasures yet</p>}
                        {judging.length > 0 ?
                          <>
                            {judging.map(x => <TreasureCard key={x.name} className="mytreasure" name={x.name} profile={x.island}
                                                            tagline={x.tagline} treasure={x.treasure} image={x.image}
                                                            judgeList={x.judgeList} index={x.index} />)}
                          </>
                          : <p>No Judging any treasure</p>}
                      </>
                      : searchParams.get("filter") === "smokesignals" ?
                        <>
                          {island.fundraisers && island.fundraisers.length > 0 ?
                            <>
                              {island.fundraisers.map(x => <NavLink
                                to={`/island/${x.island}/smokesignal/${x.index}`}><FundCard key={x.name}
                                name={x.name} profile={x.island} tagline={x.tagline} goal={x.goal} image={x.image}
                                deadline={x.deadline} /></NavLink>)}
                            </>
                            : <><p>No Smoke Signals Yet</p></>}
                        </>
                        : searchParams.get("filter") === "mib" ? <>{island.tiers.map(key => <Subscribe
                          profile={island.name}
                          name={key.name}
                          index={key.index}
                          perks={key.perks}
                          amount={key.amount}
                          interval={key.interval}
                          userAddress={state.walletList[state.activeWallet].address}
                          dba={state.deroBridgeApiRef}
                          scid={state.scid}
                          randomAddress={state.randomAddress}
                          available={key.available} />)}</> : ""}
                  <FeatureNav setSearchParams={setSearchParams} />
                </div>
              </div>
              : ""}
            {state.myIslands && state.myIslands.length > 0 ? <TrustIsland island={params.island} /> : ""}
          </FlexBoxColumn>
        </Card.Body>
      </Card>
    </FlexBoxRow>
  )
}