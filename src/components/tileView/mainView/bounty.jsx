import { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LoginContext } from '@/LoginContext.jsx';
import RT from '@/components/RT.jsx';
import Executer from '@/components/Executer.jsx';
import N from '@/components/N.jsx';
import Judge from '@/components/Judge.jsx';
import { useSendTransaction } from '@/useSendTransaction';
import GI from '@/components/getIslands';
import { SupportBountyByERC20 } from '@/components/supportBountyByErc20';
import { useNameLookup } from '@/useNameLookup';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { Button } from '@/components/common/Button.jsx';
import { Divider } from '@/components/common/Divider.jsx';
import { useTheme } from '@/components/hooks/useTheme.js';
import { TileContext } from '@/components/providers/TileContext.jsx';
import { Helpers } from '@/utils/helpers.js';

export const Bounty = ({ bountyData }) => {
  const { proseClass } = useTheme();
  const [state, setState] = useContext(LoginContext);
  const { gotoIslandTile } = useContext(TileContext);
  const [treasure, setTreasure] = useState({});
  const island = bountyData.Initiator.SCID;
  const index = bountyData.Index;
  const [judging, setJudging] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [sendTransaction] = useSendTransaction();
  const [nameLookup] = useNameLookup();
  const [islandSCID, setIslandSCID] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [editing, setEditing] = useState(false);

  const getJudging = () => {
    console.log('myslands', state);
    if (!state.myIslands || !treasure.Judges || state.myIslands.length === 0)
      return;
    const matching = treasure.Judges.filter(
      (execObj) => execObj.SCID === state.myIslands[state.active].SCID
    );

    if (matching.length === 1) setJudging(true);
    else setJudging(false);
  };

  const getExecuting = () => {
    console.log('execList', treasure.execList, treasure.XN);
    if (!state.myIslands || !treasure.execList || state.myIslands.length === 0)
      return;
    const matching = treasure.execList.filter(
      (execObj) => execObj.scid === state.myIslands[state.active].scid
    );

    if (matching.length === 1) setExecuting(true);
    else setExecuting(false);
  };

  useEffect(() => {
    getJudging();
    getExecuting();
  }, [state.myIslands, treasure, state.active]);

  const AddTreasure = useCallback(async (event) => {
    event.preventDefault();

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

  const getFunds = useCallback(async () => {
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

  const ClaimTreasure = useCallback(async (event) => {
    event.preventDefault();
    console.log(treasure.judge);
    var hash = bountyData.Initiator.SCID;

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

  const SetMetaData = useCallback(async (event) => {
    event.preventDefault();
    const transfers = [
      {
        destination: state.randomAddress,
        scid: islandSCID,
        burn: 1,
      },
    ];

    let fee;
    if (event.target.Description.value.length > 360) fee = 10000;

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
          value: islandSCID,
        },
        {
          name: 'i',
          datatype: 'U',
          value: parseInt(index),
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
      ],
    });
    sendTransaction(txData);

    setSearchParams({ status: 'success' });
  });

  useEffect(() => {
    console.log('executed only once!');

    getFunds();
  }, [state.ipfs]);

  return (
    <FlexBoxRow className="align-center card card-side my-3 whitespace-normal bg-secondary shadow-xl">
      <div>
        {!editing &&
        state.myIslands &&
        state.myIslands.length > 0 &&
        island === state.myIslands[state.active].name ? (
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
          <form onSubmit={SetMetaData}>
            <FlexBoxColumn className="mt-20">
              <FlexBoxRow gap={2}>
                <input
                  className="input-bordered input w-full max-w-xs"
                  placeholder="name"
                  defaultValue={
                    treasure.Names && treasure.Names[treasure.Names.length - 1]
                  }
                  id="Name"
                />
                <input
                  className="input-bordered input w-full max-w-xs"
                  placeholder="image url"
                  defaultValue={Helpers.getTileImage(bountyData)}
                  id="Image"
                />
                <input
                  className="input-bordered input w-full max-w-xs"
                  placeholder="tagline"
                  defaultValue={Helpers.getTileTagline(bountyData)}
                  id="Tagline"
                />
              </FlexBoxRow>
              <textarea
                placeholder="Description"
                rows="20"
                cols="80"
                defaultValue={treasure.description}
                id="Description"
                className="my-2 rounded-md"
              />
              <Button size="small" type={'submit'}>
                Submit
              </Button>
              <small
                onClick={() => {
                  setEditing(false);
                }}
              >
                cancel
              </small>
            </FlexBoxColumn>
          </form>
        ) : (
          <></>
        )}

        {treasure.Names ? (
          <>
            <div className="card-body break-words font-fell">
              <FlexBoxRow align="start" className="">
                <figure className="mr-4 min-w-[200px] max-w-[300px] content-center rounded-lg">
                  <img
                    src={Helpers.getTileImage(bountyData)}
                    alt={Helpers.getTileName(bountyData)}
                  />
                </figure>
                <FlexBoxColumn className="" align="start">
                  <h1 className="card-title">
                    {Helpers.getTileName(bountyData)}
                  </h1>
                  <h3
                    className="cursor-pointer font-bold"
                    onClick={() =>
                      gotoIslandTile(Helpers.getInitiatorScid(bountyData))
                    }
                  >
                    Initiated by {Helpers.getInitiatorName(bountyData)}
                  </h3>
                  <h3 className="font-bold">
                    Treasure: {treasure.Amount / 100000} Dero
                  </h3>
                  <h3 className="font-bold">
                    {Helpers.getTileTagline(bountyData)}
                  </h3>
                  {treasure.Status === 0 ? (
                    <div className="mt-2">
                      This treasure expires on{' ' + treasure.Expiry}. <br />
                      If treasure isn't released before this date, contributors
                      can return to this page to receive a 95% refund.
                    </div>
                  ) : treasure.Status === 2 ? (
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
                  {treasure.Judge ? (
                    <div className="mt-3 text-xl font-bold">
                      Active Judge:
                      <NavLink to={`/island/${treasure.Judge.SCID}?view=main`}>
                        {treasure.Judge.Name}
                      </NavLink>
                    </div>
                  ) : (
                    ''
                  )}
                  {treasure.executer ? (
                    <div className="mt-2 text-xl font-bold">
                      Active Executer:
                      <NavLink
                        to={`/island/${treasure.executer.name}?view=main`}
                      >
                        {treasure.executer.name}
                      </NavLink>
                    </div>
                  ) : (
                    ''
                  )}
                  {treasure.recipientList &&
                  treasure.recipientList.length > 0 ? (
                    <>
                      These addresses have been nominated to receive the
                      treasure:
                      <ul>{recipients}</ul>
                    </>
                  ) : (
                    ''
                  )}

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
                                  {treasure.Judges &&
                                  treasure.Judges.length > 1 ? (
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
                  <span className="divider" />
                  {treasure.Status === 0 &&
                  state.myIslands &&
                  state.myIslands.length > 0 &&
                  island === state.myIslands[state.active].name ? (
                    <div className="">
                      <h3>Initiator Functions</h3>
                      <p>
                        You initiated this bounty. You may nominate backup
                        judges and executers.
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

                  {treasure.Status === 0 &&
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
                      solo={treasure.Judges.length === 1}
                      recipientList={treasure.recipientList}
                    />
                  ) : (
                    ''
                  )}

                  {treasure.Status === 0 &&
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

                  <div className={`${proseClass} text-zinc-900`}>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: Helpers.getTileDescription(bountyData),
                      }}
                    />{' '}
                  </div>

                  {treasure.Status === 0 ? (
                    <FlexBoxColumn align="start" className="w-full">
                      <form onSubmit={AddTreasure} className="my-2 flex w-1/2">
                        <div className="flex-grow px-2">
                          <input
                            id="amount"
                            type="text"
                            placeholder="Amount (Dero)"
                            className="input-bordered input w-full max-w-xs"
                          />
                        </div>
                        <div className="p-2">
                          <Button size="small" type={'submit'}>
                            Add Treasure
                          </Button>
                        </div>
                      </form>

                      <form
                        onSubmit={ClaimTreasure}
                        className="my-2 flex w-1/2"
                      >
                        <div className="flex-grow p-2">
                          <input
                            id="proof"
                            type="text"
                            placeholder="proof"
                            className="input-bordered input w-full max-w-xs"
                          />
                        </div>
                        <div className="p-2">
                          <Button size="small" type={'submit'}>
                            Claim Treasure
                          </Button>
                        </div>
                      </form>
                    </FlexBoxColumn>
                  ) : (
                    ''
                  )}
                </FlexBoxColumn>
              </FlexBoxRow>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <SupportBountyByERC20 H={island} i={index} />
      </div>
    </FlexBoxRow>
  );
};
