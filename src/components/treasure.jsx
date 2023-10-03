import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import RT from './RT';
import Executer from './Executer';
import N from './N';
import Judge from './Judge';
import { useSendTransaction } from '../useSendTransaction';
import GI from './getIslands';
import { SupportBountyByERC20 } from './supportBountyByErc20';
import { useNameLookup } from '../useNameLookup';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { Button } from '@/components/common/Button.jsx';

export default function Treasure() {
  const [treasure, setTreasure] = React.useState({});
  const params = useParams();
  const island = params.island;
  const index = params.index;
  const [state, setState] = React.useContext(LoginContext);
  const [judging, setJudging] = React.useState(false);
  const [executing, setExecuting] = React.useState(false);
  const [sendTransaction] = useSendTransaction();
  const [nameLookup] = useNameLookup();
  const [islandSCID, setIslandSCID] = React.useState('');
  const [recipients, setRecipients] = React.useState([]);
  const [editing, setEditing] = React.useState(false);

  const getJudging = () => {
    console.log('myslands', state);
    if (!state.myIslands || !treasure.Judges || state.myIslands.length == 0)
      return;
    const matching = treasure.Judges.filter(
      (execObj) => execObj.SCID === state.myIslands[state.active].SCID
    );

    if (matching.length == 1) setJudging(true);
    else setJudging(false);
  };

  const getExecuting = () => {
    console.log('execList', treasure.execList, treasure.XN);
    if (!state.myIslands || !treasure.execList || state.myIslands.length == 0)
      return;
    const matching = treasure.execList.filter(
      (execObj) => execObj.scid === state.myIslands[state.active].scid
    );

    if (matching.length == 1) setExecuting(true);
    else setExecuting(false);
  };

  React.useEffect(() => {
    getJudging();
    getExecuting();
  }, [state.myIslands, treasure, state.active]);

  const AddTreasure = React.useCallback(async (event) => {
    event.preventDefault();

    //const deroBridgeApi = state.deroBridgeApiRef.current

    const data = new Object({
      scid: state.scid_bounties,
      ringsize: 2,
      transfers: [
        {
          destination: state.randomAddress,
          burn: parseInt(event.target.amount.value * 100000),
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'BT',
        },

        {
          name: 'H',
          datatype: 'S',
          value: islandSCID,
        },
        {
          name: 'i',
          datatype: 'U',
          value: parseInt(index),
        },
        {
          name: 'J',
          datatype: 'S',
          value: 'J',
        },
        {
          name: 'X',
          datatype: 'S',
          value: 'X',
        },
        {
          name: 'E',
          datatype: 'U',
          value: 0,
        },
        {
          name: 'name',
          datatype: 'S',
          value: '',
        },
      ],
    });

    sendTransaction(data);
  });

  const getFunds = React.useCallback(async () => {
    let profile = await GI(state, island);
    console.log(profile.Bounties);
    setTreasure(profile.Bounties[index]);
    setIslandSCID(profile.SCID);
    if (
      profile.bounties[index].recipientList &&
      profile.bounties[index].recipientList.length > 0
    ) {
      let rawList = profile.bounties[index].recipientList;
      var totalWeight = 0;
      for (let i = 0; i < rawList.length; i++) {
        totalWeight += rawList[i].weight;
      }

      let formattedList = rawList.map((x) => (
        <li>{`${x.address}: ${(100 * x.weight) / totalWeight}%`}</li>
      ));
      setRecipients(formattedList);
    }
  });

  const ClaimTreasure = React.useCallback(async (event) => {
    event.preventDefault();
    console.log(treasure.judge);
    var hash = params.island;

    const data = new Object({
      ringsize: 16,
      transfers: [
        {
          destination: treasure.judgeAddress,
          amount: 1,

          payload_rpc: [
            {
              name: 'C',
              datatype: 'S',
              value:
                'Treasure Claim Submitted by: ' +
                state.walletList[state.activeWallet].address,
            },
            {
              name: 'POC',
              datatype: 'S',
              value: event.target.proof.value,
            },
          ],
        },
      ],
    });
    sendTransaction(data);
  });

  const SetMetaData = React.useCallback(async (event) => {
    event.preventDefault();
    const attributes = ['Description', 'Name', 'Image', 'Tagline'];
    var count = 0;
    var method = '';
    var scrpc = [
      {
        name: 'H',
        datatype: 'S',
        value: islandSCID,
      },
      {
        name: 'i',
        datatype: 'U',
        value: parseInt(index),
      },
    ];
    for (var a of attributes) {
      if (event.target[`${a}`].value) {
        count++;
        method = `Set${a}`;
      }
    }
    if (count > 1) {
      method = 'SetMetadata';
      scrpc = scrpc.concat([
        {
          name: 'entrypoint',
          datatype: 'S',
          value: method,
        },
        {
          name: 'Name',
          datatype: 'S',
          value: event.target.Name.value,
        },
        {
          name: 'Image',
          datatype: 'S',
          value: event.target.Image.value,
        },
        {
          name: 'Tagline',
          datatype: 'S',
          value: event.target.Tagline.value,
        },

        {
          name: 'Description',
          datatype: 'S',
          value: event.target.Description.value,
        },
      ]);
    } else {
      console.log('method', method, method.substring(3));
      scrpc = scrpc.concat([
        {
          name: 'entrypoint',
          datatype: 'S',
          value: method,
        },
        {
          name: method.substring(3),
          datatype: 'S',
          value: event.target[`${method.substring(3)}`].value,
        },
      ]);
    }

    const transfers = [
      {
        destination: state.randomAddress,
        scid: islandSCID,
        burn: 1,
      },
    ];

    let fee;
    if (
      method == 'setDescription' &&
      event.target.Description.value.length > 360
    )
      fee = 10000;

    const txData = new Object({
      scid: state.scid_bounties,
      ringsize: 2,
      fees: fee,
      transfers: transfers,
      sc_rpc: scrpc,
    });
    sendTransaction(txData);

    setSearchParams({ status: 'success' });
  });

  React.useEffect(() => {
    console.log('executed only once!');

    getFunds();
  }, [state.ipfs]);

  return (
    <div className="card card-side my-3 flex-col whitespace-normal bg-info shadow-xl md:flex-row">
      <div>
        {!editing &&
        state.myIslands &&
        state.myIslands.length > 0 &&
        island == state.myIslands[state.active].name ? (
          <small
            onClick={() => {
              setEditing(true);
            }}
          >
            edit
          </small>
        ) : (
          <></>
        )}
        {editing ? (
          <div className="profile">
            <form onSubmit={SetMetaData}>
              <small
                onClick={() => {
                  setEditing(false);
                }}
              >
                cancel
              </small>
              <input
                className="input input-bordered w-full max-w-xs"
                placeholder="name"
                id="Name"
              />
              <input
                className="input input-bordered w-full max-w-xs"
                placeholder="image url"
                defaultValue={treasure.image}
                id="Image"
              />
              <input
                className="input input-bordered w-full max-w-xs"
                placeholder="tagline"
                defaultValue={treasure.tagline}
                id="Tagline"
              />
              <textarea
                placeholder="description"
                rows="44"
                cols="80"
                defaultValue={treasure.description}
                id="Description"
              />
              <Button size="small" type={'submit'}>
                Submit
              </Button>
            </form>
          </div>
        ) : (
          <></>
        )}

        {treasure.Names ? (
          <>
            <div className="card-body break-words text-neutral">
              <FlexBoxRow className="" justify="start">
                <figure className="mr-4 min-w-[200px] max-w-[300px] content-center rounded-lg">
                  <img
                    src={treasure.Images[treasure.Images.length - 1]}
                    alt={treasure.Names[treasure.Names.length - 1]}
                  />
                </figure>
                <FlexBoxColumn className="" align="start">
                  <h1 className="card-title">
                    {treasure.Names[treasure.Names.length - 1]}
                  </h1>
                  <h3 className="font-bold">
                    Initiated by{' '}
                    <NavLink to={`/island/${treasure.Initiator.SCID}`}>
                      {treasure.Initiator.Name}
                    </NavLink>{' '}
                  </h3>
                  <h3 className="font-bold">
                    Treasure: {treasure.Amount / 100000} Dero
                  </h3>
                  <h3 className="font-bold">{treasure.tagline}</h3>
                  {treasure.Status == 0 ? (
                    <p>
                      This treasure expires on{' ' + treasure.Expiry}. If
                      treasure isn't released before this date, contributors can
                      return to this page to receive a 95% refund.
                    </p>
                  ) : treasure.Status == 2 ? (
                    <p>
                      This bounty has expired. If you added your treasure, you
                      can reclaim it now.
                      <RT
                        refund={true}
                        scid={state.scid_bounties}
                        dba={state.deroBridgeApiRef}
                        island={islandSCID}
                        index={index}
                      />
                    </p>
                  ) : (
                    <p>This bounty was a success.</p>
                  )}
                </FlexBoxColumn>
              </FlexBoxRow>

              {treasure.Judge ? (
                <h3>
                  Active Judge:
                  <NavLink to={`/island/${treasure.Judge.SCID}?view=main`}>
                    {treasure.Judge.Name}
                  </NavLink>
                </h3>
              ) : (
                ''
              )}
              {treasure.executer ? (
                <h3>
                  Active Executer:
                  <NavLink to={`/island/${treasure.executer.name}?view=main`}>
                    {treasure.executer.name}
                  </NavLink>
                </h3>
              ) : (
                ''
              )}

              {treasure.recipientList && treasure.recipientList.length > 0 ? (
                <>
                  These addresses have been nominated to receive the treasure:
                  <ul>{recipients}</ul>
                </>
              ) : (
                ''
              )}

              <span className="divider" />
              <div className="">
                <span>
                  <h3 className="font-bold">Nominated judges: </h3>
                  <ol>
                    {treasure.Judges.map((j, i) => (
                      <li>
                        <NavLink to={`/island/${j.SCID}?view=main`}>
                          {treasure.JNeff == i ? (
                            <b>
                              {j.Name}
                              {treasure.Judges && treasure.Judges.length > 1 ? (
                                <>
                                  {' '}
                                  (expires in{' '}
                                  {Math.round(
                                    treasure.JEeff / (60 * 60 * 24)
                                  )}{' '}
                                  days)
                                </>
                              ) : (
                                ''
                              )}
                            </b>
                          ) : (
                            j.Name
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ol>
                </span>

                <span>
                  <h3 className="font-bold">Nominated executors: </h3>
                  <ol>
                    {treasure.Execs &&
                      treasure.Execs.map((j, i) => (
                        <li>
                          <NavLink to={`/island/${j.SCID}?view=main`}>
                            {treasure.XNeff == i ? (
                              <b>
                                {j.Name}
                                {treasure.execList &&
                                treasure.execList.length > 1 ? (
                                  <>
                                    {' '}
                                    (expires in{' '}
                                    {Math.round(
                                      treasure.XEeff / (60 * 60 * 24)
                                    )}{' '}
                                    days)
                                  </>
                                ) : (
                                  ''
                                )}
                              </b>
                            ) : (
                              j.Name
                            )}
                          </NavLink>
                        </li>
                      ))}
                  </ol>
                </span>
              </div>

              {treasure.Status == 0 &&
              state.myIslands &&
              state.myIslands.length > 0 &&
              island == state.myIslands[state.active].name ? (
                <div className="">
                  <h3>Initiator Functions</h3>
                  <p>
                    You initiated this bounty. You may nominate backup judges
                    and executers.
                  </p>
                  <N
                    island={island}
                    index={index}
                    randomAddress={state.randomAddress}
                    dba={state.deroBridgeApiRef}
                    l="X"
                    scid_registry={state.scid_registry}
                    scid_bounties={state.scid_bounties}
                  />
                  <N
                    island={island}
                    index={index}
                    dba={state.deroBridgeApiRef}
                    l="J"
                    randomAddress={state.randomAddress}
                    scid_registry={state.scid_registry}
                    scid_bounties={state.scid_bounties}
                  />
                </div>
              ) : (
                ''
              )}

              {treasure.Status == 0 &&
              state.myIslands &&
              state.myIslands.length > 0 &&
              judging ? (
                <Judge
                  active={treasure.Judges[treasure.JN]}
                  userIsland={state.myIslands[state.active].SCID}
                  island={islandSCID}
                  index={index}
                  judge={treasure.Judge && treasure.Judge.SCID}
                  JF={treasure.JF}
                  deroBridgeApiRef={state.deroBridgeApiRef}
                  randomAddress={state.randomAddress}
                  scid={state.scid_bounties}
                  XE={treasure.JE}
                  solo={treasure.Judges.length == 1}
                  recipientList={treasure.recipientList}
                />
              ) : (
                ''
              )}

              {treasure.Status == 0 &&
              state.myIslands &&
              state.myIslands.length > 0 &&
              executing ? (
                <Executer
                  active={treasure.execList[treasure.XN]}
                  userIsland={state.myIslands[state.active].scid}
                  island={islandSCID}
                  index={index}
                  executer={treasure.executer && treasure.executer.scid}
                  JF={treasure.JF}
                  deroBridgeApiRef={state.deroBridgeApiRef}
                  randomAddress={state.randomAddress}
                  scid={state.scid_bounties}
                  XE={treasure.XE}
                  solo={treasure.execList.length == 1}
                />
              ) : (
                ''
              )}

              <p
                dangerouslySetInnerHTML={{
                  __html:
                    treasure.Descriptions[treasure.Descriptions.length - 1],
                }}
              />
              <span className="divider" />

              {treasure.Status == 0 ? (
                <FlexBoxColumn align="center" className="">
                  <form onSubmit={AddTreasure}>
                    <FlexBoxRow className="space-x-4" justify="stretch">
                      <input
                        id="amount"
                        type="text"
                        placeholder="Amount (Dero)"
                        className="input input-bordered w-full max-w-xs"
                      />
                      <Button size="small" type={'submit'}>
                        Add Treasure
                      </Button>
                    </FlexBoxRow>
                  </form>

                  <form onSubmit={ClaimTreasure} className="space-x-4">
                    <FlexBoxRow className="space-x-4" justify="stretch">
                      <input
                        id="proof"
                        type="text"
                        placeholder="proof"
                        className="input input-bordered w-full max-w-xs"
                      />
                      <Button size="small" type={'submit'}>
                        Claim Treasure
                      </Button>
                    </FlexBoxRow>
                  </form>
                </FlexBoxColumn>
              ) : (
                ''
              )}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <SupportBountyByERC20 H={island} i={index} />
      </div>
    </div>
  );
}
