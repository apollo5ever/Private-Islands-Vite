import { useCallback, useContext, useEffect, useState } from 'react';
import { LoginContext } from '../LoginContext';
import { useSendTransaction } from './hooks/useSendTransaction';
import { useGetRandomAddress } from './hooks/useGetRandomAddress';
import { useGetSC } from './hooks/useGetSC';
import dateString from '../utils/dateString';
import hex2a from './hex2a';
import { useGetGasEstimate } from './hooks/useGetGasEstimate';
import bgImage from '@/assets/parallax/FancyIsland.png';
import { FullPageContainer } from '@/components/common/FullPageContainer.jsx';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { Button } from '@/components/common/Button.jsx';
import { Helpers } from '@/utils/helpers.js';

export default function COCOLotto() {
  const [state, setState] = useContext(LoginContext);
  const [sendTransaction] = useSendTransaction();
  const [getRandomAddress] = useGetRandomAddress();
  const [getSC] = useGetSC();
  const [lottos, setLottos] = useState([]);
  const [userTickets, setUserTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [getGasEstimate] = useGetGasEstimate();
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      let lotto = await getSC(state.scid_lotto, false, true);
      // let's make a list of all asset treasuries
      //first use regex to find all treasuries
      var assetSearch = new RegExp('TREASURY_.*');
      const assetList = Object.keys(lotto.stringkeys)
        .filter((key) => assetSearch.test(key))
        .map((key) => key.substring(9, key.length));

      console.log('assetList', assetList);
      var lottoArray = [];

      for (var i = 0; i < assetList.length; i++) {
        var assetInfo = new Object({
          Name: assetList[i],
          Treasury: lotto.stringkeys[`TREASURY_${assetList[i]}`],
          Time: lotto.stringkeys[`TIME_${assetList[i]}`],
        });

        lottoArray.push(assetInfo);
      }
      setLottos(lottoArray);

      //now let's count tickets

      var ticketSearch = new RegExp('TICKET_\\d+');
      var totalTicketArray = Object.keys(lotto.stringkeys)
        .filter((key) => ticketSearch.test(key))
        .map((key) => parseInt(key.substring(7, key.length)));

      setTotalTickets(totalTicketArray.length);

      var ticketArray = [];
      let ticketCount = totalTicketArray.length;
      for (i = 0; i < totalTicketArray.length; i++) {
        if (ticketCount === 0) break;
        if (
          hex2a(lotto.stringkeys[`TICKET_${totalTicketArray[i]}`]) ===
          state.userAddress
        ) {
          ticketCount--;
          ticketArray.push(totalTicketArray[i]);
        }
      }
      setUserTickets(ticketArray);
      console.log('ticket array', ticketArray);

      //now count total tickets
    }
    fetchData();
  }, [state.userAddress]);

  const BuyTickets = useCallback(async (e) => {
    e.preventDefault();
    const randomAddress = await getRandomAddress();

    const data = new Object({
      scid: state.scid_lotto,
      ringsize: 2,
      transfers: [
        {
          destination: randomAddress,
          scid: 'a9a977297ed6ed087861bfa117e6fbbd603c2051b0cc1b0d704bc764011aabb6',
          burn: parseInt(e.target.tickets.value) * 10000,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'BuyTickets',
        },
      ],
      gas_rpc: [
        {
          name: 'SC_ACTION',
          datatype: 'U',
          value: 0,
        },
        {
          name: 'SC_ID',
          datatype: 'H',
          value:
            'c166e646ac69477c1b50bb365362f8150a8befb6ca2e3acb2b17e0f47b5876d3',
        },
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'BuyTickets',
        },
      ],
    });
    let fee = await getGasEstimate(data);
    console.log('fee', fee);
    if (fee > 0) {
      data.fees = fee;
      sendTransaction(data);
    } else {
      setError(
        'Sorry this transaction is too large. Try buying 100 tickets at a time.'
      );
    }
  });

  const RedeemCOCO = useCallback(async (e) => {
    //find x tickets owned by user then create appropriate string
    e.preventDefault();
    let ticketString = '';
    for (var i = 0; i < e.target.tickets.value; i++) {
      let ticket = userTickets[i];
      if (ticket / 10 < 1) {
        ticket = '00000' + userTickets[i].toString();
      } else if (ticket / 100 < 1) {
        ticket = '0000' + userTickets[i].toString();
      } else if (ticket / 1000 < 1) {
        ticket = '000' + userTickets[i].toString();
      } else if (ticket / 10000 < 1) {
        ticket = '00' + userTickets[i].toString();
      } else if (ticket / 100000 < 1) {
        ticket = '0' + userTickets[i].toString();
      } else {
        ticket = userTickets[i].toString();
      }
      ticketString += ticket;
    }
    const data = new Object({
      scid: state.scid_lotto,
      ringsize: 2,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'RedeemCOCO',
        },
        {
          name: 'ticket',
          datatype: 'S',
          value: ticketString,
        },
      ],
      gas_rpc: [
        {
          name: 'SC_ACTION',
          datatype: 'U',
          value: 0,
        },
        {
          name: 'SC_ID',
          datatype: 'H',
          value:
            'c166e646ac69477c1b50bb365362f8150a8befb6ca2e3acb2b17e0f47b5876d3',
        },
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'RedeemCOCO',
        },
        {
          name: 'ticket',
          datatype: 'S',
          value: ticketString,
        },
      ],
    });
    let fee = await getGasEstimate(data);
    console.log('fee', fee);
    if (fee > 0) {
      data.fees = fee;
      sendTransaction(data);
    } else {
      setError(
        'Sorry this transaction is too large. Try selling 75 tickets at a time.'
      );
    }
  });

  return (
    <FullPageContainer bgImage={bgImage} rightPct={-75}>
      <h1 className="mb-6 text-4xl font-bold">COCO Lotto</h1>
      <div className="px-10 text-xl">
        Deposit your Cocotokenuts to buy tickets in the COCO Lotto!
        <div>One Lotto Ticket costs 10,000 COCO.</div>
        <div>A single ticket is good for life.</div>
        <div>You can sell your tickets at anytime for 9,000 COCO each.</div>
      </div>
      <FlexBoxColumn className="mt-3 rounded-xl border border-accent p-4 text-2xl">
        <div>Total Tickets in Next Draw</div>
        <div className="text-5xl">{totalTickets}</div>
      </FlexBoxColumn>
      <div className="hero relative mt-3 items-start rounded-lg bg-secondary px-2 font-fell text-2xl">
        <FlexBoxColumn className="hero-content">
          {lottos.map((x) => (
            <div
              className="mt-3 rounded-xl border border-accent p-4 text-2xl"
              key={x.Name}
            >
              <h1>{x.Name}</h1>
              <h3>Amount in atomic units: {x.Treasury}</h3>
              <h3>
                Next Lotto Draw:&nbsp;
                {x.Time ? Helpers.formatDate(x.Time) : 'unspecified'}
              </h3>
            </div>
          ))}
          <div>
            You have {userTickets.length} ticket
            {userTickets.length === 1 ? '' : 's'} (
            {((100 * userTickets.length) / totalTickets).toFixed(2) +
              '% chance of winning)'}
          </div>
          <div className="w-full">
            <form onSubmit={BuyTickets} className="flex w-full">
              <div className="flex-grow px-2">
                <input
                  type="number"
                  placeholder="tickets"
                  className="input input-bordered w-full max-w-xs border border-accent"
                  id="tickets"
                />
              </div>
              <div className="px-2">
                <Button
                  size="md"
                  btnColor="accent"
                  color="text-white"
                  type={'submit'}
                >
                  Buy Tickets
                </Button>
              </div>
            </form>
            <form onSubmit={RedeemCOCO} className="my-2 flex w-full">
              <div className="flex-grow px-2">
                <input
                  type="number"
                  placeholder="tickets"
                  className="input input-bordered w-full max-w-xs border border-accent"
                  id="tickets"
                />
              </div>
              <div className="px-2">
                <Button
                  size="md"
                  btnColor="accent"
                  color="text-white"
                  type={'submit'}
                >
                  Sell Tickets
                </Button>
              </div>
            </form>
            {error}
          </div>
        </FlexBoxColumn>
      </div>
    </FullPageContainer>
  );
}
