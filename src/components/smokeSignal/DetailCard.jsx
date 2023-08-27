import React from 'react';
import { TruncatedText } from '@/components/common/TruncatedText.jsx';
import { NavLink } from 'react-router-dom';

export const DetailCard = ({ signal, deadline }) => {
  return (
    <div className="card card-side my-3 flex-col whitespace-normal bg-info shadow-xl md:flex-row">
      <figure className="min-w-[400px] max-w-[700px] md:pl-3">
        <img
          src={signal.Images && signal.Images[signal.Images.length - 1]}
          className="rounded-2xl"
          alt={signal.Names && signal.Names[signal.Names.length - 1]}
        />
      </figure>
      <div className="card-body break-words text-neutral">
        <h2 className="card-title">
          {signal.Names && signal.Names[signal.Names.length - 1]}
        </h2>
        <h4>
          {signal.Taglines && signal.Taglines[signal.Taglines.length - 1]}
        </h4>
        <h4>
          <strong>Initiated by: </strong>{' '}
          <NavLink to={`/island/${signal.Initator && signal.Initiator.SCID}`}>
            {signal.Initiator && signal.Initiator.Name}
          </NavLink>
        </h4>
        <h4>
          <strong>Goal:</strong> {signal.Goal / 100000} Dero by{' '}
          {signal.Deadline}
        </h4>
        <h4>
          <strong>Progress:</strong> {signal.Raised / 100000} /{' '}
          {signal.Goal / 100000}
        </h4>
        <h4>
          <strong>Funds go to:</strong>
        </h4>
        <div className="h-auto">
          <TruncatedText text={signal.Address} />
        </div>
        <span className="divider" />
        <p
          dangerouslySetInnerHTML={{
            __html:
              signal.Descriptions &&
              signal.Descriptions[signal.Descriptions.length - 1],
          }}
        />
      </div>
    </div>
  );
};
