import { Helpers, piAssetType } from '@/utils/helpers.js';
import { DonationCard } from '@/components/tileView/sidebarView/fundraiser/donationCard.jsx';

export const SidebarHeader = ({ data }) => {
  console.log('SIDE BAR HEADER data = ', data);

  return (
    <>
      {data?.type === piAssetType.FUNDRAISER && (
        <DonationCard fundData={data} />
      )}
    </>
  );
};
