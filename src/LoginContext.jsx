import React, { useState } from 'react';
import Cookies from 'js-cookie';

const LoginContext = React.createContext([{}, () => {}]);
const walletListCookie = Cookies.get('walletList');
let walletList = [{"name":"rpc"}]
if (walletListCookie) {
  walletList = walletList.concat(JSON.parse(walletListCookie))
}



const LoginProvider = (props) => {
  const [state, setState] = useState({"activeWallet":0,"walletList":walletList});
  return (
    <LoginContext.Provider value={[state, setState]}>
      {props.children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };