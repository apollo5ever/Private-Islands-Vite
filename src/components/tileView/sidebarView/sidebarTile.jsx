import { DERO_DENOMINATOR, Helpers } from '@/utils/helpers.js';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@/components/hooks/useTheme.js';
import { useContext, useMemo } from 'react';
import { TileContext } from '@/components/providers/TileContext.jsx';
import { useGetAssociatedItems } from '@/components/hooks/useGetAssociatedItems.js';

export const SidebarTile = () => {
  const { proseClass } = useTheme();
  const { selectedTile, initiatorTile, setSelectedTile } =
    useContext(TileContext);
  const { OtherBounties, OtherFundraisers, OtherSubscriptions } =
    useGetAssociatedItems(initiatorTile, selectedTile.type, selectedTile.Index);

  const itemsMap = {
    bounty: OtherBounties,
    subscription: OtherSubscriptions,
    fundraiser: OtherFundraisers,
  };
  const itemsToRender = itemsMap[selectedTile.type] || [];
  const title =
    itemsToRender?.length > 0
      ? 'More ' + Helpers.getItemTypeName(selectedTile.type).plural
      : '';

  return (
    <div className="mt-4 font-fell">
      <div className="text-2xl">{title}</div>
      {itemsToRender.length > 0 &&
        itemsToRender.map((item, index) => (
          <div
            key={Helpers.getTileName(item)}
            className={`card card-side ${
              index === itemsToRender.length - 1 ? 'mb-24' : 'mb-4'
            } border border-secondary shadow-xl`}
          >
            <div
              className={`card-body z-10 cursor-pointer text-black`}
              onClick={() => setSelectedTile(item)}
            >
              <h2 className="card-title">{Helpers.getTileName(item)}</h2>
              {Helpers.getTileTagline(item)}
            </div>
          </div>
        ))}
    </div>
  );
};
