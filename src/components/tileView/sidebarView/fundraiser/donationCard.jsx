import { RewardInfoBox } from '@/components/tileView/common/fundraiser/RewardInfoBox.jsx';
import { FundProgress } from '@/components/tileView/common/fundraiser/FundProgress.jsx';
import { DonateForm } from '@/components/tileView/common/fundraiser/DonateForm.jsx';
import { WithdrawInfoBox } from '@/components/tileView/common/fundraiser/WithdrawInfoBox.jsx';
import { ActionButtons } from '@/components/tileView/common/fundraiser/ActionButtons.jsx';
import { WithdrawMetGoal } from '@/components/tileView/common/fundraiser/WithdrawMetGoal.jsx';

export const DonationCard = ({
  fundData,
  supportGoal,
  withdraw,
  oaoWithdraw,
}) => {
  console.log('DONATION CARD data = ', fundData);

  return (
    <div className="upper_content relative w-full space-y-2 pt-0 leading-6">
      <RewardInfoBox tile={fundData} />
      <div className="clear-both"></div>
      <hr className="mb-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-[#E5D7B9] to-transparent opacity-25 dark:opacity-100" />
      <FundProgress tile={fundData} />
      <hr className="mt-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-[#E5D7B9] to-transparent opacity-25 dark:opacity-100" />
      <div className="clear-both h-2"></div>

      {fundData.Status === 0 && (
        <>
          <h3 className="text-3xl text-accent">Support this fundraiser!</h3>
          <DonateForm tile={fundData} />
        </>
      )}
      <div className="clear-both hidden h-2"></div>
      <WithdrawInfoBox tile={fundData} />
      <ActionButtons tile={fundData} />
      {fundData.Raised >= fundData.Goal && <WithdrawMetGoal tile={fundData} />}
    </div>
  );
};
