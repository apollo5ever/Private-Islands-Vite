import React, { useState,useContext } from "react";
import { LoginContext } from "./LoginContext";
import to from "await-to-js";
import initialize from "./initialize";

export function useSendTransaction(){
    const [state, setState] = useContext(LoginContext);

    const rpcSend=React.useCallback(async (d) => {
        const deroBridgeApi = state.deroBridgeApiRef.current
   
         const [err, res] = await to(deroBridgeApi.wallet('start-transfer', d))
    
      }
      )

async function  sendTransaction(data){    if(state.walletType == "rpc"){
        const rpcData ={
            "scid": data.scid,
            "ringsize": data.ringsize,
            "transfers": data.transfers,
            "sc_rpc": data.sc_rpc
          }

          rpcSend(rpcData)
    
    }else if(state.walletType =="WASM"){     
      const wasmData ={
        "Transfers": data.transfers,
        "SC_Code": "",
        "scid": data.scid,
        "SC_RPC": data.sc_rpc,
        "Ringsize": data.ringsize,
        "Fees": data.fees
    }
  

console.log('WINDOW',window)
console.log('STATE',state)
let fileData = JSON.parse(state.fileData)
console.log(fileData)
console.log(JSON.stringify(fileData))
/* const init = await initialize()
    console.log('INITIALIZED RESULT',init)

let err=  window.OpenWallet(state.walletList[0].hexSeed,pass,JSON.stringify(fileData),true)
console.log(err)
console.log(state.walletList[0]) */

  let asyncKey = "tx";
  const tx = await new Promise((resolve) => {
    state.worker.onmessage = (event) => {
      resolve(event.data);
    }; 
  
    state.worker.postMessage({ functionName: "WalletTransfer", args: ["key",state.walletList[0].hexSeed, JSON.stringify(wasmData)] });
  });
  //const tx = state.worker.postMessage("WalletTransfer",["tx", state.walletList[0].hexSeed, JSON.stringify(wasmData)])
  console.log('TX',tx)
  console.log("wasmData",wasmData)
  
  const interval = setInterval(async() => {
    if (tx) {
      clearInterval(interval);
      console.log(tx)
  
      let asyncKey2 = "sent";
     // const send = window.WalletSendTransaction("sent", state.walletList[0].hexSeed, window[asyncKey].txHex)
      const send = await new Promise((resolve) => {
        state.worker.onmessage = (event) => {
          resolve(event.data);
        }; 
      
        state.worker.postMessage({ functionName: "WalletSendTransaction", args: ["key", state.walletList[0].hexSeed, tx.key.txHex] });
      });
      console.log("send",send)
      //console.log("window[asyncKey2]",window[asyncKey2])
    }
  }, 100); // check every 100ms    
    }}


return [sendTransaction]
}; 
