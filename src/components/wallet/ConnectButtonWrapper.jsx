import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const ConnectButtonWrapper = ({ onClose }) => {
  const handleClick = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  return (
    <div onClick={handleClick}>
      <ConnectButton label="Ethereum Wallet" />
    </div>
  );
};
