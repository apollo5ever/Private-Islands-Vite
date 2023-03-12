import React, { useState } from "react";
import WalletMenu from "./menu";

function PopUpMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOption, setMenuOption] = useState("main");

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
      <button onClick={handleOpen}>Open Menu</button>
      {isOpen && 
        
          
         
          <WalletMenu handleClose={handleClose} />
      }
    </div>
    
  );
}

export default PopUpMenu;
