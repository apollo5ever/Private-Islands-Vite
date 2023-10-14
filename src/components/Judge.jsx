import React from 'react';
import ATR from './ATR';
import AN from './AN';

export default function Judge(props) {
  const [expiry, setExpiry] = React.useState(0);
  const [active, setActive] = React.useState('');

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

  return (
    <div className="subscribe">
      <h3>Judge Functions</h3>
      <p>You have been nominated as judge for this bounty.</p>

      {props.solo ? (
        <>
          {' '}
          {props.judge != props.userIsland ? (
            <>
              <AN
                dba={props.deroBridgeApiRef}
                randomAddress={props.randomAddress}
                scid={props.scid}
                l="J"
                JX={props.userIsland}
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
                    judge={props.userIsland}
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
          {active == props.userIsland ? (
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
                    JX={props.userIsland}
                    island={props.island}
                    index={props.index}
                  />
                  <ATR
                    dba={props.deroBridgeApiRef}
                    judge={props.userIsland}
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
