import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../../LoginContext.jsx';
import Info from '../../info.jsx';
import { useRPCWallet } from '../useRPCWallet.jsx';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import WalletSelectItem from '@/walletSelectItem.jsx';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/common/Button.jsx';
import { ModalDialog as Modal } from '@/components/common/ModalDialog.jsx';
import { WALLET_INPUT_RENDERS } from '@/utils/helpers.js';
import { ConnectButtonWrapper } from '@/components/wallet/ConnectButtonWrapper.jsx';

const WalletModal = ({ handleClose }) => {
  const [menuOption, setMenuOption] = useState('main');
  const [state, setState] = useContext(LoginContext);
  const [walletInfo, isLoading, error, fetchWalletInfo] = useRPCWallet();

  const handleOptionClick = (option) => {
    console.log('OPTION TO SET', option);
    setMenuOption(option);
  };

  const handleSelectRPC = () => {
    fetchWalletInfo();
  };

  const handleSubmitSeed = async (e) => {
    e.preventDefault();

    let name = e.target.name.value;
    let pass = e.target.pass.value;
    let conf = e.target.conf.value;
    let seed = e.target.seed.value;
    if (pass != conf) return;
    console.log('HandleSubmitSeed - State', state);

    const walletInfo = await new Promise((resolve) => {
      state.worker.onmessage = (event) => {
        resolve(event.data.result);
      };
      state.worker.postMessage({
        functionName: 'RecoverWalletFromSeed',
        args: [pass, seed],
      });
    });

    const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(arrayBuffer);
    const jsonObject = JSON.parse(jsonString);
    const fileData = JSON.stringify(jsonObject);

    console.log('HandleSubmitSeed - walletInfo', walletInfo);

    let wallet = walletInfo.value;
    wallet.name = name;
    wallet.fileData = fileData;
    wallet.open = false;

    localStorage.setItem(`wallet-${wallet.name}`, JSON.stringify(wallet));
    setState({
      ...state,
      initialized: true,
      walletList: [...state.walletList, wallet],
    });
  };

  const handleSubmitHexSeed = async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let pass = e.target.pass.value;
    let conf = e.target.conf.value;
    let seed = e.target.seed.value;
    if (pass !== conf) return;
    console.log('Handle Hex Seed - State', state);

    console.log(state);
    const walletInfo = await new Promise((resolve) => {
      state.worker.onmessage = (event) => {
        resolve(event.data.result);
      };
      console.log('waiting for worker', pass, seed);
      state.worker.postMessage({
        functionName: 'RecoverWalletFromHexSeed',
        args: [pass, seed],
      });
    });

    console.log('Handle Hex Seed - WalletInfo', walletInfo);
    const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(arrayBuffer);
    const jsonObject = JSON.parse(jsonString);
    const fileData = JSON.stringify(jsonObject);

    let wallet = walletInfo.value;
    wallet.name = name;
    wallet.fileData = fileData;
    wallet.open = false;

    localStorage.setItem(`wallet-${wallet.name}`, JSON.stringify(wallet));
    setState({
      ...state,
      initialized: true,
      walletList: [...state.walletList, wallet],
    });
  };

  const handleSubmitCreateNewWallet = async (e) => {
    e.preventDefault();
    let pass = e.target.pass.value;
    let conf = e.target.conf.value;
    let name = e.target.name.value;

    if (pass === conf) {
      const walletInfo = await new Promise((resolve) => {
        state.worker.onmessage = (event) => {
          resolve(event.data.result);
        };

        state.worker.postMessage({
          functionName: 'CreateNewWallet',
          args: [pass],
        });
      });

      const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
      const decoder = new TextDecoder();
      const jsonString = decoder.decode(arrayBuffer);
      const jsonObject = JSON.parse(jsonString);
      const fileData = JSON.stringify(jsonObject);

      console.log('Create New Wallet - WalletInfo', walletInfo);

      let wallet = walletInfo.value;
      wallet.name = name;
      wallet.fileData = fileData;
      wallet.open = false;

      localStorage.setItem(`wallet-${wallet.name}`, JSON.stringify(wallet));
      setState({
        ...state,
        initialized: true,
        walletList: [...state.walletList, wallet],
      });
    }
  };

  const handleSubmitDisk = async (e) => {
    e.preventDefault();
    console.log(e.target.file.value);
    let name = e.target.name.value;
    let pass = e.target.pass.value;
    let file = await e.target.file.files[0].text();

    console.log('Handle Submit Disk - State', state);
    const walletInfo = await new Promise((resolve) => {
      state.worker.onmessage = (event) => {
        resolve(event.data.result);
      };

      state.worker.postMessage({
        functionName: 'RecoverWalletFromDisk',
        args: [pass, file],
      });
    });
    console.log('Handle Submit Disk - WalletInfo', walletInfo);

    const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(arrayBuffer);
    const jsonObject = JSON.parse(jsonString);
    const fileData = JSON.stringify(jsonObject);

    let wallet = walletInfo.value;
    wallet.name = name;
    wallet.fileData = fileData;
    wallet.open = false;

    localStorage.setItem(`wallet-${wallet.name}`, JSON.stringify(wallet));
    setState({
      ...state,
      initialized: true,
      walletList: [...state.walletList, wallet],
    });
  };

  const openSelectedWallet = async (e) => {
    e.preventDefault();
    let pass = e.target.pass.value;
    /* const arrayBuffer = new Uint8Array(state.walletList[state.selectedWallet].fileData).slice();
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(arrayBuffer);
    const jsonObject = JSON.parse(jsonString);
    const fileData=JSON.stringify(jsonObject) */
    const err = await new Promise((resolve) => {
      pass;
      state.worker.onmessage = (event) => {
        resolve(event.data.result);
      };

      state.worker.postMessage({
        functionName: 'OpenWallet',
        args: [
          state.walletList[state.activeWallet].name,
          pass,
          state.walletList[state.activeWallet].fileData,
          true,
        ],
      });
    });
    console.log(err);
    if (err.err == null) {
      let walletList = state.walletList;
      walletList[state.activeWallet].open = true;
      setState({ ...state, walletList: walletList });
    }
  };

  const closeSelectedWallet = async () => {
    const err = await new Promise((resolve) => {
      pass;
      state.worker.onmessage = (event) => {
        resolve(event.data.result);
      };

      state.worker.postMessage({
        functionName: 'CloseWallet',
        args: [state.walletList[state.activeWallet].name],
      });
    });
    console.log(err);
    if (err.err == null) {
      let walletList = state.walletList;
      walletList[state.activeWallet].open = false;
      setState({ ...state, walletList: walletList });
    }
  };

  const removeSelectedWallet = () => {
    localStorage.removeItem(
      `wallet-${state.walletList[state.activeWallet].name}`
    );
    let newWalletList = state.walletList.filter(function (item) {
      return item !== state.walletList[state.activeWallet];
    });
    console.log(newWalletList);
    setState({
      ...state,
      walletList: newWalletList,
      activeWallet: state.activeWallet - 1,
    });
  };

  useEffect(() => {
    window[menuOption].showModal();
  }, [menuOption]);

  // Primary Modal
  const renderMainMenu = () => {
    return (
      <Modal
        className="rounded-lg bg-zinc-800"
        id={menuOption}
        key={menuOption}
      >
        {/*<Modal.Header>*/}
        <FlexBoxColumn className="top-20 flex rounded-b-sm bg-zinc-800 p-5 text-white">
          <FlexBoxRow justify="between">
            <div className="text-slate-300">Select / Switch Wallet</div>
            <Button size="small" handleClick={handleClose}>
              X
            </Button>
          </FlexBoxRow>
          {/*</Modal.Header>*/}
          {/*<Modal.Body>*/}
          <FlexBoxRow justify="left" className="space-x-4">
            <div className="text-xl">RPC Wallet</div>
            <div className="rounded-lg border border-slate-400 px-3 py-1">
              {state.walletList[0].address ? (
                <WalletSelectItem i={0} address={state.walletList[0].address} />
              ) : (
                'Not Connected'
              )}
            </div>
          </FlexBoxRow>
          <FlexBoxRow justify="left">
            <FlexBoxColumn align="left">
              <div className="py-2 text-xl">Integrated Wallets</div>
              <FlexBoxRow justfy="between">
                <Info />
                <form onSubmit={openSelectedWallet}>
                  <input
                    id="pass"
                    type="password"
                    className="w-3/4 rounded-lg border border-slate-400 bg-zinc-800"
                    placeholder="password"
                  />
                  &nbsp;&nbsp;&nbsp;
                  <Button type={'submit'} size="xsmall" className="m-0">
                    Open
                  </Button>
                </form>
                <Button
                  size="xsmall"
                  className="bg-zinc-500"
                  handleClick={() => closeSelectedWallet()}
                >
                  Close
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  size="xsmall"
                  className="bg-zinc-500 px-2"
                  handleClick={() => removeSelectedWallet()}
                >
                  Del
                </Button>
              </FlexBoxRow>
              <FlexBoxRow justify="between" className="pt-4">
                <Button
                  size="small"
                  handleClick={() => handleOptionClick('addWallet')}
                >
                  Add Wallet
                </Button>
                <ConnectButtonWrapper onClose={handleClose} />
              </FlexBoxRow>
            </FlexBoxColumn>
          </FlexBoxRow>
        </FlexBoxColumn>
        {/*</Modal.Body>*/}
      </Modal>
    );
  };

  // Add Wallet Modal
  const renderAddWalletModal = () => {
    console.log('ADD WALLET', menuOption);
    return (
      <Modal
        className="rounded-lg bg-zinc-800 p-5"
        id={menuOption}
        key={menuOption}
      >
        {/*<Modal.Header>*/}
        <FlexBoxRow justify="between">
          <div className="text-slate-300">Add Wallet</div>
          <div>
            <Button
              size="md"
              className="mr-2"
              handleClick={() => handleOptionClick('main')}
            >
              Back
            </Button>
            {/*<Button handleClick={handleClose}>X</Button>*/}
          </div>
        </FlexBoxRow>
        {/*</Modal.Header>*/}
        {/*<Modal.Body>*/}
        <FlexBoxColumn className="max-w-full">
          <h2>Select an option:</h2>
          <div className="w-full cursor-pointer">
            <div
              className="border-2 border-secondary p-4 text-slate-200 hover:bg-secondary hover:text-warning"
              onClick={() =>
                handleOptionClick(WALLET_INPUT_RENDERS.createNewWallet)
              }
            >
              Create New Wallet
            </div>
            <div
              className="border-2 border-t-0 border-secondary p-4 text-slate-200 hover:bg-secondary hover:text-warning"
              onClick={() =>
                handleOptionClick(WALLET_INPUT_RENDERS.recoverFromSeed)
              }
            >
              Recover From Seed
            </div>
            <div
              className="border-2 border-t-0 border-secondary p-4 text-slate-200 hover:bg-secondary hover:text-warning"
              onClick={() =>
                handleOptionClick(WALLET_INPUT_RENDERS.recoverFromHexSeed)
              }
            >
              Recover From Hex Seed
            </div>
            <div
              className="border-2 border-t-0 border-secondary p-4 text-slate-200 hover:bg-secondary hover:text-warning"
              onClick={() =>
                handleOptionClick(WALLET_INPUT_RENDERS.recoverFromDisk)
              }
            >
              Recover From Disk
            </div>
          </div>
        </FlexBoxColumn>
        {/*</Modal.Body>*/}
      </Modal>
    );
  };

  // WalletOptionModal
  const renderOptionMenu = () => {
    console.log('RENDER OPTIONS MENU', menuOption);
    return (
      <Modal
        className="rounded-lg bg-zinc-800 p-5"
        id={menuOption}
        key={menuOption}
      >
        {/*<Modal.Header>*/}
        <div className="flex justify-end">
          <Button size="small" handleClick={() => handleOptionClick('main')}>
            Back
          </Button>
        </div>
        {/*</Modal.Header>*/}
        {/*<Modal.Body>*/}
        {renderInputFields()}
        {/*</Modal.Body>*/}
      </Modal>
    );
  };

  const renderInputFields = () => {
    console.log('RENDER INPUT FIELDS', menuOption);
    switch (menuOption) {
      case 'createNewWallet':
        return (
          <fieldset>
            <form onSubmit={handleSubmitCreateNewWallet}>
              <input
                type="text"
                className="mr-2 rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Name your new wallet"
                id="name"
              />
              <input
                type="password"
                className="mr-2 rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Enter a password"
                id="pass"
              />
              <input
                type="password"
                className="mr-2 rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Confirm password"
                id="conf"
              />
              <span className="divider" />
              <Button color="secondary" type={'submit'}>
                Create
              </Button>
            </form>
          </fieldset>
        );
      case 'recoverFromSeed':
        return (
          <fieldset>
            <form onSubmit={handleSubmitSeed}>
              <input
                type="text"
                id="name"
                className="mr-2 rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Name your wallet"
              />
              <input
                type="text"
                name=""
                id="seed"
                className="mr-2 rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Enter your seed phrase"
              />
              <input
                type="password"
                id="pass"
                className="mr-2 rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Enter a password"
              />
              <input
                type="password"
                id="conf"
                className="mr-2 rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Confirm password"
              />
              <span className="divider" />
              <Button color="secondary" type={'submit'}>
                Submit
              </Button>
            </form>
          </fieldset>
        );
      case 'recoverFromHexSeed':
        return (
          <fieldset>
            <form onSubmit={handleSubmitHexSeed}>
              <input
                type="text"
                id="name"
                className="mr-2 rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Name your wallet"
              />
              <input
                type="text"
                name=""
                id="seed"
                className="mr-2 rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Enter your hex seed"
              />
              <input
                type="password"
                id="pass"
                className="mr-2 rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Enter a password"
              />
              <input
                type="password"
                id="conf"
                className="mr-2 rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Confirm password"
              />
              <span className="divider" />
              <Button color="secondary" type={'submit'}>
                Submit
              </Button>
            </form>
          </fieldset>
        );
      case 'recoverFromDisk':
        return (
          <fieldset>
            <form onSubmit={handleSubmitDisk}>
              <input
                type="text"
                id="name"
                className="mr-2 rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Name your wallet"
              />
              <input
                type="password"
                id="pass"
                className="mr-2 rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Enter password"
              />
              <input type="file" id="file" />
              <span className="divider" />
              <Button size="small" color="secondary" type={'submit'}>
                Submit
              </Button>
            </form>
          </fieldset>
        );
      default:
        return null;
    }
  };

  const menuOptions = [
    {
      key: 'main',
      render: renderMainMenu,
    },
    {
      key: 'addWallet',
      render: renderAddWalletModal,
    },
    {
      key: WALLET_INPUT_RENDERS.createNewWallet,
      render: renderOptionMenu,
    },
    {
      key: WALLET_INPUT_RENDERS.recoverFromSeed,
      render: renderOptionMenu,
    },
    {
      key: WALLET_INPUT_RENDERS.recoverFromHexSeed,
      render: renderOptionMenu,
    },
    {
      key: WALLET_INPUT_RENDERS.recoverFromDisk,
      render: renderOptionMenu,
    },
  ];

  // return menuOption === "main" ? renderMainMenu() : menuOption === "addWallet" ? renderAddWalletModal() : renderOptionMenu();

  const selectedOption = menuOptions.find(
    (option) => option.key === menuOption
  );
  return selectedOption ? selectedOption.render() : null;
};

export default WalletModal;
