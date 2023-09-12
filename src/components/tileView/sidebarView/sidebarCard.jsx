import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { SidebarHeader } from '@/components/tileView/sidebarView/sidebarHeader.jsx';

export const SidebarCard = ({ data }) => {
  return (
    <div className="relative w-full px-1">
      <FlexBoxColumn justify="start">
        <SidebarHeader data={data} />
      </FlexBoxColumn>
    </div>
  );
};
