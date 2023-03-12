import { useState, useEffect,useContext,useRef } from 'react';
import { LoginContext } from '../LoginContext';
import DeroBridgeApi from 'dero-rpc-bridge-api';
import to from 'await-to-js';

export function useRPCWallet() {
    const [state,setState] = useContext(LoginContext)
  const [walletInfo, setWalletInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const deroBridgeApiRef = useRef();


  const fetchWalletInfo = async () => {
    console.log("FETCH WALLET INFO")
    deroBridgeApiRef.current = new DeroBridgeApi();
    const deroBridgeApi = deroBridgeApiRef.current;
  
    const [err] = await to(deroBridgeApi.init());
    if (err) {
      setError(err)
      console.log("ERR",err)
    } else {
      setState((state) => ({ ...state, deroBridgeApiRef: deroBridgeApiRef, walletType:"rpc" })); 
      console.log("STATE",state)
    }
  };
  
  useEffect(() => {
    fetchWalletInfo();
  }, []);
  



  return [walletInfo, isLoading, error,fetchWalletInfo];
}
