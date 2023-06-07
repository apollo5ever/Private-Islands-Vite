import React from 'react'
import to from 'await-to-js'
import { LoginContext } from '../LoginContext';
import { useSendTransaction } from '../useSendTransaction';





export default function TrustIsland(props){
    const [sendTransaction] = useSendTransaction()
const [state, setState] = React.useContext(LoginContext);
  const TI=React.useCallback(async (e) => {
    e.preventDefault()
let island=state.myIslands[state.active].name

const data = new Object({
    "scid": state.scid_registry,
    "ringsize": 2,
    "transfers":[
        {
            "destination":state.randomAddress,
            "burn":10000
        }
    ],
     "sc_rpc": [{
        "name": "entrypoint",
        "datatype": "S",
        "value": "RateAsset"
    },
    {
        "name": "scid",
        "datatype": "S",
        "value": props.island
    },
    {
        "name": "collection",
        "datatype": "S",
        "value": "PRIVATE-ISLANDS"
    },
    {
     "name":"rating",
     "datatype":"U",
     "value":parseInt(e.target.trust.value)
    },
    {
        "name":"comment",
        "datatype":"S",
        "value":e.target.comment.value
    }
]
})
sendTransaction(data)



/*       const deroBridgeApi = state.deroBridgeApiRef.current
     
      const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
       
          "scid": state.scid,
          "ringsize": 2,
           "sc_rpc": [{
              "name": "entrypoint",
              "datatype": "S",
              "value": "TI"
          },
          {
              "name": "H",
              "datatype": "S",
              "value": island
          },
          {
              "name": "I",
              "datatype": "S",
              "value": props.island
          },
          {
           "name":"T",
           "datatype":"U",
           "value":parseInt(e.target.trust.value)
          }
      ]
      })) */




  })
  


  

    
      
    



    return(<>
        <div>
{state.myIslands?
<div><h3>Rate Island (0.1 Dero fee)</h3>
<form onSubmit={TI}>
          <select id="trust"><option value="0">Distrust Completely</option><option value="25">Somewhat Distrust</option><option value="50">Neutral</option><option value="75">Somewhat Trust</option><option value="100">Trust Completely</option></select>
          <input id="comment" placeholder='comment'/>
          <button type="submit">Select</button>
           </form> 
           </div>:""}
            </div>
       
        </>
    )
}