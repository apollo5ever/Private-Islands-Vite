import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { LoginContext } from './LoginContext';
import { useGetSC } from './components/hooks/useGetSC';
import { default as GI } from './components/getIslands';
import { useGetBalance } from './components/hooks/useGetBalance';
import LoggerContext, { LOG } from '@/components/providers/LoggerContext.jsx';
import { useInitializeWallet } from './components/hooks/useInitializeWallet';
import { useGetTransfers } from './components/hooks/useGetTransfers';
import { useGetAddress } from './components/hooks/useGetAddress';
import { useGetContracts } from './components/hooks/useGetContracts';
import { useGetRandomAddress } from './components/hooks/useGetRandomAddress';

function App() {
  const [state, setState] = useContext(LoginContext);
  const logger = useContext(LoggerContext);
  const [initializeWallet] = useInitializeWallet();
  const [getBalance] = useGetBalance();
  const [getAddress] = useGetAddress();
  const [getTransfers] = useGetTransfers();
  const [getRandomAddress] = useGetRandomAddress();
  const [getContracts] = useGetContracts();
  const [workerActive, setWorkerActive] = useState(false);
  const [bridgeInitText, setBridgeInitText] = useState(
    <a
      href="https://chrome.google.com/webstore/detail/dero-rpc-bridge/nmofcfcaegdplgbjnadipebgfbodplpd"
      target="_blank"
      rel="noopener noreferrer"
    >
      Not connected to extension. Download here.
    </a>
  );
  const navigate = useNavigate();

  const COMPNAME = 'App.jsx';

  const getCocoBalance = useCallback(async () => {
    if (!state.coco) return;
    let balance = await getBalance(state.coco);
    if (!balance) {
      logger(LOG.DEBUG, COMPNAME, 'no balance');
      setTimeout(async () => {
        let balance = await getBalance(state.coco);
      }, 15000);
    }
    setState((state) => ({ ...state, cocoBalance: balance }));
  });

  useEffect(() => {
    initializeWallet();
    getCocoBalance();
  }, [state.walletMode]);

  const handleDaemonToggle = async () => {
    const randomAddress = await getRandomAddress();
    setState((state) => ({ ...state, randomAddress: randomAddress }));
  };
  useEffect(() => {
    handleDaemonToggle();
  }, [state.daemonMode]);

  const populateMyIslands = async () => {
    //okay so we can get array of island objects from backend
    //user needs to prove ownership...
    //or maybe they just say they own it and it saves to local storage
    //weird if they switch wallets but could associate with wallet too
    //store {name:"apollo","scid":"ddd",owner:"dero23asd"}or I guess do what deronfts does, just search the collection
    //NEW PLAN
    //we have list of assets, check wallet balance for each one
    const fullIslandList = await GI();
    logger(LOG.API, COMPNAME, 'full island list', fullIslandList);
    console.log('populate my islands', fullIslandList);
    //perfect now we need to check balance but do we have a wallet agnostic way to do this yet?
    //looks like we do
    //first let's make empty array
    let myIslands = [];
    for (let i = 0; i < fullIslandList.length; i++) {
      console.log('populate for loop ', i, fullIslandList[i].SCID);
      let balance = await getBalance(fullIslandList[i].SCID);
      console.log('populate my islands balance ', i, balance);
      if (balance > 0) {
        myIslands.push(fullIslandList[i]);
      }
      logger(LOG.API, COMPNAME, 'scid', fullIslandList[i].scid);
      logger(LOG.API, COMPNAME, 'balance', balance);
    }
    //set state array of myislands and set active island to 0
    setState((state) => ({ ...state, myIslands: myIslands, active: 0 }));

    logger(LOG.DEBUG, COMPNAME, 'full island list', fullIslandList);
    navigate('/archipelago');
  };

  useEffect(() => {
    if (state.deroBridgeApiRef) {
      populateMyIslands();
    }
  }, [state.deroBridgeApiRef, state.ipfs, state.walletMode, state.scid]);

  return (
    <div className="App">
      <Outlet />
      <h3>Coco Balance: {state.cocoBalance}</h3>
      <button
        onClick={() => {
          logger(LOG.DEBUG, COMPNAME, 'state', state);
        }}
      >
        State
      </button>
      <button
        onClick={() => {
          getContracts();
        }}
      >
        Get Contracts
      </button>
    </div>
  );
}

export default App;
