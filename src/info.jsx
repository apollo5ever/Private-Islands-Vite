import React, { useState,useContext } from "react";
import { LoginContext } from "./LoginContext";


const Info = () => {
    const [state, setState] = useContext(LoginContext);
    return(<div>
        
{state.walletList && state.walletList.map(x=><p><b>{x.name}</b>{x.address}</p>)
}
</div>
    );
}; 
export default Info;