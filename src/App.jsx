import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import './App.css';
import { LoginContext } from './LoginContext';
import { useGetSC } from './components/hooks/useGetSC';
import { default as GI } from './components/getIslands';
import hex2a from './components/hex2a';
import { useGetBalance } from './components/hooks/useGetBalance';
import LoggerContext, { LOG } from '@/components/providers/LoggerContext.jsx';
import { useInitializeWallet } from './components/hooks/useInitializeWallet';
import { useGetTransfers } from './components/hooks/useGetTransfers';
import { useGetAddress } from './components/hooks/useGetAddress';
import { useGetContracts } from './components/hooks/useGetContracts';

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [state, setState] = useContext(LoginContext);
  const logger = useContext(LoggerContext);
  const [getSC] = useGetSC();
  const [initializeWallet] = useInitializeWallet();
  const [getBalance] = useGetBalance();
  const [getAddress] = useGetAddress();
  const [getTransfers] = useGetTransfers();
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

  const COMPNAME = 'App.jsx';

  function toggleMenuActive() {
    if (menuActive) {
      setMenuActive(false);
      return;
    }
    if (!menuActive) {
      setMenuActive(true);
      return;
    }
  }

  const getSCID = async () => {
    let res = await getSC(
      '0000000000000000000000000000000000000000000000000000000000000001',
      ['keystore']
    );
    let keystore_scid = '80' + res.valuesstring[0].substring(2, 64);
    let res2 = await getSC(keystore_scid, [
      'k:private.islands.scid',
      'k:private.islands.coco',
    ]);
    let scid = res2.valuesstring[0];
    let coco = res2.valuesstring[1];
    logger(LOG.API, COMPNAME, 'get scid results', `${scid} ${coco}`);
    setState((state) => ({ ...state, scid: scid, coco: coco }));
  };

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

  async function run() {
    logger(LOG.INFO, COMPNAME, 'create worker');
    const worker = new Worker('worker.jsx');
    worker.postMessage({ type: 'initialize' });
    setState((state) => ({ ...state, worker: worker }));
  }

  useEffect(() => {
    initializeWallet();
    logger(LOG.INFO, COMPNAME, 'worker', workerActive);
    if (!workerActive) {
      run();
    }
  }, []);

  /*   async function createIPFSNode() {
    const node = await window.Ipfs.create();
    logger(LOG.INFO, COMPNAME, 'ipfs node created', node);
    const validIp4 =
      '/ip4/64.225.105.42/tcp/4001/p2p/QmPo1ygpngghu5it8u4Mr3ym6SEU2Wp2wA66Z91Y1S1g29';

    const rez = await node.bootstrap.add(validIp4);
    logger(LOG.API, COMPNAME, 'rez', rez.Peers);
    const config = await node.config.getAll();
    setState((state) => ({ ...state, ipfs: node }));
  }

  useEffect(() => {
    createIPFSNode();
  }, []); */

  useEffect(() => {
    async function fetchData() {
      const result = await getSCID();
      // do something with the result
    }

    fetchData();
  }, [state.daemon]);

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

    logger(LOG.API, COMPNAME, 'full island list', fullIslandList);
  };

  useEffect(() => {
    populateMyIslands();
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
