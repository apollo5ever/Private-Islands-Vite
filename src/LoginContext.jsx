import React, { useState } from 'react';
import Cookies from 'js-cookie';

const LoginContext = React.createContext([{}, () => {}]);
//const walletListCookie = Cookies.get('walletList');

function getWalletItemsFromLocalStorage() {
  const walletItems = [];
  const pattern = /^wallet-\d+-[\w\s]+$/;

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
  const [state, setState] = useState({"activeWallet":0,"walletList":walletList,"daemon":"pools"});
  return (
    <LoginContext.Provider value={[state, setState]}>
      {props.children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };