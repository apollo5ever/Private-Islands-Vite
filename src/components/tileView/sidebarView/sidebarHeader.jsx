import { Helpers } from '@/utils/helpers.js';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { HeaderButtons } from '@/components/tileView/sidebarView/headerButtons.jsx';

export const SidebarHeader = (data) => {
  const item = data.data;

  return (
    <div className="mt-3 w-full rounded-lg bg-info px-4 font-fell text-black">
      <FlexBoxColumn className="mt-2">
        <div className="text-2xl">{Helpers.ucfirst(item?.Initiator?.Name)}</div>
        <div className="text-4xl">{Helpers.getTileName(item)}</div>
        <div className="py-2">{Helpers.ucfirst(item.type)}</div>
        <HeaderButtons type={item.type} />
      </FlexBoxColumn>
    </div>
  );
};
