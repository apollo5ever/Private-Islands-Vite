import React, { useState,useContext } from "react";
import { LoginContext } from "./LoginContext";


const Sc = () => {
    const [state, setState] = useContext(LoginContext);

    const execute = () =>{
        const data ={
            "Transfers": [
                {
                    "destination": "dero1qytqfq2feqy63k0ycdj464h93h5xpqnwhwqldhqphha599jnwx60yqq4m3zxj",
                    "burn": 10000
                }
            ],
            "SC_Code": "",
            "scid": "ce99faba61d984bd4163b31dd4da02c5bff32445aaaa6fc70f14fe0d257a15c3",
            "SC_RPC": [{
                "name": "entrypoint",
                "datatype": "S",
                "value": "AS"
            },
            {
                "name": "T",
                "datatype": "S",
                "value": "Dero Boys0"
            },{
                "name": "S",
                "datatype": "S",
                "value": "dero1qyczef08vznftr9w4dg6f4ejracm4wuemq8hyczqudxn8y8h8w6evqgdqnncr"
            }],
            "Ringsize": 2,
            "Fees": 500
        }
        




        let asyncKey = "tx";
        const tx = window.WalletTransfer("tx", state.walletInfo.value.hexSeed, JSON.stringify(data))
        
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

    return(<div>
<button onClick={()=>{execute()}}>Execute</button>
<button onClick={()=>{console.log(window["sent"])}}>Log</button>
</div>
    );
}; 
export default Sc;