import {useEffect, useState} from 'react'
import '../App.css'
import Subscribe from './subscribe'
import {FlexBoxColumn} from "@/components/common/FlexBoxColumn.jsx";

export default function BottleList({islands, state}) {
  const [tiers, setTiers] = useState([])

  const getTiers = async () => {
    let tierList = []
    for (let i = 0; i < islands.length; i++) {
      tierList = tierList.concat(islands[i].tiers)
    }
    setTiers(tierList.map(key => <Subscribe profile={key.island} name={key.name} index={key.index} perks={key.perks}
                                            amount={key.amount} interval={key.interval}
                                            userAddress={state.walletList[state.activeWallet].address}
                                            dba={state.deroBridgeApiRef} scid={state.scid}
                                            randomAddress={state.randomAddress} available={key.available} />))
  }

  useEffect(() => {
    getTiers()

  }, [islands])

  return (
    <>
      <div className='text-3xl font-bold'>Island Subscriptions</div>
      {tiers.map(x => <div className="prose max-w-screen">{x}</div>)}
    </>
  )

}