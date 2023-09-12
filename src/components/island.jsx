import React from 'react';
import { useParams } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import { useSearchParams, NavLink } from 'react-router-dom';
import TreasureCard from './treasureCard';
import Subscribe from './subscribe';
import TrustIsland from './trustIsland';
import getMIB from './getMIB';
import GI from './getIslands';
import getBounties from './getBounties';
import getFundraisers from './getFundraisers';
import { FeatureNav } from '@/components/common/FeatureNav.jsx';
import { HeroCard } from '@/components/common/HeroCard.jsx';
import { SummaryCard } from '@/components/smokeSignal/SummaryCard.jsx';
import { useTheme } from '@/components/hooks/useTheme.js';

export default function Island() {
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
  const [judging, setJudging] = React.useState([]);
  const [signals, setSignals] = React.useState([]);
  const [bottles, setBottles] = React.useState([]);
  const [view, setView] = React.useState('main');
  const params = useParams();
  const [island, setIsland] = React.useState(null);
  const { proseClass } = useTheme();

  const getIslands = React.useCallback(async () => {
    console.log('client get island ', params.island);
    setIsland(await GI(state, params.island));
  });

  const getIslandObjects = React.useCallback(async () => {
    setTreasures([]);
    setSignals([]);
    setJudging([]);
    setBottles([]);

    var treasureSearch = new RegExp(`${params.island}[0-9]*_bm`);
    var signalSearch = new RegExp(`${params.island}[0-9]*_sm`);
    var judgeSearch = /.*_J\d{1,}/;
    var bottleSearch = new RegExp(params.island + `\\d*_Av`);
    var trustSearch = new RegExp(`\\${params.island}\_T`);

    setBottles(await getMIB(postFiltered[0], -1, state));
    setTreasures(await getBounties(state, params.island));
    setSignals(await getFundraisers(state, params.island));
  });

  React.useEffect(() => {
    // getIslandObjects()
  }, [post, searchParams, state.ipfs]);

  React.useEffect(() => {
    setPost([]);
    getIslands();
  }, [state.myIslands]);

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
    <div className="flex-center flex flex-col">
      {island ? (
        <>
          <HeroCard
            title={island.Name}
            image={island.Image}
            searchParam={{ filter: 'main' }}
          >
            <div>
              {searchParams.get('filter') === 'main' ? (
                <div className={proseClass}>
                  <h2>{island.Tagline}</h2>
                  <h3>Social Coconut Score: {island.score}</h3>
                  <p dangerouslySetInnerHTML={{ __html: island.Description }} />
                </div>
              ) : searchParams.get('filter') === 'treasure' ? (
                <>
                  {island.Bounties && island.Bounties.length > 0 ? (
                    <>
                      {island.Bounties.map((x) => (
                        <TreasureCard
                          className="overflow-x-auto"
                          name={x.Names[x.Names.length - 1]}
                          profile={island.Name}
                          tagline={x.Taglines[x.Taglines.length - 1]}
                          treasure={x.Amount}
                          image={x.Images[x.Images.length - 1]}
                          judgeList={x.Judges}
                          index={x.Index}
                          initiator={x.Initiator}
                        />
                      ))}
                    </>
                  ) : (
                    <p>No Buried Treasures yet</p>
                  )}
                  {judging.length > 0 ? (
                    <>
                      {judging.map((x) => (
                        <TreasureCard
                          className="overflow-x-auto"
                          name={x.name}
                          profile={x.island}
                          tagline={x.tagline}
                          treasure={x.treasure}
                          image={x.image}
                          judgeList={x.judgeList}
                          index={x.index}
                        />
                      ))}
                    </>
                  ) : (
                    <p>No Judging any treasure</p>
                  )}
                </>
              ) : searchParams.get('filter') === 'smokesignals' ? (
                <>
                  {island.Fundraisers && island.Fundraisers.length > 0 ? (
                    <>
                      {island.Fundraisers.map((x) => (
                        <SummaryCard
                          index={x.Index}
                          name={x.Names[x.Names.length - 1]}
                          initiator={x.Initiator}
                          tagline={x.Taglines[x.Taglines.length - 1]}
                          goal={x.Goal}
                          raised={x.Raised}
                          image={x.Images[x.Images.length - 1]}
                          deadline={x.Deadline}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      <p>No Smoke Signals Yet</p>
                    </>
                  )}
                </>
              ) : searchParams.get('filter') === 'mib' ? (
                <>
                  {island.Tiers &&
                    island.Tiers.map((key) => (
                      <Subscribe
                        profile={island.SCID}
                        name={key.Names[key.Names.length - 1]}
                        image={key.Images[key.Images.length - 1]}
                        index={key.Index}
                        tagline={key.Taglines[key.Taglines.length - 1]}
                        description={
                          key.Descriptions[key.Descriptions.length - 1]
                        }
                        amount={key.Amount}
                        interval={key.Interval}
                        userAddress={
                          state.walletList[state.activeWallet].address
                        }
                        dba={state.deroBridgeApiRef}
                        scid={state.scid_subscriptions}
                        randomAddress={state.randomAddress}
                        available={key.Available}
                      />
                    ))}
                </>
              ) : (
                ''
              )}
            </div>
          </HeroCard>
          <div className="bg-secondary pb-2">
            <FeatureNav setSearchParams={setSearchParams} />
          </div>
        </>
      ) : (
        ''
      )}
      {island && state.myIslands && state.myIslands.length > 0 ? (
        <TrustIsland island={island.scid} />
      ) : (
        ''
      )}
    </div>
  );
}
