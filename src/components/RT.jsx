import React from 'react'
import to from 'await-to-js'
import { useSendTransaction } from '../useSendTransaction'




export default function RT(props){
  const [sendTransaction] = useSendTransaction()
  const accept=React.useCallback(async () => {

    const data = new Object({
      "scid": props.scid,
      "ringsize": 2,
       "sc_rpc": [{
          "name": "entrypoint",
          "datatype": "S",
          "value": "RT"
      },
      {
          "name": "H",
          "datatype": "S",
          "value": props.island+props.index
      }
  ]

    })
    sendTransaction(data)

/*     const deroBridgeApi = props.dba.current

     const [err0, res0] = await to(deroBridgeApi.wallet('start-transfer', {
      
         "scid": props.scid,
         "ringsize": 2,
          "sc_rpc": [{
             "name": "entrypoint",
             "datatype": "S",
             "value": "RT"
         },
         {
             "name": "H",
             "datatype": "S",
             "value": props.island+props.index
         }
     ]
     })) */

  }
  )


  

    
      
    



    return(<>
        <div>

          <button onClick={()=>accept()}>Release Treasure</button>
            
            </div>
       
        </>
    )
}