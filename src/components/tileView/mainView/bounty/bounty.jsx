import React, { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LoginContext } from '@/LoginContext.jsx';
import RT from '@/components/RT.jsx';
import Executer from '@/components/Executer.jsx';
import N from '@/components/N.jsx';
import Judge from '@/components/Judge.jsx';
import { useSendTransaction } from '@/components/hooks/useSendTransaction';
import { useGetRandomAddress } from '@/components/hooks/useGetRandomAddress.jsx';
import { useGetAddress } from '@/components/hooks/useGetAddress.jsx';
import GI from '@/components/getIslands';
import { SupportBountyByERC20 } from '@/components/supportBountyByErc20';
import { useNameLookup } from '@/components/hooks/useNameLookup';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { Button } from '@/components/common/Button.jsx';
import { Divider } from '@/components/common/Divider.jsx';
import { useTheme } from '@/components/hooks/useTheme.js';
import { TileContext } from '@/components/providers/TileContext.jsx';
import { Helpers } from '@/utils/helpers.js';
import dateString from '/src/utils/dateString';
import { AddTreasure } from '@/components/tileView/mainView/bounty/addTreasure.jsx';
import { ClaimTreasure } from '@/components/tileView/mainView/bounty/claimTreasure.jsx';
import { EditBounty } from '@/components/tileView/mainView/bounty/editBounty.jsx';
import { ImageHeader } from '@/components/tileView/common/imageHeader.jsx';
import { InitiatedBy } from '@/components/tileView/common/InitiatedBy.jsx';
import { DisplayDateBox } from '@/components/tileView/common/DisplayDateBox.jsx';
import { BountyRoles } from '@/components/tileView/common/bounty/bountyRoles.jsx';
import { useGetFunds } from '@/components/hooks/usetGetFunds.jsx';
import { StickyActionsBar } from '@/components/tileView/mainView/bounty/StickyActionsBar.jsx';
import { ActionButtons } from '@/components/tileView/common/bounty/actionButtons.jsx';

/*
  TODO
    - Set up dev env and create a bounty using existing code
    - move functions to file similar to fundraiserActions & test
    - Delete editing code (can view later in ../bounty.jsx -- delete this after I'm done here
    - Map status to reds files - Status -- 0,2 -- where is 1??
    - Got 4 views (files from red) - user (status 0), updated (my bounty??), judge, executor ??
    - plug in reds jsx for status 0 and get that working first
 */

