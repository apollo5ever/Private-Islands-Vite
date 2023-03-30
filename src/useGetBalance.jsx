import React, { useState,useContext,useCallback } from "react";
import { LoginContext } from "./LoginContext";
import to from "await-to-js";
import initialize from "./initialize";

export function useGetBalance(){
    const [state, setState] = useContext(LoginContext);

  

      const getBalanceRPC = useCallback(async (scid) => {
        if(state.activeWallet != 0) return
        const deroBridgeApi = state.deroBridgeApiRef.current;
        const [err, res] = await to(
          deroBridgeApi.wallet("get-balance", {
            "scid":scid
          })
        );

        return res.data.result.balance
        
      });

async function  getBalance(scid){    if(state.activeWallet == 0){
      
    let balance = await getBalanceRPC(scid)
    return balance
    }else{     
   
  if(!state.walletList[state.activeWallet].open) return


  
  const tx = await new Promise((resolve) => {
    state.worker.onmessage = (event) => {
      resolve(event.data);
    }; 
  
    state.worker.postMessage({ functionName: "WalletGetBalance", args: ["key",state.walletList[state.activeWallet].name, scid] });
  });
  
  console.log('TX',tx)
  return(tx.key.matureBalance)

  
  const interval = setInterval(async() => {
    if (tx) {
      clearInterval(interval);
      console.log(tx)
  
      let asyncKey2 = "sent";
     
      const send = await new Promise((resolve) => {
        state.worker.onmessage = (event) => {
          resolve(event.data);
        }; 
      
        
      });
      console.log("send",send)
      return send.key.matureBalance
      
    }
  }, 100); // check every 100ms    
    }
  
  }


return [getBalance]
}; 
