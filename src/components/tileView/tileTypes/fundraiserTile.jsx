import flame from '/src/assets/icons/icon_fire_orange.svg';
import { Helpers } from '@/utils/helpers.js';
import { useInitiatorImage } from '@/components/hooks/useGetInitiatorImage.js';
import dateString from '@/utils/dateString.js';

export const FundraiserTile = (props) => {
  const { tile } = props;
  const initiatorImage = useInitiatorImage(tile);
  const raised = tile.Raised / 100000;
  const goal = tile.Goal / 100000;
  const deadline = tile.Expiry ? dateString(tile.Expiry).local : '--';
  const isExpired =
    deadline === '--' ? false : Helpers.isDateBeforeToday(deadline);

  return (
    <div className="mx-auto grid w-full flex-1 grid-cols-1 content-between">
      <div className="img_container relative">
        <img
          className="fundraiser_img relative inline-block h-96 max-h-[300px] w-full rounded-lg bg-cover bg-center bg-no-repeat"
          src={Helpers.getTileImage(tile)}
        />
        <div
          className="absolute bottom-[-25px] left-0 inline-block h-[100px] w-[100px] overflow-hidden bg-[#FBF8EC] p-[5px]"
          style={{
            clipPath:
              'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          <img
            className="w-full overflow-hidden"
            src={initiatorImage}
            style={{
              clipPath:
                'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          />
        </div>
      </div>
      <div className="relative flex min-w-full flex-row-reverse pt-4">
        <div className="w-3/4 items-end space-y-3 overflow-clip leading-6">
          <h2 className="w-full whitespace-nowrap py-1 text-right font-fell text-3xl text-[#484541]">
            {tile.Name}
          </h2>
          <div className="progress_bar relative mt-6">
            <div className="float-right w-full py-1 text-right text-3xl text-[#61C0A8]">
              {raised} / {goal}
            </div>
            <div
              className={`float-right w-full py-1 text-right text-sm ${
                isExpired ? 'text-error' : 'text-[#484541]'
              }`}
            >
              {deadline}
            </div>
            <div className="float-right inline-block w-full rounded-full">
              <progress
                className="progress progress-accent w-full"
                value={raised}
                max={goal}
              />
            </div>
          </div>
          <img
            className="absolute bottom-0 left-0 inline-block max-h-[90px] min-h-[70px] w-1/4 bg-contain bg-center bg-no-repeat"
            src={flame}
          />
        </div>
      </div>
    </div>
  );
};
