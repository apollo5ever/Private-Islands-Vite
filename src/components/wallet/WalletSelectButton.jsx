import React, { useState, useContext } from 'react';
import WalletModal from './WalletModal.jsx';
import { LoginContext } from '../../LoginContext.jsx';
import { Button } from '@/components/common/Button.jsx';

const WalletSelectButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOption, setMenuOption] = useState('main');
  const [state, setState] = useContext(LoginContext);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    console.log('CALLED HANDLE CLOSE');
    setIsOpen(false);
  };

  const handleOptionClick = (option) => {
    setMenuOption(option);
  };

  return (
    <>
      <Button
        size="lg"
        type="accent"
        color="text-default"
        handleClick={handleOpen}
      >
        {state.walletList[state.activeWallet].address
          ? `Wallet [${state.walletList[state.activeWallet].name}]`
          : 'Connect Wallet'}
      </Button>
      {isOpen && <WalletModal handleClose={handleClose} />}
    </>
  );
};

export default WalletSelectButton;
