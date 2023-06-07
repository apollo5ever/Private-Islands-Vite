import React from 'react'
import to from 'await-to-js'
import hex2a from './hex2a'
import { useSendTransaction } from '../useSendTransaction'
import { useGetSC } from '../useGetSC'



export default function N(props){
  const [sendTransaction] = useSendTransaction()
  const [getSC] =useGetSC()
    const [judges,setJudges] = React.useState([])
    const [execs,setExecs] = React.useState([])


    const getJudges = React.useCallback(async () =>{
      const res = await getSC(props.scid_registry)
      console.log("get judges res",res)
      var search = new RegExp(`N::PRIVATE-ISLANDS::*`)
      var scData = res.stringkeys //.map(x=>x.match(search))
  
  
      const judgeList = Object.keys(scData)
        .filter(key => search.test(key))
        .map(key => <option value={key.substring(20,)}>{hex2a(scData[key])}</option>)
  
      setJudges(judgeList)
    
      })

  const nominate=React.useCallback(async (e) => {
    e.preventDefault()

    const data = new Object(
      {
        "scid": props.scid_bounties,
         "ringsize": 2,
         "transfers":[
          {
            "destination":props.randomAddress,
            "burn":1,
            "scid":props.island
          }
         ],
          "sc_rpc": [{
             "name": "entrypoint",
             "datatype": "S",
             "value": "N"
         },
         {
             "name": "H",
             "datatype": "S",
             "value": props.island
         },
         {
            "name": "i",
            "datatype": "U",
            "value":parseInt(props.index)
         },
         {
             "name": "JX",
             "datatype": "S",
             "value": e.target.JX.value
         },
         {
          "name":"l",
          "datatype":"S",
          "value":props.l
         }
     ]
      }
    )

      sendTransaction(data)


     const deroBridgeApi = props.dba.current

/*
     const [err0, res0] = await to(deroBridgeApi.wallet('start-transfer', {
      
         "scid": props.scid,
         "ringsize": 2,
          "sc_rpc": [{
             "name": "entrypoint",
             "datatype": "S",
             "value": "N"
         },
         {
             "name": "H",
             "datatype": "S",
             "value": props.island
         },
         {
            "name": "i",
            "datatype": "U",
            "value":parseInt(props.index)
         },
         {
             "name": "JX",
             "datatype": "S",
             "value": e.target.JX.value
         },
         {
          "name":"l",
          "datatype":"S",
          "value":props.l
         }
     ]
     })) */

/*      const [err, res] = await to(deroBridgeApi.daemon('get-sc', {
        scid:props.scid,
        code:false,
        variables:true
})) */
/* 
const res = await getSC(props.scid)

     const Address=hex2a(res.stringkeys[`${e.target.JX.value}_O`])
     const data2 = new Object(
      {
        "ringsize":2,
        "transfers":[
        {"destination":Address,
        "amount":1,
            
        "payload_rpc":[
                {
                        "name": "C",
                        "datatype": "S",
                        "value": "You have been nominated for bounty executer by: " +props.island
                }]
                }]
      }
     )
     sendTransaction(data2) */


/*      const [err3,res3] =await to(deroBridgeApi.wallet('start-transfer',{
       "ringsize":2,
       "transfers":[
       {"destination":Address,
       "amount":1,
           
       "payload_rpc":[
               {
                       "name": "C",
                       "datatype": "S",
                       "value": "You have been nominated for bounty executer by: " +props.island
               }]
               }]
     })) */

  }
  )

  React.useEffect(()=>{
    getJudges()
  },[])


 
    return(<>
        <div>
            <form onSubmit={nominate}>
                {props.l=="X"?
                <select id="JX">{judges}</select>:
                props.l=="J"?
            <select id="JX">{judges}</select>
        :""}
        <button type="submit">Nominate{props.l=="J"?" Judge":" Executer"}</button>
            </form>

          
            
            </div>
       
        </>
    )
}