import React, { useState ,useContext} from "react";
import WalletMenu from "./menu";
import { LoginContext } from "./LoginContext";

function PopUpMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOption, setMenuOption] = useState("main");
  const [state,setState] = useContext(LoginContext)

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOptionClick = option => {
    setMenuOption(option);
  };

  return (
    <div>
      <button onClick={handleOpen}>{
        state.walletType=="rpc"?
        "Wallet [RPC]"
        :
      state.walletList?
      `Wallet [${state.walletList[state.activeWallet].name}]`
    :'Wallet'}</button>
      {isOpen && 
        
          
         
          <WalletMenu handleClose={handleClose} />
      }
    </div>
    
  );
}

export default PopUpMenu;
