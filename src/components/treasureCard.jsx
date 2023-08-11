import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../LoginContext';
import { SummaryCard } from '@/components/bounties/SummaryCard.jsx';

export default function TreasureCard(props) {
  const [state, setState] = useContext(LoginContext);
  const [judging, setJudging] = useState([]);
  const [executing, setExecuting] = useState(false);

  const getJudging = () => {
    if (!state.myIslands || !props.judgeList) return;

    for (var i = 0; i < state.myIslands.length; i++) {
      if (props.judgeList.includes(state.myIslands[i].name))
        setJudging((judging) => [...judging, state.myIslands[i]]);
    }
  };

  const getExecuting = () => {
    console.log('myslands', state);
    if (!state.myIslands || !props.executerList) return;

    if (props.executerList.includes(state.myIslands[state.active].name))
      setExecuting(true);
    else setExecuting(false);
  };

  useEffect(() => {
    getJudging();
    getExecuting();
  }, [state.myIslands]);

  return (
    <SummaryCard props={{ ...props, judging, executing }} key={props.name} />
  );
}
