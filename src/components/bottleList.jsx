import React from 'react'
import TreasureCard from './treasureCard'
import '../App.css'
import {useSearchParams,NavLink} from 'react-router-dom'
import Subscribe from './subscribe'
import to from 'await-to-js'
import sha256 from 'crypto-js/sha256'
import getIslands from './getIslands'
import getMIB from './getMIB'



export default  function BottleList({islands,state}){


   
    const [tiers,setTiers] = React.useState([])

    const getTiers = async()=>{
      var tierList=[]

    
    for(var i=0;i<islands.length;i++){
      tierList=tierList.concat(islands[i].tiers)
    }
    console.log("BOTTLELIST",tierList)
    setTiers(tierList.map(key=><Subscribe profile={key.scid} name={key.name} index={key.index} perks={key.perks} amount={key.amount} interval={key.interval} userAddress={state.walletList[state.activeWallet].address} dba={state.deroBridgeApiRef} scid={state.scid_subscriptions} randomAddress={state.randomAddress} available={key.available}/>))

    }

    React.useEffect(()=>{
      console.log("run get tiers")
      getTiers()

    },[islands,state.walletList,state.randomAddress,state.activeWallet])
    


      return(
         <><h1>Island Subscriptions</h1>{tiers.map(x=><div className="function">{x}</div>)}</>
      )

}