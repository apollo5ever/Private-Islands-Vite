import React from 'react';
import { TruncatedText } from '@/components/common/TruncatedText.jsx';
import { NavLink } from 'react-router-dom';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';

export const DetailCard = ({ signal, deadline }) => {
  return (
    <FlexBoxRow justify="start" align="start" className="font-fell text-lg">
      <figure className="min-w-[400px] max-w-[700px] rounded-2xl md:pl-3">
        <img
          src={signal.Images && signal.Images[signal.Images.length - 1]}
          alt={signal.Names && signal.Names[signal.Names.length - 1]}
        />
      </figure>
      <div className="card-body break-words">
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
    </FlexBoxRow>
  );
};
