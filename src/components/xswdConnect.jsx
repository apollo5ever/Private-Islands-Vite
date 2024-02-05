import { Api, generateAppId } from 'dero-xswd-api';
import React, { useContext, useState } from 'react';
import { LoginContext } from '../LoginContext';

export default function XSWDConnect() {
  const [state, setState] = useContext(LoginContext);
  const [connected, setConnected] = useState(false);
  const handleConnect = async () => {
    const name = 'Dero Web';
    const appInfo = {
      id: await generateAppId(name),
      name,
      description: 'Truly unstoppable',
    };
    const xswd = new Api(appInfo);
    xswd.config.ip = '127.0.0.1';
    await xswd.initialize();

    setState({ ...state, xswd: xswd });
    /* xswd.wallet.transfer({
      scid: "b52cdf002d7b389bdae1c668fe299cc61facb6308f6572e011e382cda499dcf2",
      ringsize: 2,
      fees: 100,
      transfers: [
        {
          burn: parseInt(1000),
          scid: "90dbf11836a6ff6685cda54711d6c1d056bbb23d5bcceec7411b857330acf1a8",
        },
      ],
      sc_rpc: [
        {
          name: "entrypoint",
          datatype: "S",
          value: "BuyTickets",
        },
      ],
    }); */
    setConnected(true);
  };
  return (
    <button onClick={handleConnect}>
      {connected ? 'Connected' : 'Connect'}
    </button>
  );
}
