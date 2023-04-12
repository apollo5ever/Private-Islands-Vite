import React from 'react'
import {useParams} from 'react-router-dom'
import {LoginContext} from '../LoginContext';
import {useSearchParams, NavLink} from 'react-router-dom'
import to from 'await-to-js';
import TreasureCard from './treasureCard';
import FundCard from './fundCard';
import Subscribe from './subscribe';
import TrustIsland from './trustIsland';
import hex2a from './hex2a';
import getMIB from './getMIB';
import GI from './getIslands'
import getBounties from './getBounties';
import getFundraisers from './getFundraisers';


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
  const [view, setView] = React.useState("main")
  const params = useParams()
  const [island,setIsland] = React.useState(null)


  /* function hex2a(hex) {
     var str = '';
     for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
     return str;
 }*/


  const getIslands = React.useCallback(async () => {
    setIsland(await GI(state, params.island))
    

    //   const deroBridgeApi = state.deroBridgeApiRef.current
    //   const [err, res] = await to(deroBridgeApi.daemon('get-sc', {
    //           scid:state.scid,
    //           code:false,
    //           variables:true
    //   }))
    //   var metaSearch= params.island+"_M"
    //   const meta = hex2a(res.data.result.stringkeys[metaSearch])
    //   for await (const buf of state.ipfs.cat(meta.toString())){
    //     try{
    //     let island = JSON.parse(buf.toString())

    //   setPost([island])
    // } catch(error){
    //   console.log(error)
    // }
    //  }


  })

  const getIslandObjects = React.useCallback(async () => {

    setTreasures([])
    setSignals([])
    setJudging([])
    setBottles([])


    var treasureSearch = new RegExp(`${params.island}[0-9]*_bm`)
    var signalSearch = new RegExp(`${params.island}[0-9]*_sm`)
    var judgeSearch = /.*_J\d{1,}/
    //var bottleSearch = new RegExp(`\\${params.island.toString()}\\d*_Av`)
    var bottleSearch = new RegExp(params.island + `\\d*_Av`)
    var trustSearch = new RegExp(`\\${params.island}\_T`)


    // console.log("BOTTLETESTRESZZ",newBottleSearch,Object.keys(scData).filter(key=>newBottleSearch.test(key)))

//   let trustList = Object.keys(scData)
//   .filter(key=>trustSearch.test(key))

//   let trustScore = 0
//   for (var t=0;t<trustList.length;t++){
//     trustScore+= scData[trustList[t]]
//   }
// setTrust(trustScore/trustList.length)


    setBottles(await getMIB(postFiltered[0], -1, state))
    setTreasures(await getBounties(state, params.island))
    setSignals(await getFundraisers(state, params.island))


  })
  /*
  const getTXHistory = React.useCallback(async () => {
    const deroBridgeApi= state.deroBridgeApiRef.current
    const [err,res] = await to(deroBridgeApi.wallet('get'))
  })
  */


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
    <div className="function">
     {island? <div className="profile">
        
            <div>
              <div className="icons">
                <img src={island.image} />
                <h1 onClick={() => setSearchParams({"view": "main"})}>{island.name}</h1>
              </div>
              {searchParams.get("view") === "main" ?
                <>
                  <p>{island.tagline}</p>
                  <p>Social Coconut Score:{trust ? trust : "Not trusted by any island operators"}</p>
                  <p dangerouslySetInnerHTML={{__html: island.bio}} />
                </>
                : searchParams.get("view") === "treasure" ?
                  <>
                    {island.bounties && island.bounties.length > 0 ?
                    <>
                      {island.bounties.map(x => <TreasureCard className="mytreasure" name={x.name} profile={island.name}
                                                      tagline={x.tagline} treasure={x.treasure} image={x.image}
                                                      judgeList={x.judgeList} index={x.index} />)}
                    </>
                    : <p>No Buried Treasures yet</p>}
                    {judging.length > 0 ?
                      <>
                        {judging.map(x => <TreasureCard className="mytreasure" name={x.name} profile={x.island}
                                                      tagline={x.tagline} treasure={x.treasure} image={x.image}
                                                      judgeList={x.judgeList} index={x.index} />)}
                      </>
                      : <p>No Judging any treasure</p>}
                  </>
                : searchParams.get("view") === "signal" ?
                  <>
                      {island.fundraisers && island.fundraisers.length > 0 ?
                        <>
                        {island.fundraisers.map(x => <NavLink to={`/island/${x.island}/smokesignal/${x.index}`}><FundCard
                          name={x.name} profile={x.island} tagline={x.tagline} goal={x.goal} image={x.image}
                          deadline={x.deadline} /></NavLink>)}
                        </>
                        : <><p>No Smoke Signals Yet</p></>}
                  </>
                : searchParams.get("view") === "mail" ? <>{island.tiers.map(key=><Subscribe profile={island.name} name={key.name} index={key.index} perks={key.perks} amount={key.amount} interval={key.interval} userAddress={state.walletList[state.activeWallet].address} dba={state.deroBridgeApiRef} scid={state.scid} randomAddress={state.randomAddress} available={key.available}/>)}</> : ""}

              <div className="icons">
                <div className="icons-treasure" onClick={() => setSearchParams({"view": "treasure"})}>
                  <div className="icons-text">Bounties</div>
                </div>
                <div className="icons-signal" onClick={() => setSearchParams({"view": "signal"})}>
                  <div className="icons-text">Fundraisers</div>
                </div>
                <div className="icons-mail" onClick={() => setSearchParams({"view": "mail"})}>
                  <div className="icons-text">Subscriptions</div>
                </div>

              </div>


            </div>


         


      </div>
      :""}
      {state.myIslands && state.myIslands.length > 0 ? <TrustIsland island={params.island} /> : ""}
    </div>
  )
}