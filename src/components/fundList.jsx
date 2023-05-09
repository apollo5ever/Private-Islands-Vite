import React from 'react'
import FundCard from './fundCard'
import {useSearchParams, NavLink} from 'react-router-dom'
import {LoginContext} from '../LoginContext'


export default function FundList({islands}) {
  const [state, setState] = React.useContext(LoginContext);
  const [funds, setFunds] = React.useState([])
  let [searchParams, setSearchParams] = useSearchParams();

  const getFunds = React.useCallback(async () => {
    let fundraisers = []
    console.log(islands)

    for (var i = 0; i < islands.length; i++) {
      for (var b = 0; b < islands[i].fundraisers.length; b++) {
        fundraisers.push(islands[i].fundraisers[b])
      }
    }
    setFunds(fundraisers)
  })

  React.useEffect(() => {
    getFunds();
  }, [islands])

  const handleFilter = (e) => {
    e.preventDefault();
    setSearchParams({"filter": "smokesignals", "status": e.target.value})
  }

  const fundJSX = funds.map(f => {
    if (searchParams.get("status") && f.status !== searchParams.get("status")) return
    if (searchParams.get("island") && f.island !== searchParams.get("island")) return

    return (
      <NavLink to={`/island/${f.island}/smokesignal/${f.index}`} className='no-underline'>
        <FundCard image={f.image}
                  index={f.index}
                  goal={f.goal}
                  deadline={f.deadline}
                  profile={f.island}
                  name={f.name}
                  tagline={f.tagline} />
      </NavLink>)
  })

  return (
    <div className='prose text-center'>
      <div>
        <h1>Smoke Signal Fundraisers</h1>
        <select onChange={handleFilter} className='select select-bordered w-full max-w-xs'>
          <option disabled selected>Filter...</option>
          <option value=''>All</option>
          <option value='0'>Active</option>
          <option value='1'>Success</option>
          <option value='2'>Failures</option>
        </select>
        {fundJSX}
      </div>
    </div>
  )

}
