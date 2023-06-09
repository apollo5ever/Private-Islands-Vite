import React from 'react'
import TreasureCard from './treasureCard'
import '../App.css'
import {useSearchParams} from 'react-router-dom'
import {LoginContext} from '../LoginContext'

export default function BountyList({islands}) {
  const [state, setState] = React.useContext(LoginContext);
  const [funds, setFunds] = React.useState([])
  let [searchParams, setSearchParams] = useSearchParams();

  function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  const getFunds = React.useCallback(async () => {
    var bounties = []
    console.log(islands)

    for (var i = 0; i < islands.length; i++) {
      for (var b = 0; b < islands[i].bounties.length; b++) {
        bounties.push(islands[i].bounties[b])
      }
    }
    setFunds(bounties)
  })

  React.useEffect(() => {
    getFunds();
  }, [state, islands])

  React.useEffect(() => {
    console.log("funds??", funds)
  }, [funds])


  const fundJSX = funds.map(f => {
    if (searchParams.get("status") && f.status != searchParams.get("status")) return
    if (searchParams.get("island") && f.island != searchParams.get("island")) return

    return (<div className="function"><TreasureCard JN={f.JN} image={f.image} index={f.index} treasure={f.treasure}
                                                    deadline={f.deadline} profile={f.island} name={f.name}
                                                    tagline={f.tagline} /></div>)

  })


  return (
    <div>
      <div>

        <h1>Buried Treasure Bounties</h1>
        <div className="status-selector">
          <ul>
            <li className="status-selector-option"
                onClick={() => setSearchParams({"filter": "treasure", "status": 0})}>Active
            </li>
            <li onClick={() => setSearchParams({"filter": "treasure", "status": 1})}>Successes</li>
            <li onClick={() => setSearchParams({"filter": "treasure", "status": 2})}>Failures</li>
          </ul>
        </div>
        {fundJSX && fundJSX}
      </div>
    </div>
  )
}