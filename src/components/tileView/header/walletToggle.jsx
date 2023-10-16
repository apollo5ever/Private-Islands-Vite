import React, { useState, useContext } from 'react';
import { LoginContext } from '@/LoginContext.jsx';
import { useRPCWallet } from '../../hooks/useRPCWallet.jsx';
import { walletModes, daemonModes } from '@/utils/helpers.js';
import DaemonToggle from '@/components/tileView/header/daemonToggle.jsx';

const WalletToggle = () => {
  const [state, setState] = useContext(LoginContext);
  const [walletMode, setWalletMode] = useState(walletModes.RPC);
  const [daemonMode, setDaemonMode] = useState(daemonModes.POOLS);
  const [isDaemonVisible, setIsDaemonVisible] = useState(false);

  const handleWalletToggle = (value) => {
    setWalletMode(value);
    setState((state) => ({ ...state, walletMode: value }));
    console.log('changing wllet mode to ', value);

    if (value === walletModes.RPC && !isDaemonVisible) {
      setIsDaemonVisible(true);
    }
  };

  const handleDaemonToggle = (value) => {
    setDaemonMode(value);
    setState((state) => ({ ...state, daemonMode: value }));
    setIsDaemonVisible(false);
  };

  return (
    <div className="relative inline-block">
      <label
        className={`cursor-pointer border-2 px-10 py-2 ${
          walletMode === walletModes.XSWD
            ? 'bg-success text-neutral'
            : 'bg-gray-300 text-neutral'
        } rounded-l-xl`}
      >
        <input
          type="radio"
          value={walletModes.XSWD}
          className="hidden"
          onChange={() => handleWalletToggle(walletModes.XSWD)}
          checked={walletMode === walletModes.XSWD}
        />
        xswd
      </label>

      <label
        className={`cursor-pointer border-2 px-10 py-2 ${
          walletMode === walletModes.RPC
            ? 'bg-success text-neutral'
            : 'bg-gray-300 text-neutral'
        } rounded-r-xl`}
      >
        <input
          type="radio"
          value={walletModes.RPC}
          className="hidden"
          onClick={() => {
            handleWalletToggle(walletModes.RPC);
            setIsDaemonVisible(true);
          }}
          checked={walletMode === walletModes.RPC}
        />
        rpc
      </label>
      {walletMode === walletModes.RPC &&
        isDaemonVisible && ( // Added isDaemonVisible condition
          <div className="w-5/8 absolute right-4 top-full z-10 mt-0 shadow-lg">
            <div className="flex-end flex">
              <DaemonToggle
                onDaemonClick={handleDaemonToggle}
                selectedDaemonMode={daemonMode}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default WalletToggle;
