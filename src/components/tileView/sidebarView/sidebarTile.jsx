import { DERO_DENOMINATOR, Helpers, piAssetType } from '@/utils/helpers.js';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@/components/hooks/useTheme.js';
import { useContext, useMemo } from 'react';
import { TileContext } from '@/components/providers/TileContext.jsx';
import { useGetAssociatedItems } from '@/components/hooks/useGetAssociatedItems.js';
import { useSearchParams } from 'react-router-dom';

export const SidebarTile = () => {
  const { proseClass } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedTile, initiatorTile, setSelectedTile, myIslands, isMyTile } =
    useContext(TileContext);
  const { OtherBounties, OtherFundraisers, OtherSubscriptions, OtherIslands } =
    useGetAssociatedItems(
      initiatorTile,
      selectedTile.type,
      selectedTile.Index,
      myIslands
    );

  const itemsMap = {
    bounty: OtherBounties,
    subscription: OtherSubscriptions,
    fundraiser: OtherFundraisers,
    island: OtherIslands,
  };
  const itemsToRender = itemsMap[selectedTile.type] || [];
  const title =
    itemsToRender?.length > 0
      ? 'More ' + Helpers.getItemTypeName(selectedTile.type).plural
      : '';

  return (
    <div className={`mt-4 font-fell ${itemsToRender?.length ? '' : 'mb-20'}`}>
      <div className="text-2xl">{title}</div>
      {itemsToRender.length > 0 &&
        itemsToRender.map((item, index) => {
          if (
            item.type !== piAssetType.ISLAND ||
            (item.type === piAssetType.ISLAND && isMyTile)
          ) {
            return (
              <div
                key={Helpers.getTileName(item)}
                className={`card card-side ${
                  index === itemsToRender.length - 1 ? 'mb-24' : 'mb-4'
                } border border-secondary shadow-xl`}
              >
                <div
                  className={`card-body z-10 cursor-pointer text-black`}
                  onClick={() => {
                    let params = { scid: item.SCID, type: item.type };
                    if (item.Index !== undefined) {
                      params.index = item.Index;
                    }
                    setSearchParams(params);
                    setSelectedTile(item);
                  }}
                >
                  <h2 className="card-title">{Helpers.getTileName(item)}</h2>
                  {Helpers.getTileTagline(item)}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
    </div>
  );
};
