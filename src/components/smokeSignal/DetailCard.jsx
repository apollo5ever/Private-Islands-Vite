import React from 'react';
import { TruncatedText } from '@/components/common/TruncatedText.jsx';

export const DetailCard = ({ signal, deadline }) => {
  return (
    <div className="card card-side my-3 flex-col whitespace-normal bg-info shadow-xl md:flex-row">
      <figure className="min-w-[400px] max-w-[700px] md:pl-3">
        <img src={signal.image} className="rounded-2xl" alt={signal.name} />
      </figure>
      <div className="card-body break-words text-neutral">
        <h2 className="card-title">{signal.name}</h2>
        <h4>{signal.tagline}</h4>
        <h4>
          <strong>Goal:</strong> {signal.goal / 100000} Dero by {deadline}
        </h4>
        <h4>
          <strong>Progress:</strong> {signal.raised / 100000} /{' '}
          {signal.goal / 100000}
        </h4>
        <h4>
          <strong>Funds go to:</strong>
        </h4>
        <div className="h-auto">
          <TruncatedText text={signal.address} />
        </div>
        <span className="divider" />
        <p dangerouslySetInnerHTML={{ __html: signal.description }} />
      </div>
    </div>
  );
};
