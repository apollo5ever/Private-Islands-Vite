import { SidebarHeader } from '@/components/tileView/sidebarView/sidebarHeader.jsx';
import { AssetCard } from '@/components/tileView/sidebarView/assetCard.jsx';

export const SidebarCard = ({ data }) => {
  return (
    <>
      <div className="right_col mx-auto w-full lg:sticky lg:inset-y-4 lg:right-0 lg:top-[90px]">
        <div className="sidebar_card relative mx-auto hidden w-full rounded-lg bg-white px-5 py-4 shadow-xl ring-1 ring-gray-900/5 lg:block">
          <div className="mx-auto grid w-full flex-1 grid-cols-1 content-between">
            <SidebarHeader data={data} />
          </div>
        </div>
        <div className="clear-both h-8 lg:h-14"></div>
        <AssetCard tile={data} />
      </div>
    </>
  );
};
