import { NavLink } from 'react-router-dom';
import AN from '@/components/AN.jsx';
import { useContext } from 'react';
import { LoginContext } from '@/LoginContext.jsx';
import { DERO_DENOMINATOR } from '@/utils/helpers.js';

export const SummaryCard = (props) => {
  const [state, setState] = useContext(LoginContext);
  const {
    JN,
    judgeList,
    image,
    index,
    treasure,
    profile,
    name,
    tagline,
    judging,
    executing,
  } = props.props;

  return (
    <div className="card card-side bg-info shadow-xl">
      <figure className="object-fit">
        <img src={image} alt="Private Islands Treasure" />
      </figure>
      <div className="card-body text-neutral">
        <h2 className="card-title">{name}</h2>
        <p>Initiated by {profile}</p>
        <p>{tagline}</p>
        <p>
          <strong>Treasure:</strong> {treasure / DERO_DENOMINATOR} Dero
        </p>
        <p>
          <strong>Judges:</strong> &nbsp;
          {judgeList ? judgeList.map((x) => <>{x.name}, </>) : ''}
        </p>
        <p>
          {judging && judging.length > 0 ? (
            <AN
              dba={state.deroBridgeApiRef}
              scid={state.scid}
              l="J"
              JX={judging[0].name}
              island={profile}
              index={index}
            />
          ) : (
            ''
          )}
        </p>
        <p>
          {executing ? (
            <AN
              dba={state.deroBridgeApiRef}
              scid={state.scid}
              l="X"
              JX={state.myIslands[state.active].name}
              island={profile}
              index={index}
            />
          ) : (
            ''
          )}
        </p>
        <div className="card-actions justify-end">
          <NavLink to={`/island/${profile}/treasure/${index}`}>
            <button className="btn-secondary btn text-neutral hover:text-info">
              Learn More
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
