import { Helpers } from '@/utils/helpers.js';
import { useTheme } from '@/components/hooks/useTheme.js';
import { useState } from 'react';
import { ImageHeader } from '@/components/tileView/mainView/fundraiser/imageHeader.jsx';
import { InitiatedBy } from '@/components/tileView/common/InitiatedBy.jsx';
import { DisplayDateBox } from '@/components/tileView/common/DisplayDateBox.jsx';
import { FundProgress } from '@/components/tileView/common/fundraiser/FundProgress.jsx';
import { WithdrawInfoBox } from '@/components/tileView/common/fundraiser/WithdrawInfoBox.jsx';
import { StickyActionsBar } from '@/components/tileView/mainView/fundraiser/StickyActionsBar.jsx';
import { DonateForm } from '@/components/tileView/common/fundraiser/DonateForm.jsx';
import { RewardInfoBox } from '@/components/tileView/common/fundraiser/RewardInfoBox.jsx';
import { ActionButtons } from '@/components/tileView/common/fundraiser/ActionButtons.jsx';
import { WithdrawMetGoal } from '@/components/tileView/common/fundraiser/WithdrawMetGoal.jsx';
import { EditFundraiser } from '@/components/tileView/mainView/fundraiser/editFundraiser.jsx';

export const Fundraiser = ({ fundData }) => {
  const { proseClass } = useTheme();
  const [editing, setEditing] = useState(false);

  return (
    <div className="mx-auto grid w-full grid-cols-1 content-start">
      {/* TODO MTS -- Need to TEST editing form - feb 4, 2024 */}
      {fundData && editing ? (
        <EditFundraiser tile={fundData} />
      ) : (
        <>
          <div className="break-words">
            {/*TODO MTS - prob need call back from ImageHeader to update editing state when form submitted*/}
            <ImageHeader
              fundData={fundData}
              editing={editing}
              setEditing={setEditing}
            />
            <div className="clear-both h-10"></div>
            <div className="relative w-full px-4 md:px-6">
              <div className="fund_title space-y-3 leading-8">
                <h1 className="text-3xl leading-8">
                  {Helpers.getTileName(fundData)}
                </h1>
                <div className="tagline text-xl leading-6">
                  {Helpers.getTileTagline(fundData)}
                </div>
                <InitiatedBy tile={fundData} />
                <DisplayDateBox date={fundData.Expiry} />
                <div className="clear-both h-6"></div>
              </div>
              <FundProgress tile={fundData} />
              <RewardInfoBox tile={fundData} />
              {fundData.Status === 0 && <DonateForm tile={fundData} />}

              <div
                className={`${proseClass} fund_description embedded-html relative mx-auto grid w-full grid-cols-1 content-start space-y-6 leading-6`}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: Helpers.getTileDescription(fundData),
                  }}
                />{' '}
              </div>
              <WithdrawInfoBox tile={fundData} />
              <ActionButtons tile={fundData} />
              {fundData.Raised >= fundData.Goal && (
                <WithdrawMetGoal tile={fundData} />
              )}
            </div>
          </div>
          <StickyActionsBar tile={fundData} />
        </>
      )}
      {!fundData && <>Loading... </>}
    </div>
  );
};
