import { Api, generateAppId } from 'dero-xswd-api';
import React, { useContext, useState } from 'react';
import { LoginContext } from '../LoginContext';

export default function XSWDConnect() {
  const [state, setState] = useContext(LoginContext);
  const [connected, setConnected] = useState(false);
  const handleConnect = async () => {
    const name = 'Private Islands';
    const appInfo = {
      id: await generateAppId(name),
      name,
      description: `The World's Most Resilient Crowdfunding Platform`,
    };
    const xswd = new Api(appInfo);

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
    <div onClick={handleConnect}>
      <div className="cursor-pointer rounded-bl-[25px] rounded-tr-[25px] bg-gradient-to-b from-accent to-[#6CCAB1] px-6 py-1 text-center text-lg leading-tight text-[#FFF] hover:scale-105 hover:shadow-lg sm:rounded-bl-[35px] sm:rounded-tr-[35px] sm:px-10 sm:text-2xl">
        {connected ? 'Connected' : 'Connect Wallet'}
      </div>
    </div>
  );
}
