import React,{ useState,useEffect, useContext,useRef,useCallback } from 'react'
import PopUpMenu from './popup';
import { Outlet, NavLink, Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import './App.css'
import { LoginContext } from './LoginContext';
import { useGetSC } from './useGetSC';
import {default as GI} from './components/getIslands';
import hex2a from './components/hex2a';
import { useGetBalance } from './useGetBalance';
import WalletSelectButton from "@/components/wallet/WalletSelectButton.jsx";


function App() {
  console.log("app rendered")
  const [menuActive, setMenuActive] = useState(false);
  const [state,setState] = useContext(LoginContext)
  const deroBridgeApiRef = useRef();
  const [getSC] = useGetSC()
  const [getBalance] =useGetBalance()
  const [workerActive,setWorkerActive] = useState(false)
  const [bridgeInitText, setBridgeInitText] = useState(
    <a
      href="https://chrome.google.com/webstore/detail/dero-rpc-bridge/nmofcfcaegdplgbjnadipebgfbodplpd"
      target="_blank"
      rel="noopener noreferrer"
    >
      Not connected to extension. Download here.
    </a>
  );

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

  /*   function hex2a(hex) {
      var str = "";
      for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return str;
    } */

  /*  useEffect(() => {
     setState((state) => ({ ...state, daemon:"pools" }))

   }, []); */



  const getSCID = async () => {
    console.log('getting scid')
    /*     const deroBridgeApi = deroBridgeApiRef.current;
        const [err, res] = await to(
          deroBridgeApi.daemon("get-sc", {
            scid: "0000000000000000000000000000000000000000000000000000000000000001",
            keysstring: ["keystore"],
          })
        ); */
    let res = await getSC("0000000000000000000000000000000000000000000000000000000000000001",["keystore"])
    let keystore_scid = "80" + res.valuesstring[0].substring(2, 64);
    /*     const [err2, res2] = await to(
          deroBridgeApi.daemon("get-sc", {
            scid: keystore_scid,
            keysstring: ["k:private.islands.scid", "k:private.islands.coco"],
          })
        ); */
    let res2 = await getSC(keystore_scid,["k:private.islands.scid", "k:private.islands.coco"])
    let scid = res2.valuesstring[0];
    let coco = res2.valuesstring[1];
    console.log("get scid results",scid,coco)
    setState((state) => ({ ...state, scid: scid, coco: coco }));
  };


  const getCocoBalance = useCallback(async () => {
    if(!state.coco) return
    let balance = await getBalance(state.coco)
    setState((state) => ({...state,cocoBalance: balance}))

    /*  if(state.activeWallet != 0) return
     const deroBridgeApi = deroBridgeApiRef.current;
     const [err, res] = await to(
       deroBridgeApi.wallet("get-balance", {
         scid: state.coco,
       })
     );
     console.log("balance:", res.data.result.balance);
     setState((state) => ({ ...state, cocoBalance: res.data.result.balance })); */
  });

  useEffect(() => {
    getCocoBalance();
  }, [state.scid, state.activeWallet,state.walletList[state.activeWallet].open]);




  async function run() {

    /*  const GO = new Go();
     const wasm = await fetch('dero_wallet.wasm');
     console.log(wasm)
     const { instance } = await WebAssembly.instantiateStreaming(wasm,GO.importObject);
     GO.run(instance) */
    console.log("create worker")
    const worker = new Worker('src/worker.jsx');
    worker.postMessage({ type: 'initialize'});
    setState((state)=>({...state,"worker":worker}));




//  initialize()

//   const walletInfo = window.CreateNewWallet("pass")

//   const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
//   const decoder = new TextDecoder();
//   const jsonString = decoder.decode(arrayBuffer);
//   const jsonObject = JSON.parse(jsonString);
//   const fileData=JSON.stringify(jsonObject)

//   let err=  window.OpenWallet(walletInfo.value.hexSeed,"pass",fileData,true)
//   console.log(err)
//   console.log(walletInfo)
//   let wallet = walletInfo.value

  }
  useEffect(()=>{
    console.log("worker",workerActive)
    if(!workerActive){
      run()
    }

  },[])


  async function createIPFSNode() {
    const node = await window.Ipfs.create()
    console.log('IPFS node created:', node)
    const validIp4 =
      "/ip4/64.225.105.42/tcp/4001/p2p/QmPo1ygpngghu5it8u4Mr3ym6SEU2Wp2wA66Z91Y1S1g29";

    const rez = await node.bootstrap.add(validIp4);
    console.log(rez.Peers);
    const config = await node.config.getAll();
    setState((state)=>({...state,ipfs:node}))

  }

  useEffect(()=>{
    createIPFSNode()
  },[])

  useEffect(() => {
    console.log("using effect")
    async function fetchData() {
      const result = await getSCID();
      // do something with the result
    }
    fetchData();
  }, [state.daemon]);


  const getIslands = async () => {state
    console.log("GET ISLANDS");
    if(!state.walletList[state.activeWallet].address) return
    console.log("address exists")
    let res = await getSC(state.scid)
    /*   const deroBridgeApi = state.deroBridgeApiRef.current;
      const [err, res] = await to(
        deroBridgeApi.daemon("get-sc", {
          scid: state.scid,
          variables: true,
        })
      ); */

    console.log("res",res)

    var search = new RegExp(`.*_O`);
    console.log("search", search);
    var scData = res.stringkeys; //.map(x=>x.match(search))
    console.log("scData",scData);
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
      /*     let k = myList[i].meta;
          let j = myList[i].j;
          for await (const buf of state.ipfs.cat(k)) {
            console.log("buf",buf.toString())
            let m = await JSON.parse(buf.toString());
            m.j = j;
            myIslands.push(m);
          } */
      let island = await GI(state,myList[i].name)
      island[0].j = myList[i].j
      console.log("geet islands return",island)
      myIslands.push(island[0])
    }

    setState((state) => ({ ...state, myIslands: myIslands, active: 0 }));
  }

  useEffect(() => {
    getIslands();
  }, [state.deroBridgeApiRef, state.ipfs, state.activeWallet,state.scid]);





  return (
    <div className="App">

      <div className="navbar">

        <h1 className="nav-header">Dero Private Islands</h1>
        <WalletSelectButton />
        <div className="menu-bars" onClick={() => toggleMenuActive()}>
          <FaIcons.FaBars size={40} />
        </div>
      </div>
      <div className={menuActive ? "dropdown-menu" : "dropdown-menu inactive"}>
        <NavLink className="navlink" to="archipelago">
          <div className="navlink-text">Explore Archipelago</div>
        </NavLink>
        <NavLink className="navlink" to="claimisland">
          <div className="navlink-text">Claim Your Private Island</div>
        </NavLink>
        <NavLink className="navlink" to="myisland">
          <div className="navlink-text">My Island</div>
        </NavLink>
        <NavLink className="navlink" to="about?view=features">
          <div className="navlink-text">About</div>
        </NavLink>
        <NavLink className="navlink" to="oao">
          <div className="navlink-text">OAO</div>
        </NavLink>

      </div>

      <div className="rpc-bridge-data"></div>

      <Outlet />
      <h3>Coco Balance: {state.cocoBalance}</h3>


    {/*   {state.activeWallet==0? <small
          onClick={() => {
            getAddress();
          }}
        >
          Refresh Wallet
        </small>
        :""} */}
      


    </div>
  )
}

export default App