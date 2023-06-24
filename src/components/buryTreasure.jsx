import React from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {LoginContext} from "../LoginContext";
import Success from "./success.jsx";
import hex2a from "./hex2a.js";
import {useSendTransaction} from "../useSendTransaction";
import {useGetSC} from "../useGetSC";
import {Button} from '@/components/common/Button.jsx';

export default function BuryTreasure() {
  const [state, setState] = React.useContext(LoginContext);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const island = params.island;
  const index = params.index;
  const [judges, setJudges] = React.useState([]);
  const [execs, setExecs] = React.useState([]);
  const [error, setError] = React.useState("");
  const [sendTransaction] = useSendTransaction();
  const [getSC] = useGetSC();

  const getJudges = React.useCallback(async () => {
    const res = await getSC(state.scid_registry);
    console.log("get judges res", res);
    var search = new RegExp(`N::PRIVATE-ISLANDS::*`);
    var scData = res.stringkeys; //.map(x=>x.match(search))

    const judgeList = Object.keys(scData)
      .filter((key) => search.test(key))
      .map((key) => (
        <option value={key.substring(20)}>{hex2a(scData[key])}</option>
      ));

    setJudges(judgeList);
  });

  React.useEffect(() => {
    getJudges();
  }, [state]);

  const updateMetaData = React.useCallback(async (event) => {
    event.preventDefault();
    let fee;
    if (event.target.bio.description.length > 380) fee = 10000;
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

    const txData = new Object({
      scid: state.scid_bounties,
      ringsize: 2,
      fees: fee,
      transfers: transfers,
      sc_rpc: [
        {
          name: "entrypoint",
          datatype: "S",
          value: "SetMetadata",
        },

        {
          name: "H",
          datatype: "S",
          value: island,
        },
        {
          name: "i",
          datatype: "U",
          value: parseInt(index),
        },
        {
          name: "Name",
          datatype: "S",
          value: event.target.bountyName.value,
        },
        {
          name: "Image",
          datatype: "S",
          value: event.target.bountyPhoto.value,
        },
        {
          name: "Tagline",
          datatype: "S",
          value: event.target.tagline.value,
        },

        {
          name: "Description",
          datatype: "S",
          value: event.target.description.value,
        },
      ],
    });
    sendTransaction(txData);

    setSearchParams({status: "success"});
  });

  const DoIt = React.useCallback(async (event) => {
    event.preventDefault();
    if (!event.target.bountyName.value) {
      setError("Bounty name is required.");
      return;
    }
    if (!event.target.expiry.value) {
      setError("Expiry is required.");
      return;
    }

    const res0 = await getSC(state.scid_registry);
    var executer = event.target.executer.value;

    if (executer === "self") executer = event.target.island.value;

    var judge = event.target.judge.value;
    if (judge === "self") judge = event.target.island.value;

    var burn = 100;

    var expiry =
      new Date(event.target.expiry.value).getTime() / 1000 +
      new Date().getTimezoneOffset() * 60;
    if (expiry < new Date().getTime() / 1000) {
      setError("Expiry must be future date");
      return;
    }

    var obj = {
      name: event.target.bountyName.value,
      expiry: expiry,
      tagline: event.target.tagline.value,
      index: index,
      description: event.target.description.value,
      image: event.target.bountyPhoto.value,
      island: island,
    };

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

    const txData = new Object({
      scid: state.scid_bounties,
      ringsize: 2,
      transfers: transfers,
      sc_rpc: [
        {
          name: "entrypoint",
          datatype: "S",
          value: "BT",
        },

        {
          name: "H",
          datatype: "S",
          value: island,
        },
        {
          name: "i",
          datatype: "U",
          value: parseInt(index),
        },
        {
          name: "J",
          datatype: "S",
          value: event.target.judge.value,
        },
        {
          name: "X",
          datatype: "S",
          value: event.target.executer.value,
        },
        {
          name: "E",
          datatype: "U",
          value: expiry,
        },

        {
          name: "name",
          datatype: "S",
          value: event.target.bountyName.value,
        },
      ],
    });
    sendTransaction(txData);

    setSearchParams({
      status: "metadata",
      name: event.target.bountyName.value,
    });
  });

  return (
    <div className="function">
      {searchParams.get("status") == "metadata" ? (
        <div className="profile">
          <h3>Bury Treasure</h3>
          <p>
            When you bury treasure on your private island, you are creating a
            bounty for some specific goal. Specify the criteria for release of
            treasure, and appoint a judge (it can be you) to decide when that
            criteria has been met.
          </p>

          <form onSubmit={updateMetaData}>
            <input
              placeholder="Buried Treasure Name"
              id="bountyName"
              defaultValue={searchParams.get("name")}
            />
            <input placeholder="Image URL" id="bountyPhoto" />
            <input placeholder="Tagline" id="tagline" />
            <p>
              Expiry (if the task isn't complete before this date, supporters
              can retrieve their funds)
            </p>
            <input type="date" id="expiry" name="expiry"></input>

            <textarea
              placeholder="Description"
              rows="44"
              cols="80"
              id="description"
            />
            <input
              placeholder="Initial Treasure (Dero Amount)"
              id="treasure"
              type="text"
            />
            <p>
              Nominate a Judge. This person sorts through treasure claims and
              chooses who is entitled to the funds. The judge is paid 10% of the
              treasure for this work. Backup judges can be nominated later.
            </p>
            <select id="judge">{judges}</select>
            <p>
              Nominate an Executer. This person releases the treasure according
              to the judge's judgement, or he may veto the decision if he
              believes it to be in error. He is not paid. Backup executers can
              be nominated later.
            </p>
            <select id="executer">{judges}</select>

            <Button size="small" type={"submit"}>
              Create
            </Button>
          </form>
          {error}
        </div>
      ) : searchParams.get("status") == "success" ? (
        <Success />
      ) : (
        <div className="profile">
          <h3>Bury Treasure</h3>
          <p>
            When you bury treasure on your private island, you are creating a
            bounty for some specific goal. Specify the criteria for release of
            treasure, and appoint a judge (it can be you) to decide when that
            criteria has been met.
          </p>

          <form onSubmit={DoIt}>
            <input placeholder="Buried Treasure Name" id="bountyName" />
            <input placeholder="Image URL" id="bountyPhoto" />
            <input placeholder="Tagline" id="tagline" />
            <p>
              Expiry (if the task isn't complete before this date, supporters
              can retrieve their funds)
            </p>
            <input type="date" id="expiry" name="expiry"></input>

            <textarea
              placeholder="Description"
              rows="44"
              cols="80"
              id="description"
            />
            <input
              placeholder="Initial Treasure (Dero Amount)"
              id="treasure"
              type="text"
            />
            <p>
              Nominate a Judge. This person sorts through treasure claims and
              chooses who is entitled to the funds. The judge is paid 10% of the
              treasure for this work. Backup judges can be nominated later.
            </p>
            <select id="judge">{judges}</select>
            <p>
              Nominate an Executer. This person releases the treasure according
              to the judge's judgement, or he may veto the decision if he
              believes it to be in error. He is not paid. Backup executers can
              be nominated later.
            </p>
            <select id="executer">{judges}</select>

            <Button size="small" type={"submit"}>
              Create
            </Button>
          </form>
          {error}
        </div>
      )}
    </div>
  );
}
