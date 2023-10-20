import React from 'react';
import ATR from './ATR';
import AN from './AN';

export default function Judge(props) {
  const [expiry, setExpiry] = React.useState(0);
  const [active, setActive] = React.useState('');
  const [userIsland, setUserIsland] = React.useState('');

  const getExpiry = () => {
    if (props.JE > new Date().getTime() / 1000) setExpiry(props.JE);
    else {
      setExpiry(
        Math.round(
          1209600 - ((new Date().getTime() / 1000 - props.JE) % 1209600)
        )
      );
    }
  };
  const getUserIsland = () => {
    if (props.userIslands.includes(active)) {
      setUserIsland(active);
    } else if (props.userIslands.includes(props.judge)) {
      setUserIsland(props.judge);
    } else {
      let array1 = props.userIslands;
      let array2 = props.judges.map((x) => x.SCID);
      for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
          if (array1[i] === array2[j]) {
            setUserIsland(array1[i]);
            return;
          }
        }
      }
    }
  };

  const getActiveJudge = () => {
    for (var j of props.judges) {
      if (j.Index == props.JN) {
        setActive(j.SCID);
      }
    }
  };

  React.useEffect(() => {
    getExpiry();
    getActiveJudge();
  }, []);

  React.useEffect(() => {
    getUserIsland();
  }, [active]);

  return (
    <div className="subscribe">
      <div className="mt-3 text-xl font-bold">Judge Functions</div>
      <p>You have been nominated as judge for this bounty.</p>

      {props.solo ? (
        <>
          {' '}
          {props.judge != userIsland ? (
            <>
              <AN
                dba={props.deroBridgeApiRef}
                randomAddress={props.randomAddress}
                scid={props.scid}
                l="J"
                JX={userIsland}
                island={props.island}
                index={props.index}
              />
            </>
          ) : (
            <>
              {props.JF == 1 || props.JF == 2 ? (
                <>
                  <p>Nothing to do.</p>{' '}
                </>
              ) : (
                <>
                  <ATR
                    dba={props.deroBridgeApiRef}
                    judge={userIsland}
                    randomAddress={props.randomAddress}
                    scid={props.scid}
                    island={props.island}
                    index={props.index}
                    recipientList={props.recipientList}
                  />
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {active == userIsland ? (
            <>
              {props.JF == 1 || props.JF == 2 ? (
                <>
                  <p>Nothing to do</p>
                </>
              ) : (
                <>
                  <AN
                    dba={props.deroBridgeApiRef}
                    randomAddress={props.randomAddress}
                    scid={props.scid}
                    l="J"
                    JX={userIsland}
                    island={props.island}
                    index={props.index}
                  />
                  <ATR
                    dba={props.deroBridgeApiRef}
                    judge={userIsland}
                    scid={props.scid}
                    island={props.island}
                    index={props.index}
                    recipientList={props.recipientList}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <p>Nothing to do</p>
            </>
          )}
        </>
      )}
    </div>
  );
}
