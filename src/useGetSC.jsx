import to from "await-to-js";
import React from "react";
import { LoginContext } from "./LoginContext";
import { useContext } from "react";


export function useGetSC(){
  const [state, setState] = useContext(LoginContext);

  async function  getSC(scid,keysstring){    
    if(state.daemon == "rpc"){

    const deroBridgeApi = state.deroBridgeApiRef.current;

    const [err, res] = await to(
      deroBridgeApi.daemon("get-sc", {
        scid: scid,
        variables: true,
        keysstring:keysstring
      })
    );
 return res.data.result
}else if(state.daemon =="pools"){   
  let data
  if(keysstring){
 data = JSON.stringify({
    "jsonrpc": "2.0",
    "id": "1",
    "method": "DERO.GetSC",
    "params": {
      "scid": scid,
      "code": false,
      "variables": true,
      "keysstring":keysstring
    }
  });
  } else{
    data = JSON.stringify({
      "jsonrpc": "2.0",
      "id": "1",
      "method": "DERO.GetSC",
      "params": {
        "scid": scid,
        "code": false,
        "variables": true
      }
    
  }
    )
}
 
 let res =await fetch(`https://dero-api.mysrv.cloud/json_rpc`, {
    method: 'POST',
   
    body: data,
    headers: {'Content-Type': 'application/json' }
  }) 
  console.log("RES",res)
  let body = await res.json()
        console.log(body)
       let scData = body.result
       console.log(`scData ${scid}`,scData)

  return scData

}

  }
  return [getSC]
}

