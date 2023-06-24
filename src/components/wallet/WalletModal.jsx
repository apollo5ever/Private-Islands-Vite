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
    console.log('EFECT FOR MODAL', menuOption);
    if (menuOption !== 'main') {
      window[menuOption].showModal();
    }
  }, [menuOption]);

  // TODO MTS -- START HERE - style modal
  const renderMainMenu = () => {
    return (
      <>
        <FlexBoxColumn className="z-1000 fixed left-1/2 top-20 flex w-80 min-w-fit -translate-x-1/2 transform space-y-2 rounded-b-lg bg-zinc-800 p-5 text-white">
          <FlexBoxRow justify="between">
            <div className="text-slate-300">Select / Switch Wallet</div>
            <Button size="small" handleClick={handleClose}>
              X
            </Button>
          </FlexBoxRow>
          <FlexBoxRow justify="left">
            <FlexBoxColumn align="left">
              <div className="pb-2 text-xl">RPC Wallet</div>
              <div className="rounded-lg border border-slate-400 px-3 py-1">
                {state.walletList[0].address ? (
                  <WalletSelectItem
                    i={0}
                    address={state.walletList[0].address}
                  />
                ) : (
                  'Not Connected'
                )}
              </div>
            </FlexBoxColumn>
          </FlexBoxRow>
          <FlexBoxRow justify="left">
            <FlexBoxColumn align="left">
              <div className="py-2 text-xl">Integrated Wallets</div>
              <FlexBoxRow justfy="between">
                <Info />
                <fieldset>
                  <form onSubmit={openSelectedWallet}>
                    <input
                      id="pass"
                      type="password"
                      className="rounded-lg border border-slate-400 bg-zinc-800"
                      placeholder="password"
                    />
                    <Button
                      type={'submit'}
                      size="small"
                      className="m-1 bg-blue-500 text-xs"
                    >
                      Open
                    </Button>
                  </form>
                </fieldset>

                <Button
                  size="small"
                  className="m-1 bg-zinc-500 text-xs"
                  handleClick={() => closeSelectedWallet()}
                >
                  Close
                </Button>
                <Button
                  size="small"
                  className="m-1 bg-zinc-500 text-xs"
                  handleClick={() => removeSelectedWallet()}
                >
                  Del
                </Button>
              </FlexBoxRow>
              <span className="divider" />
              <Button
                size="small"
                handleClick={() => handleOptionClick('addWallet')}
              >
                Add Wallet
              </Button>
            </FlexBoxColumn>
          </FlexBoxRow>
          <FlexBoxRow justify="left">
            <FlexBoxColumn align="left">
              <div className="pb-2 text-xl">Ethereum Wallet</div>
              <div className="rounded-lg border border-slate-400 px-3 py-1">
                <ConnectButton />
              </div>
            </FlexBoxColumn>
          </FlexBoxRow>
        </FlexBoxColumn>
      </>
    );
  };

  const renderAddWalletModal = () => {
    console.log('ADD WALLET', menuOption);
    return (
      <Modal className="z-1000 bg-zinc-800" id={menuOption} key={menuOption}>
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
              className="border-2 border-secondary p-4 text-slate-200 hover:bg-secondary"
              onClick={() =>
                handleOptionClick(WALLET_INPUT_RENDERS.createNewWallet)
              }
            >
              Create New Wallet
            </div>
            <div
              className="border-2 border-t-0 border-secondary p-4 text-slate-200 hover:bg-secondary"
              onClick={() =>
                handleOptionClick(WALLET_INPUT_RENDERS.recoverFromSeed)
              }
            >
              Recover From Seed
            </div>
            <div
              className="border-2 border-t-0 border-secondary p-4 text-slate-200 hover:bg-secondary"
              onClick={() =>
                handleOptionClick(WALLET_INPUT_RENDERS.recoverFromHexSeed)
              }
            >
              Recover From Hex Seed
            </div>
            <div
              className="border-2 border-t-0 border-secondary p-4 text-slate-200 hover:bg-secondary"
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

  const renderOptionMenu = () => {
    console.log('RENDER OPTIONS MENU', menuOption);
    return (
      <Modal className="z-1000 bg-zinc-800" id={menuOption} key={menuOption}>
        {/*<Modal.Header>*/}
        <Button size="small" handleClick={() => handleOptionClick('main')}>
          Back
        </Button>
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
              <input type="text" placeholder="Name your new wallet" id="name" />
              <input type="password" placeholder="Enter a password" id="pass" />
              <input type="password" placeholder="Confirm password" id="conf" />
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
                className="rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Name your wallet"
              />
              <input
                type="text"
                name=""
                id="seed"
                className="rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Enter your seed phrase"
              />
              <input
                type="password"
                id="pass"
                className="rounded-lg border border-slate-400 bg-zinc-800"
                placeholder="Enter a password"
              />
              <input
                type="password"
                id="conf"
                className="rounded-lg border border-slate-400 bg-zinc-800"
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
              <input type="text" id="name" placeholder="Name your wallet" />
              <input
                type="text"
                name=""
                id="seed"
                placeholder="Enter your hex seed"
              />
              <input type="password" id="pass" placeholder="Enter a password" />
              <input type="password" id="conf" placeholder="Confirm password" />
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
              <input type="text" id="name" placeholder="Name your wallet" />
              <input type="password" id="pass" placeholder="Enter password" />
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
