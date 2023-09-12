import { DERO_DENOMINATOR, Helpers } from '@/utils/helpers.js';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@/components/hooks/useTheme.js';
import { useContext } from 'react';
import { TileContext } from '@/components/providers/TileContext.jsx';

// TODO MST -- Replace NavLink -- It goes to old Fundraiser component - I need to take this and make it a FundraiserSummary card
//          for view in side bar when more than 1 so ppl can see a summary and click to set that tile
//          -- what we should display here is where that navlink currently goes, which is the old fundraiser component
export const Fundraiser = ({ fundData }) => {
  const { proseClass } = useTheme();
  const { gotoIslandTile } = useContext(TileContext);
  console.log('FUNDDATA', fundData);

  return (
    <div
      className="card card-side my-3 bg-secondary shadow-xl"
      key={Helpers.getTileName(fundData)}
    >
      <div className={`${proseClass} card-body`}>
        <figure className="max-w-[500px]">
          <img
            src={Helpers.getTileImage(fundData)}
            alt="Private Islands Treasure"
            className="rounded-lg"
          />
        </figure>
        <div className="card-body text-neutral">
          <h2 className="card-title">{Helpers.getTileName(fundData)}</h2>
          <h4
            className="cursor-pointer font-bold"
            onClick={() => gotoIslandTile(Helpers.getInitiatorScid(fundData))}
          >
            Initiated by {Helpers.getInitiatorName(fundData)}
          </h4>
          <p>{Helpers.getTileTagline(fundData)}</p>
          <p>
            <strong>Goal:</strong>&nbsp;
            {fundData.Goal / DERO_DENOMINATOR} Dero by {fundData.Deadline}
          </p>
          <div className="card-actions justify-end">
            <NavLink
              to={`/island/${Helpers.getInitiatorScid(fundData)}/smokesignal/${
                fundData.Index
              }`}
            >
              <button className="btn-secondary btn text-neutral hover:text-info">
                Learn More
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
