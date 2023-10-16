import React from 'react';
import RT from './RT';
import AN from './AN';
import V from './V';

export default function Executer(props) {
  const [expiry, setExpiry] = React.useState(0);
  const [active, setActive] = React.useState('');

  const getExpiry = () => {
    if (props.XE > new Date().getTime() / 1000) setExpiry(props.XE);
    else {
      setExpiry(
        Math.round(
          1209600 - ((new Date().getTime() / 1000 - props.XE) % 1209600)
        )
      );
    }
  };

  const getActiveExec = () => {
    for (var j of props.execs) {
      if (j.Index == props.XN) {
        setActive(j.SCID);
      }
    }
  };

  React.useEffect(() => {
    getExpiry();
    getActiveExec();
  }, []);

  return (
    <div className="subscribe">
      <h3>Executer Functions</h3>
      <p>You have been nominated as executer for this bounty.</p>

      {props.solo ? (
        <>
          {' '}
          {props.executer != props.userIsland ? (
            <>
              <AN
                dba={props.deroBridgeApiRef}
                randomAddress={props.randomAddress}
                scid={props.scid}
                l="X"
                JX={props.userIsland}
                island={props.island}
                index={props.index}
              />
            </>
          ) : (
            <>
              {props.JF == 1 ? (
                <>
                  {' '}
                  <RT
                    dba={props.deroBridgeApiRef}
                    randomAddress={props.randomAddress}
                    executer={props.userIsland}
                    scid={props.scid}
                    island={props.island}
                    index={props.index}
                  />
                  <V
                    dba={props.deroBridgeApiRef}
                    scid={props.scid}
                    island={props.island}
                    index={props.index}
                  />
                </>
              ) : (
                <>
                  <p>Nothing to do.</p>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {active == props.userIsland ? (
            <>
              {props.JF == 1 ? (
                <>
                  <AN
                    dba={props.deroBridgeApiRef}
                    randomAddress={props.randomAddress}
                    scid={props.scid}
                    l="X"
                    JX={props.userIsland}
                    island={props.island}
                    index={props.index}
                  />
                  <RT
                    dba={props.deroBridgeApiRef}
                    scid={props.scid}
                    island={props.island}
                    index={props.index}
                    executer={props.userIsland}
                  />
                  <V
                    dba={props.deroBridgeApiRef}
                    randomAddress={props.randomAddress}
                    scid={props.scid}
                    island={props.island}
                    index={props.index}
                    executer={props.userIsland}
                  />
                </>
              ) : (
                <>
                  <AN
                    dba={props.deroBridgeApiRef}
                    randomAddress={props.randomAddress}
                    scid={props.scid}
                    l="X"
                    JX={props.userIsland}
                    island={props.island}
                    index={props.index}
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
