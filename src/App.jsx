import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
// import './App.css';
import { LoginContext } from './LoginContext';
import { useGetSC } from './components/hooks/useGetSC';
import { default as GI } from './components/getIslands';
import hex2a from './components/hex2a';
import { useGetBalance } from './components/hooks/useGetBalance';
import LoggerContext, { LOG } from '@/components/providers/LoggerContext.jsx';

import { useGetTransfers } from './components/hooks/useGetTransfers';
import { useGetAddress } from './components/hooks/useGetAddress';
import { useGetContracts } from './components/hooks/useGetContracts';
import { useGetRandomAddress } from './components/hooks/useGetRandomAddress';
import { PageHeader } from '@/components/tileView/header/PageHeader.jsx';
import ThemeContext from './components/providers/ThemeContext';

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const theme = useContext(ThemeContext);
  const [state, setState] = useContext(LoginContext);
  const logger = useContext(LoggerContext);
  const [getSC] = useGetSC();

  const [getBalance] = useGetBalance();
  const [getAddress] = useGetAddress();
  const [getTransfers] = useGetTransfers();
  const [getRandomAddress] = useGetRandomAddress();
  const [getContracts] = useGetContracts();

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
  }, [state.xswd]);

  return (
    <>
      <PageHeader />
      <div className="App">
        <Outlet />
        <div
          style={{
            color: '#B6DCE4',
            display: theme.theme == 'dark' ? 'none' : 'block',
          }}
        >
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
      </div>
    </>
  );
}

export default App;
