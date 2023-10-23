import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import Success from './success.jsx';
import hex2a from './hex2a.js';
import { useSendTransaction } from './hooks/useSendTransaction';
import { useGetSC } from './hooks/useGetSC';
import { Button } from '@/components/common/Button.jsx';
import { useGetGasEstimate } from './hooks/useGetGasEstimate';
import { useTheme } from '@/components/hooks/useTheme.js';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import { Divider } from '@/components/common/Divider.jsx';

export default function BuryTreasure() {
  const { proseClass } = useTheme();
  const [state, setState] = React.useContext(LoginContext);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const island = params.island;
  const index = params.index;
  const [judges, setJudges] = React.useState([]);
  const [execs, setExecs] = React.useState([]);
  const [error, setError] = React.useState('');
  const [preview, setPreview] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');
  const [tagline, setTagline] = React.useState('');
  const [name, setName] = React.useState(searchParams.get('name'));
  const [sendTransaction] = useSendTransaction();
  const [getGasEstimate] = useGetGasEstimate();
  const [getSC] = useGetSC();

  const getJudges = React.useCallback(async () => {
    const res = await getSC(state.scid_registry, false, true);
    console.log('get judges res', res);
    var search = new RegExp(`nPRIVATE-ISLANDS*`);
    var scData = res.stringkeys; //.map(x=>x.match(search))

    const judgeList = Object.keys(scData)
      .filter((key) => search.test(key))
      .map((key) => (
        <option value={key.substring(16)}>{hex2a(scData[key])}</option>
      ));

    setJudges(judgeList);
  });

  React.useEffect(() => {
    getJudges();
  }, [state]);

  const handlePreview = () => {
    console.log('preview change');
    setPreview(!preview);
  };

  const updateMetaData = React.useCallback(async (event) => {
    event.preventDefault();
    let fee;
    if (event.target.description.value.length > 380) fee = 10000;

    const transfers = [
      {
        destination: state.randomAddress,
        scid: island,
        burn: 1,
      },
    ];

    const txData = new Object({
      scid: state.scid_bounties,
      ringsize: 2,
      fees: fee,
      transfers: transfers,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'SetMetadata',
        },

        {
          name: 'H',
          datatype: 'S',
          value: island,
        },
        {
          name: 'i',
          datatype: 'U',
          value: parseInt(index),
        },
        {
          name: 'Name',
          datatype: 'S',
          value: event.target.bountyName.value,
        },
        {
          name: 'Image',
          datatype: 'S',
          value: event.target.bountyPhoto.value,
        },
        {
          name: 'Tagline',
          datatype: 'S',
          value: event.target.tagline.value,
        },

        {
          name: 'Description',
          datatype: 'S',
          value: event.target.description.value,
        },
      ],
    });
    sendTransaction(txData);

    setSearchParams({ status: 'success' });
  });

  const DoIt = React.useCallback(async (event) => {
    event.preventDefault();
    if (!event.target.bountyName.value) {
      setError('Bounty name is required.');
      return;
    }
    if (!event.target.expiry.value) {
      setError('Expiry is required.');
      return;
    }

    const res0 = await getSC(state.scid_registry, false, true);
    var executer = event.target.executer.value;

    if (executer === 'self') executer = event.target.island.value;

    var judge = event.target.judge.value;
    if (judge === 'self') judge = event.target.island.value;

    var burn = 100;

    var expiry =
      new Date(event.target.expiry.value).getTime() / 1000 +
      new Date().getTimezoneOffset() * 60;
    if (expiry < new Date().getTime() / 1000) {
      setError('Expiry must be future date');
      return;
    }

    const transfers = [
      {
        destination: state.randomAddress,
        scid: island,
        burn: 1,
      },
      {
        destination: state.randomAddress,
        burn: parseInt(event.target.treasure.value * 100000),
      },
    ];

    var txData = new Object({
      scid: state.scid_bounties,
      ringsize: 2,
      transfers: transfers,
      signer: state.userAddress,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'BT',
        },

        {
          name: 'H',
          datatype: 'S',
          value: island,
        },
        {
          name: 'i',
          datatype: 'U',
          value: parseInt(index),
        },
        {
          name: 'J',
          datatype: 'S',
          value: event.target.judge.value,
        },
        {
          name: 'X',
          datatype: 'S',
          value: event.target.executer.value,
        },
        {
          name: 'E',
          datatype: 'U',
          value: expiry,
        },

        {
          name: 'name',
          datatype: 'S',
          value: event.target.bountyName.value,
        },
        {
          name: 'image',
          datatype: 'S',
          value: event.target.bountyPhoto.value,
        },
        {
          name: 'tagline',
          datatype: 'S',
          value: event.target.tagline.value,
        },

        {
          name: 'desc',
          datatype: 'S',
          value: event.target.description.value,
        },
      ],
    });
    const gas_rpc = [
      {
        name: 'SC_ACTION',
        datatype: 'U',
        value: 0,
      },
      {
        name: 'SC_ID',
        datatype: 'H',
        value: state.scid_bounties,
      },
    ].concat(txData.sc_rpc);

    txData.gas_rpc = gas_rpc;

    txData.fees = await getGasEstimate(txData);

    sendTransaction(txData);

    /*  setSearchParams({
      status: 'metadata',
      name: event.target.bountyName.value,
    }); */
  });

  return (
    <div className="hero mt-3 min-h-screen rounded-lg bg-secondary px-20">
      {searchParams.get('status') === 'success' ? (
        <Success />
      ) : (
        <div className={`$(proseClass) font-serif`}>
          <div className="py-3 text-3xl">Bury Treasure</div>
          <div className="py-2 text-xl">
            When you bury treasure on your private island, you are creating a
            bounty for some specific goal. Specify the criteria for release of
            treasure, and appoint a judge (it can be you) to decide when that
            criteria has been met.
          </div>

          <form onSubmit={DoIt}>
            {preview ? (
              <FlexBoxColumn
                align="start"
                className={`${proseClass} card card-side my-3 whitespace-normal bg-info p-4 shadow-xl`}
              >
                <div className="self-center font-serif text-2xl">
                  Preview Mode
                </div>
                <h1>{name}</h1>
                <img src={image} />
                <p>{tagline}</p>
                <div className="text-zinc-900">
                  <p dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                <Divider color="accent" size="1" />
                <Button size="small" handleClick={() => handlePreview()}>
                  {preview ? 'Return To Edit' : 'Description Preview'}
                </Button>
              </FlexBoxColumn>
            ) : (
              <FlexBoxColumn>
                <FlexBoxRow className="mb-3">
                  <input
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Buried Treasure Name"
                    id="bountyName"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setImage(e.target.value)}
                    defaultValue={image}
                    placeholder="Image URL"
                    id="bountyPhoto"
                  />
                  <input
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setTagline(e.target.value)}
                    defaultValue={tagline}
                    placeholder="Tagline"
                    id="tagline"
                  />
                </FlexBoxRow>
                <FlexBoxRow gap={2} align="end">
                  <textarea
                    className="rounded"
                    placeholder="Description"
                    rows="20"
                    cols="100"
                    id="description"
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button size="small" handleClick={() => handlePreview()}>
                    {preview ? 'Edit' : 'Preview Description'}
                  </Button>
                </FlexBoxRow>
              </FlexBoxColumn>
            )}

            <FlexBoxColumn className="my-3 rounded border border-accent p-2">
              <FlexBoxRow justify="start" align="start">
                <div className="mt-3 w-1/2 text-2xl">
                  Expiry (if the task isn't complete before this date,
                  supporters can retrieve their funds)
                </div>
                <FlexBoxColumn align="center">
                  <input
                    className="input input-bordered w-full max-w-xs"
                    type="date"
                    id="expiry"
                    name="expiry"
                  />
                  <input
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Initial Treasure (Dero Amount)"
                    id="treasure"
                    type="text"
                  />
                </FlexBoxColumn>
              </FlexBoxRow>
              <Divider color="accent" size="1" />
              <FlexBoxRow justify="start" align="start" gap={2}>
                <div className="w-1/2 text-2xl">
                  Nominate a Judge. This person sorts through treasure claims
                  and chooses who is entitled to the funds.
                </div>
                <select id="judge">{judges}</select>
              </FlexBoxRow>
              <Divider color="accent" size="1" />
              <FlexBoxRow justify="start" align="start" gap={2}>
                <div className="w-1/2 text-2xl">
                  Nominate an Executor. This person releases the treasure
                  according to the judge's judgement, or he may veto the
                  decision if he believes it to be in error. He is not paid.
                  Backup executors can be nominated later.
                </div>
                <select id="executer">{judges}</select>
              </FlexBoxRow>

              <Button size="small" type={'submit'} className="self-end">
                Create
              </Button>
            </FlexBoxColumn>
          </form>
          {error && (
            <FlexBoxRow className="my-3 rounded border border-error bg-info text-2xl text-error">
              {error}
            </FlexBoxRow>
          )}
        </div>
      )}
    </div>
  );
}
