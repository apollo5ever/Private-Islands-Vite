import React, {useEffect, useCallback, useContext, useState} from 'react'
import TreasureCard from './treasureCard'
import {useSearchParams} from 'react-router-dom'
import {LoginContext} from '../LoginContext'
import {FlexBoxColumn} from "@/components/common/FlexBoxColumn.jsx";

export default function BountyList({islands}) {
  const [state, setState] = useContext(LoginContext);
  const [funds, setFunds] = useState([])
  let [searchParams, setSearchParams] = useSearchParams();

  const getFunds = useCallback(async () => {
    var bounties = []
    console.log(islands)

    for (var i = 0; i < islands.length; i++) {
      for (var b = 0; b < islands[i].bounties.length; b++) {
        bounties.push(islands[i].bounties[b])
      }
    }
    setFunds(bounties)
  })

  const handleFilter = (e) => {
    e.preventDefault();
    setSearchParams({"filter": "treasure", "status": e.target.value})
  }

  useEffect(() => {
    getFunds();
  }, [state, islands])

  useEffect(() => {
    console.log("funds??", funds)
  }, [funds])


  const fundJSX = funds.map(f => {
    if (searchParams.get("status") && f.status !== searchParams.get("status")) return
    if (searchParams.get("island") && f.island !== searchParams.get("island")) return

    return (
      <div key={f.name} className='py-4'>
        <TreasureCard JN={f.JN}
                      image={f.image}
                      index={f.index}
                      treasure={f.treasure}
                      deadline={f.deadline} profile={f.island} name={f.name}
                      tagline={f.tagline} />
      </div>
    )
  })

  return (
    <div className='prose w-screen'>
      <FlexBoxColumn>
        <h2>Buried Treasure Bounties</h2>
        <select id='treasure-filter' onChange={handleFilter} className='select select-bordered w-full max-w-xs'>
          <option disabled selected>Filter...</option>
          <option value='0'>Active</option>
          <option value='1'>Success</option>
          <option value='2'>Failures</option>
        </select>
        {fundJSX && fundJSX}
      </FlexBoxColumn>
    </div>
  )
}
