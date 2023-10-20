import React from 'react';
import RT from './RT';
import AN from './AN';
import V from './V';

export default function Executer(props) {
  const [expiry, setExpiry] = React.useState(0);
  const [active, setActive] = React.useState('');
  const [userIsland, setUserIsland] = React.useState('');

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

  const getUserIsland = () => {
    if (props.userIslands.includes(active)) {
      setUserIsland(active);
    } else if (props.userIslands.includes(props.executer)) {
      setUserIsland(props.executer);
    } else {
      let array1 = props.userIslands;
      let array2 = props.execs.map((x) => x.SCID);
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
    getUserIsland();
  }, []);

  return (
    <div className="subscribe">
      <div className="mt-3 text-xl font-bold">Executer Functions</div>
      <p>You have been nominated as executer for this bounty.</p>

      {props.solo ? (
        <>
          {' '}
          {props.executer != userIsland ? (
            <>
              <AN
                dba={props.deroBridgeApiRef}
                randomAddress={props.randomAddress}
                scid={props.scid}
                l="X"
                JX={userIsland}
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
                    executer={userIsland}
                    scid={props.scid}
                    island={props.island}
                    index={props.index}
                  />
                  <V
                    dba={props.deroBridgeApiRef}
                    randomAddress={props.randomAddress}
                    scid={props.scid}
                    island={props.island}
                    index={props.index}
                    executer={userIsland}
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
          {active == userIsland ? (
            <>
              {props.JF == 1 ? (
                <>
                  <AN
                    dba={props.deroBridgeApiRef}
                    randomAddress={props.randomAddress}
                    scid={props.scid}
                    l="X"
                    JX={userIsland}
                    island={props.island}
                    index={props.index}
                  />
                  <RT
                    dba={props.deroBridgeApiRef}
                    randomAddress={props.randomAddress}
                    scid={props.scid}
                    island={props.island}
                    index={props.index}
                    executer={userIsland}
                  />
                  <V
                    dba={props.deroBridgeApiRef}
                    randomAddress={props.randomAddress}
                    scid={props.scid}
                    island={props.island}
                    index={props.index}
                    executer={userIsland}
                  />
                </>
              ) : (
                <>
                  <AN
                    dba={props.deroBridgeApiRef}
                    randomAddress={props.randomAddress}
                    scid={props.scid}
                    l="X"
                    JX={userIsland}
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
