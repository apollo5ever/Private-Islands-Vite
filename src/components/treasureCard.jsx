import React from 'react'
import {FlexBoxColumn} from "@/components/common/FlexBoxColumn.jsx";
import {Card} from "react-daisyui";
import {LoginContext} from '../LoginContext';
import {NavLink} from 'react-router-dom';
import AN from './AN'

export default function TreasureCard(props) {
  const [state, setState] = React.useContext(LoginContext)
  const [judging, setJudging] = React.useState([])
  const [executing, setExecuting] = React.useState(false)

  const getJudging = () => {
    if (!state.myIslands || !props.judgeList) return

    for (var i = 0; i < state.myIslands.length; i++) {
      if (props.judgeList.includes(state.myIslands[i].name)) setJudging(judging => [...judging, state.myIslands[i]])
    }
  }

  const getExecuting = () => {
    if (!state.myIslands || !props.executerList) return

    if (props.executerList.includes(state.myIslands[state.active].name)) setExecuting(true)
    else setExecuting(false)
  }

  React.useEffect(() => {
    getJudging()
    getExecuting()
  }, [state.myIslands])

  return (
    <>
      <FlexBoxColumn className='prose prose-b2 w-screen card bg-primary shadow-md'>
        <div className='card-body'>
          <h1 className='prose-2xl text-center m-0'>{props.name}</h1>
          <h3 className='prose-lg text-center m-0'>{props.tagline}</h3>
          <figure className='w-96'><img src={props.image} className='rounded-2xl mx-2' /></figure>
          <div className=''>Initiated by {props.profile}</div>
          <div><strong>Treasure:</strong> {props.treasure} Dero</div>
          <div>
            <strong>Judges:</strong>
            {props.judgeList ? props.judgeList.map(x => <React.Fragment key={x}>{x}, </React.Fragment>) : ""}
          </div>
          <div className="card-actions">
            <NavLink to={`/island/${props.profile}/treasure/${props.index}`} className='no-underline m-0'>
              <div className='btn btn-accent'>Click to See More</div>
            </NavLink>
          </div>
        </div>
        {
          judging.length > 0
            ? <AN dba={state.deroBridgeApiRef} scid={state.scid} l="J" JX={judging[0].name} island={props.profile}
                  index={props.index} />
            : ""
        }
        {
          executing
            ? <AN dba={state.deroBridgeApiRef} scid={state.scid} l="X" JX={state.myIslands[state.active].name}
                  island={props.profile} index={props.index} />
            : ""
        }
      </FlexBoxColumn>
    </>
  )
}