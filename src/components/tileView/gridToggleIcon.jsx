import React from 'react';
import gridIcon from '@/assets/images/gridIcon.png';

export const GridToggleIcon = ({ toggleTiles }) => {
  return (
    <div
      className="fixed bottom-16 left-0 z-50 ml-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white"
      onClick={toggleTiles}
    >
      <img src={gridIcon} alt="Toggle Grid" className="h-6 w-6" />
    </div>
  );
};
