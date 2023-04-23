import React, {useState, useContext} from "react";
import {LoginContext} from "../../LoginContext.jsx";
import Info from "../../info.jsx";
import {useRPCWallet} from "../useRPCWallet.jsx";
import {FlexBoxColumn} from "@/components/common/FlexBoxColumn.jsx";
import {FlexBoxRow} from "@/components/common/FlexBoxRow.jsx";
import {Button, Divider, Modal} from 'react-daisyui';
import WalletSelectItem from "@/walletSelectItem.jsx";
import { ConnectButton } from '@rainbow-me/rainbowkit';


const WalletModal = ({handleClose}) => {
  const [menuOption, setMenuOption] = useState("main");
  const [state, setState] = useContext(LoginContext);
  const [walletInfo, isLoading, error, fetchWalletInfo] = useRPCWallet();

  const handleOptionClick = option => {
    setMenuOption(option);
  };

  const handleSelectRPC = () => {
    fetchWalletInfo()
  }

  const handleSubmitSeed = async (e) => {
    e.preventDefault()

    let name = e.target.name.value
    let pass = e.target.pass.value
    let conf = e.target.conf.value
    let seed = e.target.seed.value
    if (pass != conf) return
    console.log('HandleSubmitSeed - State', state)

    const walletInfo = await new Promise((resolve) => {
      state.worker.onmessage = (event) => {
        resolve(event.data.result);
      };
      state.worker.postMessage({functionName: "RecoverWalletFromSeed", args: [pass, seed]});
    });

    const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(arrayBuffer);
    const jsonObject = JSON.parse(jsonString);
    const fileData = JSON.stringify(jsonObject)

    console.log('HandleSubmitSeed - walletInfo', walletInfo)

    let wallet = walletInfo.value
    wallet.name = name
    wallet.fileData = fileData
    wallet.open = false

    localStorage.setItem(`wallet-${wallet.name}`, JSON.stringify(wallet))
    setState({...state, "initialized": true, "walletList": [...state.walletList, wallet]})
  }

  const handleSubmitHexSeed = async (e) => {
    e.preventDefault()
    let name = e.target.name.value
    let pass = e.target.pass.value
    let conf = e.target.conf.value
    let seed = e.target.seed.value
    if (pass !== conf) return
    console.log('Handle Hex Seed - State', state)


    console.log(state)
    const walletInfo = await new Promise((resolve) => {
      state.worker.onmessage = (event) => {

        resolve(event.data.result);
      };
      console.log("waiting for worker", pass, seed)
      state.worker.postMessage({functionName: "RecoverWalletFromHexSeed", args: [pass, seed]});
    });

    console.log('Handle Hex Seed - WalletInfo', walletInfo)
    const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(arrayBuffer);
    const jsonObject = JSON.parse(jsonString);
    const fileData = JSON.stringify(jsonObject)

    let wallet = walletInfo.value
    wallet.name = name
    wallet.fileData = fileData
    wallet.open = false

    localStorage.setItem(`wallet-${wallet.name}`, JSON.stringify(wallet))
    setState({...state, "initialized": true, "walletList": [...state.walletList, wallet]})
  }

  const handleSubmitCreateNewWallet = async (e) => {
    e.preventDefault()
    let pass = e.target.pass.value
    let conf = e.target.conf.value
    let name = e.target.name.value

    if (pass === conf) {
      const walletInfo = await new Promise((resolve) => {
        state.worker.onmessage = (event) => {
          resolve(event.data.result);
        };

        state.worker.postMessage({functionName: "CreateNewWallet", args: [pass]});
      });


      const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
      const decoder = new TextDecoder();
      const jsonString = decoder.decode(arrayBuffer);
      const jsonObject = JSON.parse(jsonString);
      const fileData = JSON.stringify(jsonObject)


      console.log('Create New Wallet - WalletInfo', walletInfo)

      let wallet = walletInfo.value
      wallet.name = name
      wallet.fileData = fileData
      wallet.open = false

      localStorage.setItem(`wallet-${wallet.name}`, JSON.stringify(wallet))
      setState({...state, "initialized": true, "walletList": [...state.walletList, wallet]})
    }
  }

  const handleSubmitDisk = async (e) => {
    e.preventDefault()
    console.log(e.target.file.value)
    let name = e.target.name.value
    let pass = e.target.pass.value
    let file = await e.target.file.files[0].text()


    console.log('Handle Submit Disk - State', state)
    const walletInfo = await new Promise((resolve) => {
      state.worker.onmessage = (event) => {
        resolve(event.data.result);
      };

      state.worker.postMessage({functionName: "RecoverWalletFromDisk", args: [pass, file]});
    });
    console.log('Handle Submit Disk - WalletInfo', walletInfo)

    const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(arrayBuffer);
    const jsonObject = JSON.parse(jsonString);
    const fileData = JSON.stringify(jsonObject)

    let wallet = walletInfo.value
    wallet.name = name
    wallet.fileData = fileData
    wallet.open = false

    localStorage.setItem(`wallet-${wallet.name}`, JSON.stringify(wallet))
    setState({...state, "initialized": true, "walletList": [...state.walletList, wallet]})
  }

  const openSelectedWallet = async (e) => {
    e.preventDefault()
    let pass = e.target.pass.value
    /* const arrayBuffer = new Uint8Array(state.walletList[state.selectedWallet].fileData).slice();
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(arrayBuffer);
    const jsonObject = JSON.parse(jsonString);
    const fileData=JSON.stringify(jsonObject) */
    const err = await new Promise((resolve) => {
      pass
      state.worker.onmessage = (event) => {
        resolve(event.data.result);
      };

      state.worker.postMessage({
        functionName: "OpenWallet",
        args: [state.walletList[state.activeWallet].name, pass, state.walletList[state.activeWallet].fileData, true]
      });
    });
    console.log(err)
    if (err.err == null) {
      let walletList = state.walletList
      walletList[state.activeWallet].open = true
      setState({...state, walletList: walletList})
    }
  }

  const closeSelectedWallet = async () => {
    const err = await new Promise((resolve) => {
      pass
      state.worker.onmessage = (event) => {
        resolve(event.data.result);
      };

      state.worker.postMessage({functionName: "CloseWallet", args: [state.walletList[state.activeWallet].name]});
    });
    console.log(err)
    if (err.err == null) {
      let walletList = state.walletList
      walletList[state.activeWallet].open = false
      setState({...state, walletList: walletList})
    }
  }

  const removeSelectedWallet = () => {
    localStorage.removeItem(`wallet-${state.walletList[state.activeWallet].name}`)
    let newWalletList = state.walletList.filter(function (item) {
      return item !== state.walletList[state.activeWallet]
    })
    console.log(newWalletList)
    setState({...state, walletList: newWalletList, activeWallet: state.activeWallet - 1})
  }


  // TODO MTS -- START HERE - style modal
  const renderMainMenu = () => {
    return (
      <>
        <FlexBoxColumn
          className="absolute top-full left-1/2 flex bg-zinc-800 p-5 w-80 space-y-2 rounded-b-lg text-white min-w-fit">
          <FlexBoxRow justify='between'>
            <div className='text-slate-300'>Select / Switch Wallet</div>
            <Button size='md' onClick={handleClose}>X</Button>
          </FlexBoxRow>
          <FlexBoxRow justify='left'>
            <FlexBoxColumn align='left'>
              <div className='text-xl pb-2'>RPC Wallet</div>
              <div className='border border-slate-400 rounded-lg px-3 py-1'>{state.walletList[0].address ?
                <WalletSelectItem i={0} address={state.walletList[0].address} /> : "Not Connected"}</div>
            </FlexBoxColumn>
          </FlexBoxRow>
          <FlexBoxRow justify='left'>
            <FlexBoxColumn align='left'>
              <div className='text-xl py-2'>Integrated Wallets</div>
              <FlexBoxRow justfy='between'>
                <Info />
                <form onSubmit={openSelectedWallet}>
                  <input id="pass" type="password" className='border border-slate-400 rounded-lg bg-zinc-800'
                         placeholder='password' />
                  <Button type={"submit"} variant='outline' shape='circle' color='info' className='bg-zinc-500 m-1 text-xs'>Open</Button>
                </form>

                <Button variant='outline' shape='circle' color='info' className='bg-zinc-500 m-1 text-xs' onClick={() => closeSelectedWallet()}>Close</Button>
                <Button variant='outline' shape='circle' color='info' className='bg-zinc-500 m-1 text-xs' onClick={() => removeSelectedWallet()}>Del</Button>
              </FlexBoxRow>
              <Divider />
              <Button color='secondary' onClick={() => handleOptionClick("addWallet")}>Add Wallet</Button>
            </FlexBoxColumn>
          </FlexBoxRow>
          <FlexBoxRow justify='left'>
            <FlexBoxColumn align='left'>
              <div className='text-xl pb-2'>Ethereum Wallet</div>
              <div className='border border-slate-400 rounded-lg px-3 py-1'>
                <ConnectButton/>
              </div>
            </FlexBoxColumn>
          </FlexBoxRow>
        </FlexBoxColumn>
      </>
    );
  }


  const renderAddWalletModal = () => {
    return (
      <Modal open={menuOption} className='bg-zinc-800'>
        <Modal.Header>
          <FlexBoxRow justify='between'>
            <div className='text-slate-300'>Add Wallet</div>
            <div>
              <Button size='md' className='mr-2' onClick={() => handleOptionClick("main")}>Back</Button>
              <Button onClick={handleClose}>X</Button>
            </div>
          </FlexBoxRow>
        </Modal.Header>
        <Modal.Body>
          <FlexBoxColumn className='max-w-full'>
            <h2>Select an option:</h2>
            <div className="w-full cursor-pointer">
              <div className="text-slate-200 p-4 border-2 hover:bg-secondary border-secondary"
                   onClick={() => handleOptionClick("Create New Wallet")}>Create New Wallet
              </div>
              <div className="text-slate-200 p-4 border-2 hover:bg-secondary border-t-0 border-secondary"
                   onClick={() => handleOptionClick("Recover From Seed")}>Recover From Seed
              </div>
              <div className="text-slate-200 p-4 border-2 hover:bg-secondary border-t-0 border-secondary"
                   onClick={() => handleOptionClick("Recover From Hex Seed")}>Recover From Hex Seed
              </div>
              <div className="text-slate-200 p-4 border-2 hover:bg-secondary border-t-0 border-secondary"
                   onClick={() => handleOptionClick("Recover From Disk")}>Recover From Disk
              </div>
            </div>
          </FlexBoxColumn>
        </Modal.Body>
      </Modal>
    );
  };

  const renderOptionMenu = () => {
    return (
      <Modal open={menuOption} className='bg-zinc-800'>
        <Modal.Header>
          <Button onClick={() => handleOptionClick("main")}>Back</Button>
        </Modal.Header>
        <Modal.Body>
          {renderInputFields()}
        </Modal.Body>
      </Modal>
    );
  };

  const renderInputFields = () => {
    switch (menuOption) {

      case "Create New Wallet":
        return <form onSubmit={handleSubmitCreateNewWallet}>
          <input type="text" placeholder="Name your new wallet" id="name" />
          <input type="password" placeholder="Enter a password" id="pass" />
          <input type="password" placeholder="Confirm password" id="conf" />
          <Divider />
          <Button color='secondary' type={"submit"}>Create</Button>
        </form>;
      case "Recover From Seed":
        return <form onSubmit={handleSubmitSeed}>
          <input type="text" id="name" className='border border-slate-400 rounded-lg bg-zinc-800'
                 placeholder="Name your wallet" />
          <input type="text" name="" id="seed" className='border border-slate-400 rounded-lg bg-zinc-800'
                 placeholder="Enter your seed phrase" />
          <input type="password" id="pass" className='border border-slate-400 rounded-lg bg-zinc-800'
                 placeholder="Enter a password" />
          <input type="password" id="conf" className='border border-slate-400 rounded-lg bg-zinc-800'
                 placeholder="Confirm password" />
          <Divider />
          <Button color='secondary' type={"submit"}>Submit</Button>
        </form>;
      case "Recover From Hex Seed":
        return <form onSubmit={handleSubmitHexSeed}>
          <input type="text" id="name" placeholder="Name your wallet" />
          <input type="text" name="" id="seed" placeholder="Enter your hex seed" />
          <input type="password" id="pass" placeholder="Enter a password" />
          <input type="password" id="conf" placeholder="Confirm password" />
          <Divider />
          <Button color='secondary' type={"submit"}>Submit</Button>
        </form>;
      case "Recover From Disk":
        return <form onSubmit={handleSubmitDisk}>
          <input type="text" id="name" placeholder="Name your wallet" />
          <input type="password" id="pass" placeholder="Enter password" />
          <input type="file" id="file" />
          <Divider />
          <Button color='secondary' type={"submit"}>Submit</Button>
        </form>;
      default:
        return null;
    }
  };

  return menuOption === "main" ? renderMainMenu() : menuOption === "addWallet" ? renderAddWalletModal() : renderOptionMenu();
};

export default WalletModal;
