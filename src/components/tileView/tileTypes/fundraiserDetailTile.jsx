import { Helpers } from '@/utils/helpers.js';
import dateString from '@/utils/dateString.js';
import { useTheme } from '@/components/hooks/useTheme.js';
import { useInitiatorImage } from '@/components/hooks/useGetInitiatorImage.js';
import flame from '@/assets/icons/icon_fire_orange.svg';

export const FundraiserDetailTile = (props) => {
  const { tile } = props;
  const { proseClass } = useTheme();
  const initiatorImage = useInitiatorImage(tile);
  const raised = tile.Raised / 100000;
  const goal = tile.Goal / 100000;
  const deadline = tile.Expiry ? dateString(tile.Expiry).local : '--';
  const isExpired =
    deadline === '--' ? false : Helpers.isDateBeforeToday(deadline);

  return (
    <div className="fundraiser_card relative mx-auto flex w-full rounded-lg bg-[#FBF8EC] px-4 pb-6 pt-4 shadow-xl ring-1 ring-gray-900/5 hover:bg-gray-100">
      <div className="mx-auto grid w-full flex-1 grid-cols-1 content-between">
        <div className="img_container relative">
          <div
            className="fundraiser_img relative inline-block h-36 w-full rounded-lg bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${Helpers.getTileImage(tile)})` }}
          />
          <div
            className="absolute bottom-[-25px] left-0 inline-block h-[100px] w-[100px] overflow-hidden bg-[#FBF8EC] p-[5px]"
            style={{
              clipPath:
                'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
            }}
          >
            <img
              className="w-full overflow-hidden"
              src={initiatorImage}
              style={{
                clipPath:
                  'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
              }}
            />
          </div>
        </div>
        <div className="card_content relative items-end">
          <div className="upper_content flex w-full space-y-6">
            <div className="w-1/4 space-y-10 pt-8 text-center">
              <img className="mx-auto ml-2 w-full max-w-[70px]" src={flame} />
              <div className="text-center">
                <h4 className="font-['Average Sans'] text-3xl text-accent">
                  {raised}
                </h4>
              </div>
            </div>
            <div className="w-3/4 flex-1 space-y-6 pl-7 leading-6">
              <div className="title_content space-y-3">
                <div className="font-fell text-4xl leading-10 text-[#484541]">
                  {Helpers.getTileName(tile)}
                </div>
                <div className="font-fell text-3xl leading-6 text-[#B1AF94]">
                  {Helpers.getTileTagline(tile)}
                </div>
              </div>
              <div>
                <p
                  className={`${proseClass} line-clamp-5 text-lg text-[#484541]`}
                  dangerouslySetInnerHTML={{
                    __html: Helpers.getTileDescription(tile),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="progress_bar relative mt-6">
          <div className="float-right w-full py-1 text-right text-3xl text-[#61C0A8]">
            {raised} / {goal}
          </div>
          <div className="float-right inline-block w-full rounded-full">
            <progress
              className="progress-accent progress w-full"
              value={raised}
              max={goal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
