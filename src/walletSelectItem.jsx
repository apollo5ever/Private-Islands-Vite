import React, { useState,useContext } from "react";
import { LoginContext } from "./LoginContext";


const WalletSelectItem = (props) => {
    
    const [state, setState] = useContext(LoginContext);
    return(<div className={props.selected==props.i?"walletSelectItem-Selected":"walletSelectItem"} onClick={()=>{props.selectWallet(props.i)}}>
        <p><b>{props.name}</b> {props.address.substring(0,7)+"..."+props.address.substring(props.address.length-7,props.address.length)}</p>
        
</div>
    );
}; 
export default WalletSelectItem;