import React from 'react'
import {useParams} from 'react-router-dom';
import {LoginContext} from '../LoginContext';
import getFundraisers from './getFundraisers';
import {useSendTransaction} from '../useSendTransaction';
import {Button} from '@/components/common/Button.jsx';
import {SignalHeader} from "@/components/smokeSignal/SignalHeader.jsx";
import {default as GI} from './getIslands'

export default function Fundraiser() {
  const [signal, setSignal] = React.useState({})
  const params = useParams()
  const island = params.island
  const index = params.index
  const [state, setState] = React.useContext(LoginContext);
  const [editing, setEditing] = React.useState(false)
  const [raised, setRaised] = React.useState(-1)
  const [sendTransaction] = useSendTransaction()

  function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  const getFunds = React.useCallback(async () => {
      let profile = await GI(state, island)
      setSignal(profile.fundraisers[index])
    }
  )

  const withdraw = React.useCallback(async (event) => {
    event.preventDefault()
    var hash = signal.scid

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
  })

  const supportGoal = React.useCallback(async (event) => {
    event.preventDefault()
    var HashAndIndex = signal.scid + params.index
    if (event.target.refundable.checked) {
      var refundable = 1
    } else {
      var refundable = 0
    }

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
  })

  if (signal) {
    var deadline = new Date(signal.deadline * 1000)
    var deadlinestring = (deadline.getMonth() + 1).toString() + "/" + deadline.getDate().toString() + "/" + deadline.getUTCFullYear().toString()
  }

  const SetMetaData = React.useCallback(async (event) => {
    event.preventDefault()
    const transfers = [
      {
        "destination": state.randomAddress,
        "scid": signal.scid,
        "burn": 1
      }
    ]

    let fee
    if (event.target.Description.value.length > 360) fee = 10000


    const txData = new Object(
      {
        "scid": state.scid_fundraisers,
        "ringsize": 2,
        "fees": fee,
        "transfers": transfers,
        "sc_rpc": [{
          "name": "entrypoint",
          "datatype": "S",
          "value": "SetMetadata"
        },

          {
            "name": "H",
            "datatype": "S",
            "value": signal.scid
          },
          {
            "name": "i",
            "datatype": "U",
            "value": parseInt(index)
          },
          {
            "name": "Name",
            "datatype": "S",
            "value": event.target.Name.value
          },
          {
            "name": "Image",
            "datatype": "S",
            "value": event.target.Image.value
          },
          {
            "name": "Tagline",
            "datatype": "S",
            "value": event.target.Tagline.value
          },

          {
            "name": "Description",
            "datatype": "S",
            "value": event.target.Description.value
          }
        ]
      }
    )
    sendTransaction(txData)


    setSearchParams({"status": "success"})

  })

  React.useEffect(() => {
    console.log("executed only once!");
    getFunds();
  }, [state.ipfs]);

  return (<div className="function">
      {!editing && state.myIslands && state.myIslands.length > 0 && island == state.myIslands[state.active].name ?
        <small onClick={() => {
          setEditing(true)
        }}>edit</small>
        : <></>
      }
      {signal && editing ? <form onSubmit={SetMetaData}>
        <small onClick={() => {
          setEditing(false)
        }}>cancel</small>
        <input placeholder="name" defaultValue={signal.name} id="Name" />
        <input placeholder="image url" defaultValue={signal.image} id="Image" />
        <input placeholder="tagline" defaultValue={signal.tagline} id="Tagline" />
        <textarea placeholder="description" rows="44" cols="80" defaultValue={signal.description} id="Description" />
        <button type={"submit"}>Submit</button>
      </form> : <></>}
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