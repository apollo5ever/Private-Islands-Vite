import {useCallback, useContext, useEffect, useState} from 'react'
import {useParams, NavLink} from 'react-router-dom';
import {LoginContext} from '../LoginContext';
import RT from './RT';
import Executer from './Executer';
import N from './N';
import Judge from './Judge';
import {useSendTransaction} from '../useSendTransaction';
import GI from './getIslands'
import {SupportBountyByERC20} from './supportBountyByErc20';
import {FlexBoxColumn} from "@/components/common/FlexBoxColumn.jsx";
import {Input} from "@/components/common/Input.jsx";
import {FlexBoxRow} from "@/components/common/FlexBoxRow.jsx";
import {Helpers} from "@/utils/helpers.js";

export default function Treasure() {
  const [treasure, setTreasure] = useState({})
  const params = useParams()
  const island = params.island
  const index = params.index
  const [state, setState] = useContext(LoginContext);
  const [judging, setJudging] = useState([])
  const [executing, setExecuting] = useState(false)
  const [sendTransaction] = useSendTransaction()

  const getJudging = () => {
    console.log("myslands", state)
    if (!state.myIslands || !treasure.judgeList || state.myIslands.length === 0) return

    var jl = []
    if (treasure.judgeList.includes(state.myIslands[state.active].name)) jl.push(state.myIslands[state.active])
    setJudging(jl)
  }
  const getExecuting = () => {
    console.log("executerlist", treasure.executerList, treasure.XN)
    if (!state.myIslands || !treasure.executerList || state.myIslands.length === 0) return

    if (treasure.executerList.includes(state.myIslands[state.active].name)) setExecuting(true)
    else setExecuting(false)
  }

  useEffect(() => {
    getJudging()
    getExecuting()

  }, [state.myIslands, treasure, state.active])


  const AddTreasure = useCallback(async (event) => {
    event.preventDefault();
    const data = new Object(
      {
        "scid": state.scid,
        "ringsize": 2,
        "transfers": [
          {
            "destination": state.randomAddress,
            "burn": parseInt(event.target.amount.value * 100000)

          }
        ],
        "sc_rpc": [{
          "name": "entrypoint",
          "datatype": "S",
          "value": "BT"
        },

          {
            "name": "H",
            "datatype": "S",
            "value": island
          },
          {
            "name": "i",
            "datatype": "U",
            "value": parseInt(index)
          },
          {
            "name": "J",
            "datatype": "S",
            "value": "J"
          },
          {
            "name": "X",
            "datatype": "S",
            "value": "X"
          },
          {
            "name": "E",
            "datatype": "U",
            "value": 0
          },
          {
            "name": "M",
            "datatype": "S",
            "value": "M"
          },

          {
            "name": "m",
            "datatype": "S",
            "value": "m"
          },
          {
            "name": "j",
            "datatype": "U",
            "value": 0
          }
        ]
      }
    )

    sendTransaction(data)
  })

  const getFunds = useCallback(async () => {
      let profile = await GI(state, island)
      console.log(profile.bounties)
      setTreasure(profile.bounties[index])
    }
  )


  const ClaimTreasure = useCallback(async (event) => {
    event.preventDefault()
    console.log(treasure.judge)
    var hash = params.island

    const data = new Object(
      {
        "ringsize": 16,
        "transfers": [
          {
            "destination": treasure.judgeAddress,
            "amount": 1,

            "payload_rpc": [
              {
                "name": "C",
                "datatype": "S",
                "value": "Treasure Claim Submitted by: " + state.walletList[state.activeWallet].address
              },
              {
                "name": "POC",
                "datatype": "S",
                "value": event.target.proof.value
              }
            ]
          }
        ]
      }
    )
    sendTransaction(data)
  })

  useEffect(() => {
    console.log("executed only once!");
    getFunds();
  }, [state.ipfs]);

  return (
    <div className='py-10 min-w-full prose px-8'>
      <div className='card-body p-4'>
        <FlexBoxColumn className='card bg-primary shadow-md py-4 px-8'>
          {treasure.name
            ? <>
              <img src={treasure.image} className='mask mask-circle h-56 p-4' />
              <h1>{treasure.name}</h1>
              <div>Initiated by <NavLink to={`/island/${island}`}>{island}</NavLink></div>
              <h3>Treasure: {treasure.treasure} Dero</h3>
              <h3>{treasure.tagline}</h3>
              {treasure.status === 0
                ? <p>
                  This treasure expires on {Helpers.formattedDate(treasure.expiry * 1000)}.
                  If treasure isn't released before this date, <br />contributors can return to this page to receive a 95%
                  refund.
                </p>
                : treasure.status === 2
                  ?
                  <p>This bounty has expired. If you added your treasure, you can reclaim it now.<RT scid={state.scid}
                                                                                                     dba={state.deroBridgeApiRef}
                                                                                                     island={island}
                                                                                                     index={index} />
                  </p>
                  : <p>This bounty was a success.</p>}

              {treasure.judge ?
                <h3>Active Judge:<NavLink to={`/island/${treasure.judge}?view=main`}>{treasure.judge}</NavLink>
                </h3> : ""}
              {treasure.executer ?
                <h3>Active Executer:<NavLink to={`/island/${treasure.executer}?view=main`}>{treasure.executer}</NavLink>
                </h3> : ""}

              {treasure.recipientList && treasure.recipientList.length > 0 ?
                <>These addresses have been nominated to receive the treasure:
                  <ul>{treasure.recipientList}</ul></>
                : ""}

              <div className="subscribe">
                <div><h3>Nominated judges:</h3> <ol>{treasure.judgeList.map((j, i) => <li><NavLink
                  to={`/island/${j}?view=main`}>{treasure.JN === i ?
                  <b>{j}{treasure.judgeList && treasure.judgeList.length > 1 ? <> (expires
                    in {Math.round(treasure.JE / (60 * 60 * 24))} days)</> : ""}</b> : j}</NavLink></li>)}</ol></div>

                <p><h3>Nominated executors:</h3> <ol>{treasure.executerList && treasure.executerList.map((j, i) => <li><NavLink
                  to={`/island/${j}?view=main`}>{treasure.XN === i ?
                  <b>{j}{treasure.executerList && treasure.executerList.length > 1 ? <> (expires
                    in {Math.round(treasure.XE / (60 * 60 * 24))} days)</> : ""}</b> : j}</NavLink></li>)}</ol></p>
              </div>

              {treasure.status === 0 && state.myIslands && state.myIslands.length > 0 && island === state.myIslands[state.active].name ?
                <div className='subscribe'><h3>Initiator Functions</h3><p>You initiated this bounty. You may nominate
                  backup
                  judges and executers.</p>
                  <N island={island} index={index} dba={state.deroBridgeApiRef} l="X" scid={state.scid} /><N
                    island={island}
                    index={index}
                    dba={state.deroBridgeApiRef}
                    l="J"
                    scid={state.scid} />
                </div> : ""}


              {treasure.status === 0 && state.myIslands && state.myIslands.length > 0 && judging.length > 0 ?
                <Judge active={treasure.judgeList[treasure.JN]} userIsland={state.myIslands[state.active].name}
                       island={island} index={index} judge={treasure.judge} JF={treasure.JF}
                       deroBridgeApiRef={state.deroBridgeApiRef} scid={state.scid} XE={treasure.JE}
                       solo={treasure.judgeList.length === 1} recipientList={treasure.recipientList} />
                : ""}

              {treasure.status === 0 && state.myIslands && state.myIslands.length > 0 && executing ?
                <Executer active={treasure.executerList[treasure.XN]} userIsland={state.myIslands[state.active].name}
                          island={island} index={index} executer={treasure.executer} JF={treasure.JF}
                          deroBridgeApiRef={state.deroBridgeApiRef} scid={state.scid} XE={treasure.XE}
                          solo={treasure.executerList.length === 1} /> : ""}

              {treasure.status === 0 ? <>
                  <form onSubmit={AddTreasure} className='w-2/5 py-4'>
                    <FlexBoxRow justify='around'>
                      <div className="form-control pr-4">
                        <label className="input-group">
                          <span className='bg-neutral text-white'>Dero</span>
                          <Input placeholder="Amount (Dero)" id="amount" />
                        </label>
                      </div>
                      <button className='btn btn-outline btn-outline-neutral' type={"submit"}>Add Treasure</button>
                    </FlexBoxRow>
                  </form>
                  <form onSubmit={ClaimTreasure} className='w-2/5'>
                    <FlexBoxRow justify='around'>
                      <div className="form-control pr-4">
                        <label className="input-group">
                          <span className='bg-neutral text-white'>Proof</span>
                          <Input placeholder="Proof" id="amount" />
                        </label>
                      </div>
                      <button className='btn btn-outline btn-outline-neutral' type={"submit"}>Claim Treasure</button>
                    </FlexBoxRow>
                  </form>
                </>
                : ""}

              <SupportBountyByERC20 H={island} i={index} />
              <p dangerouslySetInnerHTML={{__html: treasure.description}} />
            </> : <p>Loading...</p>}
        </FlexBoxColumn>
      </div>
    </div>
  )
} 