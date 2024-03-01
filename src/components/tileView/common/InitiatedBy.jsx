import { Helpers } from '@/utils/helpers.js';
import { useContext } from 'react';
import { TileContext } from '@/components/providers/TileContext.jsx';

export const InitiatedBy = ({ tile }) => {
  const { gotoIslandTile } = useContext(TileContext);

  return (
    <div
      className="cursor-pointer font-bold"
      onClick={() => gotoIslandTile(Helpers.getInitiatorScid(tile))}
    >
      Initiated by {Helpers.getInitiatorName(tile)}
    </div>
  );
};
