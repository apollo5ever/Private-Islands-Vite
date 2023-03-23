import React, { useState,useContext } from "react";
import { LoginContext } from "./LoginContext";
import WalletSelectItem from "./walletSelectItem";


const Info = () => {
    const [state, setState] = useContext(LoginContext);
    const [selected,setSelected] = useState(null)

    const selectWallet = (i)=>{
        setState({...state,"selectedWallet":i})
        setSelected(i)

    }
    return(<div>
        
{state.walletList && state.walletList.map((x,i)=><WalletSelectItem name={x.name} address={x.address} i={i} selectWallet={selectWallet} selected={selected}/>)
}
</div>
    );
}; 
export default Info;