export const Bounty = ({ bountyData }) => {
  const { proseClass } = useTheme();
  const [state, setState] = useContext(LoginContext);
  const { gotoIslandTile } = useContext(TileContext);
  // const [treasure, setTreasure] = useState({});
  const island = bountyData.Initiator.SCID;
  const index = bountyData.Index;
  const { treasure, islandSCID, recipients } = useGetFunds(island, index);
  const [judging, setJudging] = useState(false);
  const [executing, setExecuting] = useState(false);
  // const [islandSCID, setIslandSCID] = useState('');
  // const [recipients, setRecipients] = useState([]);
  const [editing, setEditing] = useState(false);

  const toggleEdit = () => {
    setEditing((prevEditing) => !prevEditing);
  };

  const getJudging = () => {
    console.log('GET JUDGING - state', state);
    if (!state.myIslands || !treasure.Judges || state.myIslands.length === 0)
      return;
    const matching = treasure.Judges.filter((execObj) =>
      state.myIslands.map((x) => x.SCID).includes(execObj.SCID)
    );

    if (matching.length > 0) setJudging(true);
    else setJudging(false);
  };

  const getExecuting = () => {
    console.log('GET EXEC', state, treasure);
    if (!state.myIslands || !treasure.Execs || state.myIslands.length === 0)
      return;
    const matching = treasure.Execs.filter((execObj) =>
      state.myIslands.map((x) => x.SCID).includes(execObj.SCID)
    );

    if (matching.length > 0) setExecuting(true);
    else setExecuting(false);
  };

  useEffect(() => {
    getJudging();
    getExecuting();
  }, [state.myIslands, treasure, state.active]);

  // const getFunds = useCallback(async () => {
  //   let profile = await GI(island);
  //   console.log('PROFILE', profile.Bounties);
  //   setTreasure(profile.Bounties[index]);
  //   setIslandSCID(profile.SCID);
  //   if (
  //     profile.Bounties[index].RecipientList &&
  //     profile.Bounties[index].RecipientList.length > 0
  //   ) {
  //     let rawList = profile.Bounties[index].RecipientList;
  //     var totalWeight = 0;
  //     for (let i = 0; i < rawList.length; i++) {
  //       totalWeight += rawList[i].Weight;
  //     }
  //
  //     let formattedList = rawList.map((x) => (
  //       <li>{`${x.Address}: ${(100 * x.Weight) / totalWeight}%`}</li>
  //     ));
  //     console.log('formatted List', formattedList);
  //     setRecipients(formattedList);
  //   }
  // });

  // useEffect(() => {
  //   console.log('BOUNTY - GETTING FUNDS -- state', state);
  //   getFunds();
  // }, [state.ipfs]);

  console.log('STATE', state);

  return (
    <div className="mx-auto grid w-full grid-cols-1 content-start">
      <div>
        {bountyData && editing ? (
          <EditBounty />
        ) : (
          <>
            <ImageHeader
              assetData={bountyData}
              editing={editing}
              setEditing={setEditing}
            />
            <div className="clear-both h-10"></div>
            <div className="relative w-full px-4 md:px-6">
              <div className="fund_title space-y-3 leading-8">
                <h1 className="text-3xl leading-8">
                  {Helpers.getTileName(bountyData)}
                </h1>
                <div className="tagline text-xl leading-6">
                  {Helpers.getTileTagline(bountyData)}
                </div>
                <InitiatedBy tile={bountyData} />
                <h3 className="font-bold">
                  Treasure: {treasure.Amount / 100000} Dero
                </h3>
                <DisplayDateBox
                  date={bountyData.Expiry}
                  message="If the treasure isn't released before this date, contributors can return to this page to receive a 95% refund."
                />
                <div className="clear-both h-6"></div>
                <div className="fund_description relative mx-auto grid w-full grid-cols-1 content-start space-y-6 leading-6">
                  <h2 className="pt-2 text-3xl sm:text-4xl">
                    Bounty Description
                  </h2>
                  <p>{Helpers.getTileDescription(bountyData)}</p>
                </div>
                <div className="clear-both h-6"></div>
                <BountyRoles
                  tile={bountyData}
                  treasure={treasure}
                  recipients={recipients}
                />
                <div className="clear-both h-4"></div>
              </div>
            </div>
          </>
        )}
        {/*
        TODO left off here
           RT is good to go
           Clean up this logic & styling
           Deal with Recipient List styling
           Ask Apollo about the state.myislands stuff -- still valid?
           Do Add Treasure
           Do Claim Treasuer
           Do side bar card
           Do Edit Bountry
        */}
        {!editing && treasure.Name ? (
          <>
            <div className="card-body break-words font-fell">
              <FlexBoxRow align="start" className="">
                <FlexBoxColumn className="" align="start">
                  {treasure.Status === 2 && (
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
                  )}
                  {treasure.RecipientList &&
                  treasure.RecipientList.length > 0 ? (
                    <>
                      These addresses have been nominated to receive the
                      treasure:
                      <ul>{recipients}</ul>
                    </>
                  ) : (
                    ''
                  )}
                  <span className="divider" />
                  TSTATUS = {treasure.Status}
                  {state.myIslands ? state.myIslands.length : 'no isles'}
                  {treasure.Status === 0 &&
                    state.myIslands &&
                    state.myIslands.length > 0 &&
                    state.myIslands.map((x) => x.SCID).includes(island) && (
                      <div className="">
                        <h3>Initiator Functions</h3>
                        <p>
                          You initiated this bounty. You may nominate backup
                          judges and executers.
                        </p>
                        <N
                          island={island}
                          index={index}
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
                          scid_registry={state.scid_registry}
                          scid_bounties={state.scid_bounties}
                        />
                      </div>
                    )}
                  {treasure.Status === 0 &&
                    state.myIslands &&
                    state.myIslands.length > 0 &&
                    judging && (
                      <Judge
                        JN={treasure.JN}
                        judges={treasure.Judges}
                        userIslands={state.myIslands.map((x) => x.SCID)}
                        island={islandSCID}
                        index={index}
                        judge={treasure.Judge && treasure.Judge.SCID}
                        JF={treasure.JF}
                        deroBridgeApiRef={state.deroBridgeApiRef}
                        scid={state.scid_bounties}
                        XE={treasure.JE}
                        solo={treasure.Judges.length === 1}
                        recipientList={treasure.RecipientList}
                      />
                    )}
                  {treasure.Status === 0 &&
                  state.myIslands &&
                  state.myIslands.length > 0 &&
                  executing ? (
                    <Executer
                      XN={treasure.XN}
                      userIslands={state.myIslands.map((x) => x.SCID)}
                      island={islandSCID}
                      index={index}
                      execs={treasure.Execs}
                      executer={treasure.Executer && treasure.Executer.SCID}
                      JF={treasure.JF}
                      deroBridgeApiRef={state.deroBridgeApiRef}
                      scid={state.scid_bounties}
                      XE={treasure.XE}
                      solo={treasure.Execs.length == 1}
                    />
                  ) : (
                    ''
                  )}
                  {treasure.Status === 0 && (
                    <>
                      <AddTreasure />
                      {/*<ClaimTreasure tile={bountyData} />*/}
                    </>
                  )}
                </FlexBoxColumn>
              </FlexBoxRow>

              <ActionButtons tile={bountyData} />
            </div>
            <StickyActionsBar tile={bountyData} />
          </>
        ) : (
          <p>Loading...</p>
        )}
        <SupportBountyByERC20 H={island} i={index} />
      </div>
    </div>
  );
};
