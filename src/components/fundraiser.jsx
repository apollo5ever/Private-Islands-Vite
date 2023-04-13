import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {LoginContext} from '../LoginContext';
import getFundraisers from './getFundraisers';
import {useSendTransaction} from '../useSendTransaction';
import {Button, Input} from 'react-daisyui';
import {SignalHeader} from "@/components/smokeSignal/SignalHeader.jsx";
import {FlexBoxColumn} from "@/components/common/FlexBoxColumn.jsx";
import {Checkbox} from "@/components/common/Checkbox.jsx";


export default function Fundraiser() {
  const [signal, setSignal] = useState({})
  const params = useParams()
  const island = params.island
  const index = params.index
  const [state, setState] = useContext(LoginContext);
  const [raised, setRaised] = useState(-1)
  const [sendTransaction] = useSendTransaction()

  function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  const getFunds = useCallback(async () => {
      console.log(state, island)
      const fundraiser = await getFundraisers(state, island)
      console.log(await fundraiser)
      setSignal(await fundraiser.filter(x => x.index == index)[0])
    }
  )


  const withdraw = useCallback(async (event) => {
    event.preventDefault()
    var hash = params.island

    const data = new Object(
      {
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
            "name": "i",
            "datatype": "U",
            "value": parseInt(params.index)
          }
        ]

      }
    )

    sendTransaction(data)
  })


  const supportGoal = useCallback(async (event) => {
    event.preventDefault()
    var HashAndIndex = params.island + params.index
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

  useEffect(() => {
    console.log("executed only once!");
    //checkRaised();
    getFunds();
  }, [state.ipfs]);

  return (
    <div className='py-10 min-w-full prose px-8'>
      <div className='card-body p-4'>
        <FlexBoxColumn className='card bg-primary shadow-md py-4 px-8'>
          {signal ? <>
            <SignalHeader signal={signal} deadline={deadlinestring} />
            <p dangerouslySetInnerHTML={{__html: signal.description}} />
              {signal.status === 0
                ? <>
                  <form onSubmit={supportGoal} className='text-center'>
                    <div className="form-control pr-4">
                      <label className="input-group">
                        <span className='bg-neutral text-white'>Dero</span>
                        <Input id="amount" placeholder="Dero amount to donate" />
                      </label>
                    </div>
                    <Checkbox id='refundable' label='Refundable?' />
                    <button className='btn btn-accent' type={"submit"}>Support</button>
                  </form>
                  {
                    raised >= signal.goal
                      ? <form onSubmit={withdraw}>
                          <Button size='sm' type={"submit"}>Withdraw</Button>
                        </form>
                      : ""
                  }
                </>
                : signal.status === 1
                  ? <>
                    <p>This Smoke Signal has met its fundraiser goal! If you are the owner, you can withdraw the funds to the fundee now.</p>
                    <form onSubmit={withdraw}>
                      <Button size='sm' type={"submit"}>Withdraw</Button>
                    </form>
                  </>
                  : signal.status === 2
                    ? <>
                        <p>This Smoke Signal failed to meet its goal. If you made a refundable donation, you can withdraw those funds now.</p>
                        <form onSubmit={withdraw}>
                          <Button size='sm' type={"submit"}>Withdraw</Button>
                        </form>
                      </>
                    : ""
              }
          </> : <p>Loading...</p>
          }
        </FlexBoxColumn>
      </div>
    </div>
  )
}