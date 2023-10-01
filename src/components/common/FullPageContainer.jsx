import React from 'react';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';

export const FullPageContainer = ({ children, bgImage, rightPct = 60 }) => {
  return (
    <FlexBoxColumn className="relative mx-auto mt-4 max-w-3xl rounded-lg border border-secondary p-8 font-fell text-black">
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          opacity: 0.6,
          position: 'absolute',
          top: '0',
          right: `${rightPct}%`,
          width: '100%',
          height: '100vh',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left',
          zIndex: 2,
        }}
      ></div>
      {children}
    </FlexBoxColumn>
  );
};
