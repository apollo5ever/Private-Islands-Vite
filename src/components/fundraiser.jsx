import React from 'react'
import {useParams} from 'react-router-dom';
import {LoginContext} from '../LoginContext';
import getFundraisers from './getFundraisers';
import {useSendTransaction} from '../useSendTransaction';
import {Button} from 'react-daisyui';
import {SignalHeader} from "@/components/smokeSignal/SignalHeader.jsx";
import {default as GI} from './getIslands'


export default function Fundraiser() {

  const [signal, setSignal] = React.useState({})
  const params = useParams()
  const island = params.island
  const index = params.index
  const [state, setState] = React.useContext(LoginContext);

  const [raised, setRaised] = React.useState(-1)
  const [sendTransaction] = useSendTransaction()

  function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  const getFunds = React.useCallback(async () => {
    let profile = await GI(state,island)
     
     setSignal(profile.fundraisers[index])
      
    }
  )


  const withdraw = React.useCallback(async (event) => {
    event.preventDefault()
    var hash = signal.scid
    //const deroBridgeApi = state.deroBridgeApiRef.current

    const data = new Object(
      {
        "scid": state.scid_fundraisers,
        "ringsize": 2,
        "sc_rpc": [{
          "name": "entrypoint",
          "datatype": "S",
          "value": "WFF"
        },
          {
            "name": "H",
            "datatype": "S",
            "value": hash
          },
          {
            "name": "i",
            "datatype": "U",
            "value": parseInt(params.index)
          }
        ]

      }
    )

    sendTransaction(data)
    /*     const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
          "scid": state.scid,
          "ringsize": 2,
          "sc_rpc": [{
              "name": "entrypoint",
              "datatype": "S",
              "value": "WFF"
          },
          {
              "name": "H",
              "datatype": "S",
              "value": hash
          },
          {
            "name":"i",
            "datatype": "U",
            "value" : parseInt(params.index)
          }
      ]
      })) */

  })


  const supportGoal = React.useCallback(async (event) => {
    event.preventDefault()
    var HashAndIndex = signal.scid + params.index
    if (event.target.refundable.checked) {
      var refundable = 1
    } else {
      var refundable = 0
    }
//console.log(HashAndIndex,refundable,state.scid,state.randomAddress)


    // const deroBridgeApi = state.deroBridgeApiRef.current
//console.log('STATE',state)
    const data = new Object(
      {
        "scid": state.scid,
        "ringsize": 2,
        "transfers": [{
          "burn": (parseInt((event.target.amount.value) * 100000)),
          "destination": state.randomAddress
        }],
        "sc_rpc": [{
          "name": "entrypoint",
          "datatype": "S",
          "value": "SG"
        },
          {
            "name": "H",
            "datatype": "S",
            "value": HashAndIndex
          },
          {
            "name": "R",
            "datatype": "U",
            "value": refundable
          }
        ]
      }
    )

    sendTransaction(data)

    /*     const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
          "scid": state.scid,
          "ringsize": 2,
          "transfers": [{
             "burn": (parseInt((event.target.amount.value)*100000)),
             "destination":state.randomAddress
           }],
          "sc_rpc": [{
              "name": "entrypoint",
              "datatype": "S",
              "value": "SG"
          },
          {
              "name": "H",
              "datatype": "S",
              "value": HashAndIndex
          },
          {
            "name":"R",
            "datatype": "U",
            "value" : refundable
          }
      ]
      })) */
  })


  if (signal) {
    var deadline = new Date(signal.deadline * 1000)
    var deadlinestring = (deadline.getMonth() + 1).toString() + "/" + deadline.getDate().toString() + "/" + deadline.getUTCFullYear().toString()
  }

  React.useEffect(() => {
    console.log("executed only once!");
    //checkRaised();
    getFunds();
  }, [state.ipfs]);

  return (<div className="function">
      {signal ? <>
        <SignalHeader signal={signal} deadline={deadlinestring} />
        <p dangerouslySetInnerHTML={{__html: signal.description}} />
        <div className="profile">
          {signal.status === 0 ? <>
              <form onSubmit={supportGoal}>
                <input id="amount" placeholder="Dero amount to donate" type="text" />
                <label htmlFor='refundable'>Refundable?</label>
                <input id="refundable" type="checkbox" />
                <Button size='sm' type={"submit"}>Support</Button>
              </form>
              {raised >= signal.goal ?
                <form onSubmit={withdraw}>
                  <Button size='sm' type={"submit"}>Withdraw</Button>
                </form> : ""}
            </>
            : signal.status === 1 ? <>
                <p>This Smoke Signal has met its fundraiser goal! If you are the owner, you can withdraw the funds to the
                  fundee now.</p>
                <form onSubmit={withdraw}>
                  <Button size='sm' type={"submit"}>Withdraw</Button>
                </form>
              </>
              : signal.status === 2 ?
                <><p>This Smoke Signal failed to meet its goal. If you made a refundable donation, you can withdraw
                  those funds now.</p>
                  <form onSubmit={withdraw}>
                    <Button size='sm' type={"submit"}>Withdraw</Button>
                  </form>
                </> : ""}
        </div>
        </> : <p>Loading...</p>}
    </div>
  )
}