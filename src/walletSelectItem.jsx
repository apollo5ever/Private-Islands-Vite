import React, { useState,useContext } from "react";
import { LoginContext } from "./LoginContext";


const WalletSelectItem = (props) => {

    

    const selectWallet = (i)=>{
        setState({...state,"activeWallet":i})
       

    }
    
    const [state, setState] = useContext(LoginContext);
    return(<div className={state.activeWallet==props.i?"walletSelectItem-Selected":"walletSelectItem"} onClick={()=>{selectWallet(props.i)}}>

        <p><b>{props.name}</b> {props.address.substring(0,7)+"..."+props.address.substring(props.address.length-7,props.address.length)}{state.walletList[props.i].open?
        "[open]":"[closed]"}</p>

        
</div>
    );
}; 
export default WalletSelectItem;