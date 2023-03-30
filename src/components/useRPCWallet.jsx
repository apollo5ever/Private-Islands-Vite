import { useState, useEffect,useContext,useRef, useCallback } from 'react';
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
      setState((state) => ({ ...state, deroBridgeApiRef: deroBridgeApiRef})); 
      console.log("STATE",state)
      getRandom()
      getAddress()
      //getSCID()
    }
  };

  const getRandom = useCallback(async () => {
    const deroBridgeApi = deroBridgeApiRef.current;

    const [err0, res0] = await to(
      deroBridgeApi.daemon("get-random-address", {})
    );

    console.log("get-random-address-error", err0);
    console.log(res0);
    if (err0 == null) {
      setState((state) => ({
        ...state,
        randomAddress: res0.data.result.address[0],
      }));
    }
  });

  const getAddress = useCallback(async () => {
    const deroBridgeApi = deroBridgeApiRef.current;

    const [err0, res0] = await to(deroBridgeApi.wallet("get-address", {}));

    console.log("get-address-error", err0);
    console.log(res0);
    if (err0 == null) {
      let newWalletList = state.walletList
      newWalletList[0].address = res0.data.result.address
      setState((state) => ({
        ...state,
        walletList:newWalletList
      }));
    }else{
      let newWalletList = state.walletList
      newWalletList[0].address = null
    }
  });

  const getSCID = useCallback(async () => {
    const deroBridgeApi = deroBridgeApiRef.current;
    const [err, res] = await to(
      deroBridgeApi.daemon("get-sc", {
        scid: "0000000000000000000000000000000000000000000000000000000000000001",
        keysstring: ["keystore"],
      })
    );
    let keystore_scid = "80" + res.data.result.valuesstring[0].substring(2, 64);
    const [err2, res2] = await to(
      deroBridgeApi.daemon("get-sc", {
        scid: keystore_scid,
        keysstring: ["k:private.islands.scid", "k:private.islands.coco"],
      })
    );
    let scid = res2.data.result.valuesstring[0];
    let coco = res2.data.result.valuesstring[1];
    setState((state) => ({ ...state, scid: scid, coco: coco }));
  });
  
  useEffect(() => {
    fetchWalletInfo(); //i feel like this shouldn't be here
  }, []);
  



  return [walletInfo, isLoading, error,fetchWalletInfo];
}
