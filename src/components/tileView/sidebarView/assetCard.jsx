import { Helpers } from '@/utils/helpers.js';
import { HeaderButtons } from '@/components/tileView/sidebarView/headerButtons.jsx';
import { AdditionalAssets } from '@/components/tileView/sidebarView/additionalAssets.jsx';

export const AssetCard = ({ tile }) => {
  return (
    <div className="user_card relative mx-auto w-full rounded-lg bg-white px-4 pb-4 pt-4 shadow-xl ring-1 ring-gray-900/5 lg:pt-8">
      <div className="mx-auto grid w-full flex-1 grid-cols-1 content-between">
        <div className="img_container relative w-full justify-center pt-[120px]">
          <div
            className="absolute -top-[55px] left-[50%] inline-block lg:-top-[70px]"
            style={{ transform: 'translate(-50%, 0%)' }}
          >
            <div
              className="main_card_img relative z-40 inline-block h-[158px] w-[150px] rounded-lg before:absolute before:-inset-1 before:block before:bg-[rgba(144,102,62,0.4)]"
              style={{
                clipPath:
                  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <img
                className="h-[150px] w-full"
                src={Helpers.getTileImage(tile)}
                style={{
                  clipPath:
                    'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              />
            </div>
          </div>
        </div>

        <div className="upper_content relative w-full space-y-3 px-4 text-center leading-6">
          <div className="title_content">
            <h2 className="mb-6 text-3xl leading-10">
              {Helpers.getTileName(tile)}
            </h2>
          </div>

          <div className="card_description">
            <p className="text-xl">{Helpers.getTileTagline(tile)}</p>
            {/*/!*TODO - If we keep this, need onclick to island*!/*/}
            {/*<button className="mt-4 cursor-pointer rounded-lg p-4 text-xl font-semibold text-accent ring-1 ring-accent hover:underline dark:text-accent sm:text-2xl">*/}
            {/*  Visit {Helpers.getInitiatorName(tile)} Island*/}
            {/*</button>*/}
          </div>
          <div className="clear-both h-12"></div>
          <HeaderButtons tile={tile} />
          <div className="clear-both h-12"></div>
          <AdditionalAssets tile={tile} />
        </div>
      </div>
    </div>
  );
};
