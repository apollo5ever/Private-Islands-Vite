import React, {useState, useEffect, useContext, useRef, useCallback} from 'react'
import {Outlet} from "react-router-dom";
import './App.css'
import {LoginContext} from './LoginContext';
import {useGetSC} from './useGetSC';
import {default as GI} from './components/getIslands';
import hex2a from './components/hex2a';
import {useGetBalance} from './useGetBalance';
import {Button} from "react-daisyui";


function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [state, setState] = useContext(LoginContext)
  const [getSC] = useGetSC()
  const [getBalance] = useGetBalance()
  const [workerActive, setWorkerActive] = useState(false)
  const [bridgeInitText, setBridgeInitText] = useState(
    <a
      href="https://chrome.google.com/webstore/detail/dero-rpc-bridge/nmofcfcaegdplgbjnadipebgfbodplpd"
      target="_blank"
      rel="noopener noreferrer"
    >
      Not connected to extension. Download here.
    </a>
  );

  useEffect(() => {
    getCocoBalance();
  }, [state.scid, state.activeWallet, state.walletList[state.activeWallet].open]);

  useEffect(() => {
    console.log("worker", workerActive)
    if (!workerActive) {
      run()
    }
  }, [])

  useEffect(() => {
    createIPFSNode()
  }, [])

  useEffect(() => {
    async function fetchData() {
      const result = await getSCID();
      // do something with the result
    }
    fetchData();
  }, [state.daemon]);

  useEffect(() => {
    getIslands();
  }, [state.deroBridgeApiRef, state.ipfs, state.activeWallet, state.scid]);

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
    let res = await getSC("0000000000000000000000000000000000000000000000000000000000000001", ["keystore"])
    let keystore_scid = "80" + res.valuesstring[0].substring(2, 64);
    let res2 = await getSC(keystore_scid, ["k:private.islands.scid", "k:private.islands.coco"])
    let scid = res2.valuesstring[0];
    let coco = res2.valuesstring[1];
    console.log("get scid results", scid, coco)
    setState((state) => ({...state, scid: scid, coco: coco}));
  };

  const getCocoBalance = useCallback(async () => {
    if (!state.coco) return
    const balance = await getBalance(state.coco)
    setState((state) => ({...state, cocoBalance: balance}))
  });

  async function run() {
    const worker = new Worker('worker.jsx');
    worker.postMessage({type: 'initialize'});
    setState((state) => ({...state, "worker": worker}));
  }

  async function createIPFSNode() {
    const node = await window.Ipfs.create()
    const validIp4 = "/ip4/64.225.105.42/tcp/4001/p2p/QmPo1ygpngghu5it8u4Mr3ym6SEU2Wp2wA66Z91Y1S1g29";
    const rez = await node.bootstrap.add(validIp4);
    const config = await node.config.getAll();
    setState((state) => ({...state, ipfs: node}))
  }

  const getIslands = async () => {
    state
    if (!state.walletList[state.activeWallet].address) return
    console.log("address exists")
    let res = await getSC(state.scid)

    var search = new RegExp(`.*_O`);
    var scData = res.stringkeys; //.map(x=>x.match(search))
    console.log("scData", scData);
    var myIslands = [];

    const myList = Object.keys(scData)
      .filter((key) => search.test(key))
      .filter((key) => hex2a(scData[key]) == state.walletList[state.activeWallet].address)
      .map(
        (key) =>
          new Object({
            name: key.substring(0, key.length - 2),
            meta: hex2a(scData[`${key.substring(0, key.length - 2)}_M`]),
            j: scData[`${key.substring(0, key.length - 2)}_j`],
          })
      );
    console.log("MY LIST", myList);
    for (var i = 0; i < myList.length; i++) {
      let island = await GI(state, myList[i].name)
      myIslands.push(island)
    }

    setState((state) => ({...state, myIslands: myIslands, active: 0}));
  }

  return (
    <div className="App">
      <Outlet />
      <h3>Coco Balance: {state.cocoBalance}</h3>
      <Button size='sm' onClick={() => {
        console.log(state)
      }}>State</Button>
    </div>
  )
}

export default App
