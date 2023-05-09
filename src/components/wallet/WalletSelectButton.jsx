import {useState, useContext, useEffect} from "react";
import WalletModal from "./WalletModal.jsx";
import {LoginContext} from "../../LoginContext.jsx";
import {Button} from 'react-daisyui';

const WalletSelectButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOption, setMenuOption] = useState("main");
  const [state, setState] = useContext(LoginContext)
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    if (state?.walletList) {
      setWalletConnected(!!state.walletList.find(wallet => wallet.open === true))
    }
  }, [state.walletList])

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    console.log('CALLED HANDLE CLOSE')
    setIsOpen(false);
  };

  const handleOptionClick = option => {
    setMenuOption(option);
  };

  return (
    <>
      <Button size='md' className={`btn btn-accent mx-4 ${walletConnected ? '' : 'text-error'}`} onClick={handleOpen}>
        {
          state.walletType === "rpc" ?
            "Wallet [RPC]"
            :
            state.walletList ?
              `Wallet [${state.walletList[state.activeWallet].name}]`
              : 'Wallet'
        }
      </Button>
      {isOpen && <WalletModal handleClose={handleClose} />}
    </>
  );
}

export default WalletSelectButton;
