import { DERO_DENOMINATOR } from '@/utils/helpers.js';
import { NavLink } from 'react-router-dom';

export const SummaryCard = (props) => {
  const { index, image, goal, deadline, profile, name, tagline } = props;
  const deadlineDate = new Date(deadline * 1000);
  const deadlineString =
    (deadlineDate.getMonth() + 1).toString() +
    '/' +
    deadlineDate.getDate().toString();

  console.log('PROPS =', props);

  return (
    <div className="card card-side my-3 bg-info shadow-xl" key={name}>
      <figure className="max-w-[500px]">
        <img src={image} alt="Private Islands Treasure" />
      </figure>
      <div className="card-body text-neutral">
        <h2 className="card-title">{name}</h2>
        <p>Initiated by {profile}</p>
        <p>{tagline}</p>
        <p>
          <strong>Goal:</strong>&nbsp;
          {goal / DERO_DENOMINATOR} Dero by {deadlineString}{' '}
        </p>
        <div className="card-actions justify-end">
          <NavLink to={`/island/${profile}/smokesignal/${index}`}>
            <button className="btn-secondary btn text-neutral hover:text-info">
              Learn More
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
