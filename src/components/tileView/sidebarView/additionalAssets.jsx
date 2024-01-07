import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { TileContext } from '@/components/providers/TileContext.jsx';
import { useGetAssociatedItems } from '@/components/hooks/useGetAssociatedItems.js';
import { Helpers, piAssetType } from '@/utils/helpers.js';

export const AdditionalAssets = () => {
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

  console.log('RENDERITEMS', itemsToRender);

  return (
    <>
      {itemsToRender.length ? (
        <div className="other_fundraisers space-y-3 rounded-lg pb-3 ring-1 ring-slate-300">
          <div className="title_content w-full space-y-3 rounded-tl-lg rounded-tr-lg bg-gradient-to-b from-[#767471] to-[#484541] px-6 py-2">
            <h3 className="text-txt w-full text-xl sm:text-2xl">
              {`More ${
                Helpers.getItemTypeName(selectedTile.type).plural
              } by ${Helpers.getInitiatorName(selectedTile)}`}
              :
            </h3>
          </div>

          {itemsToRender.length > 0 &&
            itemsToRender.map((item, index) => {
              if (
                item.type !== piAssetType.ISLAND ||
                (item.type === piAssetType.ISLAND && isMyTile)
              ) {
                return (
                  <div
                    key={index}
                    className="other_fund_list grid gap-3 px-3 py-2 text-base leading-6 sm:text-lg"
                  >
                    <div className="fundraiser_single grid w-full grid-cols-12 items-center justify-start justify-items-start gap-2">
                      <div className="col-span-1">
                        <img
                          src={Helpers.getIcon(item.type)}
                          className="mx-auto w-[20px]"
                        />
                      </div>
                      <div
                        className="col-span-11 cursor-pointer"
                        onClick={() => {
                          let params = { scid: item.SCID, type: item.type };
                          if (item.Index !== undefined) {
                            params.index = item.Index;
                          }
                          setSearchParams(params);
                          setSelectedTile(item);
                        }}
                      >
                        <div className="text-accent">
                          {Helpers.getTileName(item)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
