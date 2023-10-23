import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { SidebarHeader } from '@/components/tileView/sidebarView/sidebarHeader.jsx';
import { SeniorCoco } from '@/components/tileView/sidebarView/SeniorCoco.jsx';
import { useCocoChat } from '@/components/hooks/useCocoChat.js';
import bgImage from '@/assets/parallax/PrimaryIsland.png';
import { Helpers, piAssetType } from '@/utils/helpers.js';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/common/Button.jsx';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import { SidebarTile } from '@/components/tileView/sidebarView/sidebarTile.jsx';

export const SidebarCard = ({ data }) => {
  const { title, msg } = useCocoChat(data.type);

  return (
    <FlexBoxColumn justify="start" className="relative h-5/6 px-1">
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          opacity: 0.3,
          position: 'absolute',
          top: '32%',
          right: '0',
          width: '80%',
          height: '80%',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
        }}
      ></div>
      <SidebarHeader data={data} />
      <div className="z-1 relative mt-1 flex w-full flex-grow flex-col rounded-lg bg-info px-4 text-black">
        <SidebarTile />
        <div className="z-5 mt-auto flex w-full items-end justify-end">
          <div className="bubble order-1 max-w-xs bg-warning font-fell text-lg text-black">
            {title && (
              <div className="text-2xl">
                {data?.type === piAssetType.ISLAND
                  ? Helpers.ucfirst(data?.Name)
                  : ''}{' '}
                {title}
              </div>
            )}
            {msg && <div>{msg}</div>}
            {data?.type === piAssetType.ISLAND && (
              <NavLink to="/claimisland" className="mx-auto">
                <FlexBoxRow justify="end" className="text-sm">
                  <div className="z-10 cursor-pointer">
                    Claim Your Own Private Island
                  </div>
                </FlexBoxRow>
              </NavLink>
            )}
          </div>
          <div className="order-2 mt-auto flex-shrink-0">
            <SeniorCoco />
          </div>
        </div>
      </div>
    </FlexBoxColumn>
  );
};
