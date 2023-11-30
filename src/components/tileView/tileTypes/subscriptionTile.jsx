import { Helpers } from '@/utils/helpers.js';
import { useInitiatorImage } from '@/components/hooks/useGetInitiatorImage.js';
import bottle from '@/assets/icons/icon_bottle_blue.svg';

export const SubscriptionTile = (props) => {
  const { tile } = props;
  const initiatorImage = useInitiatorImage(tile);

  return (
    <div class="mx-auto grid w-full flex-1 grid-cols-1 content-between">
      <div className="img_container relative">
        <div
          className="subscription_img relative inline-block h-96 w-full rounded-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${Helpers.getTileImage(tile)})` }}
        />
        <div
          className="absolute bottom-[-20px] left-0 inline-block h-[100px] w-[100px] overflow-hidden bg-[#FBF8EC] p-[5px]"
          style={{
            clipPath:
              'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
          }}
        >
          <img
            className="w-full overflow-hidden"
            src={initiatorImage}
            alt="Dero Private Island Bounty"
            style={{
              clipPath:
                'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
            }}
          />
        </div>
      </div>
      {/*TODO Update content*/}
      <div className="relative flex min-w-full flex-row-reverse pt-16">
        <div className="w-3/4 items-end space-y-3 leading-6">
          <div className="float-right w-3/4 cursor-pointer rounded-full bg-[#61C0A8] py-1 text-center font-fell text-3xl italic leading-tight text-[#FFF] hover:shadow-lg">
            Follow
          </div>
          <div className="absolute bottom-0 left-0 inline-block max-h-[90px] min-h-[70px] w-1/4 bg-cover bg-center bg-no-repeat">
            <img src={bottle} alt="Dero Private Island Message In a Bottle" />
          </div>
        </div>
      </div>
    </div>
  );
};
