import React from 'react';
import { useParams } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import { useSearchParams, NavLink } from 'react-router-dom';
import to from 'await-to-js';
import TreasureCard from './treasureCard';
import FundCard from './fundCard';
import Feed from './feed';
import FutureFeed from './futureFeed';
import PublishPost from './publishPost';
import { useSendTransaction } from './hooks/useSendTransaction';
import { useGetSC } from './hooks/useGetSC';
import { Button } from '@/components/common/Button.jsx';

export default function MyIsland() {
  const [sendTransaction] = useSendTransaction();
  const [post, setPost] = React.useState([]);
  const [editing, setEditing] = React.useState('');
  const [tierToModify, setTierToModify] = React.useState(0);
  const [postTier, setPostTier] = React.useState(0);
  const [postToEdit, setPostToEdit] = React.useState(0);
  const [signalToClaim, setSignalToClaim] = React.useState(0);
  const [treasureToClaim, setTreasureToClaim] = React.useState(0);
  const [state, setState] = React.useContext(LoginContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const [treasures, setTreasures] = React.useState([]);
  const [signals, setSignals] = React.useState([]);
  const [view, setView] = React.useState('main');
  const [judging, setJudging] = React.useState([]);
  const [executing, setExecuting] = React.useState([]);
  const [getSC] = useGetSC();
  const [island, setIsland] = React.useState(null);

  function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  const getIslands = React.useCallback(async () => {
    if (!state.myIslands) return;
    if (state.myIslands.length == 1) {
      setPost(state.myIslands);
    } else {
      setPost(state.myIslands[state.active]);
    }
    console.log('GET ISLANDS CALLBACK', post);
  });

  React.useEffect(() => {
    if (state.myIslands) {
      setIsland(state.myIslands[state.active]);
    }
  }, [post, searchParams, state.active]);

  const SetMetadata = async (event) => {
    event.preventDefault();

    let island = state.myIslands[state.active];
    let fee;
    if (event.target.edit.value.length > 380) fee = 10000;

    const metaDataData = {
      scid: island.scid,
      ringsize: 2,
      fees: fee,
      transfers: [
        {
          destination: state.randomAddress,
          burn: 1,
          scid: island.scid,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: `Set${editing}`,
        },
        {
          name: editing,
          datatype: 'S',
          value: event.target.edit.value,
        },
      ],
    };

    sendTransaction(metaDataData);
    setEditing('');
  };

  const editIsland = async (e) => {
    e.preventDefault();
    if (editing == 'posts') {
      if (state.myIslands[state.active].posts) {
        state.myIslands[state.active].posts.push(e.target.post.value);
        //state.myIslands[state.active].posts=[e.target.post.value]
      } else {
        state.myIslands[state.active].posts = [e.target.post.value];
      }
    } else {
      state.myIslands[state.active][`${editing}`] = e.target.edit.value;
    }

    var burn = 100;

    var transfers = [];
    if (state.cocoBalance < burn) {
      transfers.push({
        destination: state.randomAddress,
        burn: burn * 100,
      });
    } else {
      transfers.push({
        destination: state.randomAddress,
        scid: state.coco,
        burn: burn,
      });
    }

    ////////////code copied from claim page

    var islandData = JSON.stringify({
      pinataOptions: {
        cidVersion: 0,
      },
      pinataMetadata: {
        name: state.myIslands[state.active].name,
        keyvalues: {},
      },
      pinataContent: state.myIslands[state.active],
    });

    const islandPinata = await fetch(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNjc5NzU5MS02OGUxLTQyNzAtYjZhMy01NjBjN2Y3M2IwYTMiLCJlbWFpbCI6ImJhY2tlbmRAYW1icm9zaWEubW9uZXkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDgzZTJkMGQ2Yzg2YTBhNjlkY2YiLCJzY29wZWRLZXlTZWNyZXQiOiJlN2VlMTE4MWM2YTBlN2FmNjQ0YmUzZmEyYmU1ZWY5ZWFmMmNmMmYyYzc0NWQzZGIxNDdiMThhOTU5NWMwZDNlIiwiaWF0IjoxNjYxMTk1NjUxfQ.9Pz2W_h7zCiYyuRuVySKcDwA2fl_Jbm6QDulihAIpmo`,
        },

        body: islandData,
      }
    );

    const addIsland = await state.ipfs.add(
      JSON.stringify(state.myIslands[state.active]).toString()
    );
    const M = addIsland.cid.toString();

    const data = new Object({
      scid: state.scid,
      ringsize: 2,
      transfers: transfers,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'IVU',
        },
        {
          name: 'H',
          datatype: 'S',
          value: state.myIslands[state.active].name,
        },
        {
          name: 'M',
          datatype: 'S',
          value: M,
        },
        {
          name: 'j',
          datatype: 'U',
          value: state.myIslands[state.active].j,
        },
      ],
    });

    sendTransaction(data);
    setEditing('');
  };
  React.useEffect(() => {
    setPost([]);
    getIslands();
  }, [state.myIslands]);

  const postFiltered = post;
  console.log(postFiltered);

  const changeTierToModify = (e) => {
    e.preventDefault();
    setTierToModify(e.target.value);
  };
  const changePostTier = (e) => {
    e.preventDefault();
    setPostTier(e.target.value);
  };
  const changePostToEdit = (e) => {
    e.preventDefault();
    setPostToEdit(e.target.value);
  };

  const changeSignalToClaim = (e) => {
    e.preventDefault();
    setSignalToClaim(e.target.value);
  };
  const changeTreasureToClaim = (e) => {
    e.preventDefault();
    setTreasureToClaim(e.target.value);
  };

  return (
    <div className="function">
      <div className="profile">
        {state.myIslands ? (
          <>
            {state.myIslands.length === 0 ? (
              <>
                <Feed />
                <FutureFeed />
                <NavLink to="/claimIsland">
                  Claim your own Private Island Here
                </NavLink>
              </>
            ) : (
              <div>
                <div className="icons">
                  {editing === 'Image' ? (
                    <>
                      <form onSubmit={SetMetadata}>
                        <input
                          id="edit"
                          defaultValue={state.myIslands[state.active].Image}
                        />

                        <Button size="small" type="submit">
                          Submit
                        </Button>
                      </form>
                      <small onClick={() => setEditing('')}>cancel</small>
                    </>
                  ) : (
                    <>
                      <img src={state.myIslands[state.active].Image} />
                      <small onClick={() => setEditing('Image')}>edit</small>
                    </>
                  )}{' '}
                  <h1
                    onClick={() => {
                      setView('main');
                    }}
                  >
                    {state.myIslands[state.active].Name}
                  </h1>
                </div>

                {view == 'main' ? (
                  <>
                    <>
                      {editing === 'Tagline' ? (
                        <>
                          <form onSubmit={SetMetadata}>
                            <input
                              id="edit"
                              defaultValue={
                                state.myIslands[state.active].Tagline
                              }
                            />
                            <Button size="small" type="submit">
                              Submit
                            </Button>
                          </form>
                          <small onClick={() => setEditing('')}>cancel</small>
                        </>
                      ) : (
                        <>
                          <p>{state.myIslands[state.active].Tagline}</p>
                          <small onClick={() => setEditing('Tagline')}>
                            edit
                          </small>
                        </>
                      )}
                    </>
                    <>
                      {editing === 'Bio' ? (
                        <>
                          <form onSubmit={SetMetadata}>
                            <textarea
                              rows="44"
                              cols="80"
                              id="edit"
                              defaultValue={
                                state.myIslands[state.active].Description
                              }
                            />
                            <Button size="small" type="submit">
                              Submit
                            </Button>
                          </form>
                          <small onClick={() => setEditing('')}>cancel</small>
                        </>
                      ) : (
                        <>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: state.myIslands[state.active].Description,
                            }}
                          />
                          <small onClick={() => setEditing('Bio')}>edit</small>
                        </>
                      )}
                    </>
                  </>
                ) : view == 'treasure' ? (
                  <>
                    <NavLink
                      to={`/burytreasure/${island.SCID}/${
                        island.Bounties && island.Bounties.length
                      }`}
                    >
                      Bury New Treasure
                    </NavLink>
                    {island.Bounties && island.Bounties.length > 0 ? (
                      <>
                        <h3>Bounties You Initiated</h3>
                        <div className="card-grid">
                          {island.Bounties.map((x) => (
                            <TreasureCard
                              className="mytreasure"
                              executerList={x.Execs}
                              name={x.Names && x.Names[x.Names.length - 1]}
                              initiator={x.Initiator}
                              tagline={
                                x.Taglines && x.Taglines[x.Taglines.length - 1]
                              }
                              treasure={x.Amount}
                              image={x.Images && x.Images[x.Images.length - 1]}
                              judgeList={x.Judges}
                              index={x.Index}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <p>No Buried Treasures yet</p>
                    )}
                    {judging.length > 0 ? (
                      <>
                        <h3>Nominated for Judge</h3>
                        <div className="card-grid">
                          {judging.map((x) => (
                            <TreasureCard
                              className="mytreasure"
                              name={x.name}
                              initiator={x.Initiator}
                              tagline={x.tagline}
                              treasure={x.treasure}
                              image={x.image}
                              judgeList={x.judgeList}
                              index={x.index}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      ''
                    )}

                    {island.Judging.length > 0 ? (
                      <>
                        <h3>Other Bounties You're Involved With</h3>
                        <div className="card-grid">
                          {island.Judging.map((x) => (
                            <TreasureCard
                              className="mytreasure"
                              name={x.Names[x.Names.length - 1]}
                              initiator={x.Initiator}
                              tagline={x.Taglines[x.Taglines.length - 1]}
                              treasure={x.Amount}
                              image={x.Images[x.Images.length - 1]}
                              executerList={x.judgeList}
                              index={x.Index}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      ''
                    )}
                  </>
                ) : view == 'signal' ? (
                  <>
                    <NavLink
                      to={`/newsignal/${island.SCID}/${
                        island.Fundraisers ? island.Fundraisers.length : 0
                      }`}
                    >
                      Start New Smoke Signal
                    </NavLink>
                    {island.Fundraisers && island.Fundraisers.length > 0 ? (
                      <>
                        {island.Fundraisers.map((x) => (
                          <NavLink
                            to={`/island/${island.SCID}/smokesignal/${x.Index}`}
                          >
                            <FundCard
                              name={x.Names[x.Names.length - 1]}
                              profile={x.island}
                              tagline={x.Taglines[x.Taglines.length - 1]}
                              goal={x.Goal}
                              image={x.Images[x.Images.length - 1]}
                              deadline={x.Deadline}
                            />
                          </NavLink>
                        ))}
                      </>
                    ) : (
                      <>
                        <p>No Smoke Signals Yet</p>
                      </>
                    )}
                  </>
                ) : view == 'mail-in' ? (
                  <>
                    <Button
                      size="small"
                      handleClick={() => {
                        setView('mail-in');
                      }}
                    >
                      Incoming
                    </Button>
                    <Button
                      size="small"
                      handleClick={() => {
                        setView('mail-out');
                      }}
                    >
                      Outgoing
                    </Button>
                    <Feed />
                  </>
                ) : view == 'mail-out' ? (
                  <>
                    <Button
                      size="small"
                      handleClick={() => {
                        setView('mail-in');
                      }}
                    >
                      Incoming
                    </Button>
                    <Button
                      size="small"
                      handleClick={() => {
                        setView('mail-out');
                      }}
                    >
                      Outgoing
                    </Button>
                    <h3>Your Subscription Tiers</h3>
                    {state.myIslands[state.active].Tiers &&
                      state.myIslands[state.active].Tiers.map((t) => (
                        <p>
                          {t.Names[t.Names.length - 1]}, subs:
                          {t.Subscribers && t.Subscribers.length}
                          <NavLink
                            to={`/island/${
                              state.myIslands[state.active].Name
                            }/modifytier/${t.Index}`}
                          >
                            Edit
                          </NavLink>
                        </p>
                      ))}
                    <NavLink
                      to={`/island/${
                        state.myIslands[state.active].Name
                      }/compose`}
                    >
                      Put a Message in a Bottle
                    </NavLink>
                    <Button
                      size="small"
                      handleClick={() => {
                        setView('compose');
                        setEditing('posts');
                      }}
                    >
                      Compose Message
                    </Button>
                    <NavLink
                      to={`/island/${
                        state.myIslands[state.active].Name
                      }/modifytier/${
                        state.myIslands[state.active].Tiers
                          ? state.myIslands[state.active].Tiers.length
                          : 0
                      }`}
                    >
                      New Subscription Tier
                    </NavLink>
                  </>
                ) : view == 'compose' ? (
                  <>
                    <Button
                      size="small"
                      handleClick={() => {
                        if (state.myIslands[state.active].posts) {
                          console.log(state.myIslands[state.active].posts);
                        }
                      }}
                    >
                      State
                    </Button>
                    <PublishPost editIsland={editIsland} setView={setView} />
                  </>
                ) : view == 'success' ? (
                  <>
                    Success!
                    <Button
                      size="small"
                      handleClick={() => {
                        setView('main');
                      }}
                    >
                      Return
                    </Button>
                  </>
                ) : (
                  ''
                )}

                <div className="icons">
                  <div
                    className="icons-treasure"
                    onClick={() => {
                      setView('treasure');
                    }}
                  >
                    <div className="icons-text">Bounties</div>
                  </div>
                  <div
                    className="icons-signal"
                    onClick={() => {
                      setView('signal');
                    }}
                  >
                    <div className="icons-text">Fundraisers</div>
                  </div>
                  <div
                    className="icons-mail"
                    onClick={() => {
                      setView('mail-in');
                    }}
                  >
                    <div className="icons-text">Subscriptions</div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </div>
  );
}
