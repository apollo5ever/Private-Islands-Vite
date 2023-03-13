import React, { useState,useContext } from "react";
import { LoginContext } from "./LoginContext";
import to from "await-to-js";

export function SendTransaction(data){
    const [state, setState] = useContext(LoginContext);

    const rpcSend=React.useCallback(async (d) => {
        const deroBridgeApi = state.deroBridgeApiRef.current
   
         const [err, res] = await to(deroBridgeApi.wallet('start-transfer', d))
    
      }
      )

    if(state.walletType == "rpc"){
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

        let asyncKey = "tx";
        const tx = window.WalletTransfer("tx", state.walletInfo.value.hexSeed, JSON.stringify(wasmData))
        
        const interval = setInterval(() => {
          if (window[asyncKey]) {
            clearInterval(interval);
            console.log(window[asyncKey])
        
            let asyncKey2 = "sent";
            const send = window.WalletSendTransaction("sent", state.walletInfo.value.hexSeed, window[asyncKey].txHex)
            console.log(send)
            console.log(window[asyncKey2])
          }
        }, 100); // check every 100ms
        
    }



}; 
