import React, {useState} from 'react';
import Cookies from 'js-cookie';

const LoginContext = React.createContext([{}, () => {}]);
//const walletListCookie = Cookies.get('walletList');

function getWalletItemsFromLocalStorage() {
  const walletItems = [];
  const pattern = /^wallet-[\w\s]+$/;
 

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (pattern.test(key)) {
      const walletItem = JSON.parse(localStorage.getItem(key));
      walletItems.push(walletItem);
    }
  }

  return walletItems;
}


let walletList = [{"name":"RPC", "open":true}]

  walletList = walletList.concat(getWalletItemsFromLocalStorage())




const LoginProvider = (props) => {
  const [state, setState] = useState({"activeWallet":0,"walletList":walletList,"daemon":"pools", "scid_registry":"a5daa9a02a81a762c83f3d4ce4592310140586badb4e988431819f47657559f7","scid_bounties":"fc2a6923124a07f33c859f201a57159663f087e2f4b163eaa55b0f09bf6de89f","scid_fundraisers":"d6ad66e39c99520d4ed42defa4643da2d99f297a506d3ddb6c2aaefbe011f3dc","scid_subscriptions":"a4943b10767d3b4b28a0c39fe75303b593b2a8609b07394c803fca1a877716cc",
  "scid_registry_mainnet":"a5daa9a02a81a762c83f3d4ce4592310140586badb4e988431819f47657559f7","scid_bounties_mainnet":"fc2a6923124a07f33c859f201a57159663f087e2f4b163eaa55b0f09bf6de89f","scid_fundraisers_mainnet":"d6ad66e39c99520d4ed42defa4643da2d99f297a506d3ddb6c2aaefbe011f3dc","scid_subscriptions_mainnet":"a4943b10767d3b4b28a0c39fe75303b593b2a8609b07394c803fca1a877716cc"});
  return (
    <LoginContext.Provider value={[state, setState]}>
      {props.children}
    </LoginContext.Provider>
  );
}

export {LoginContext, LoginProvider};