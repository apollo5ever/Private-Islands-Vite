import { Helpers } from '@/utils/helpers.js';
import React, { useEffect, useState } from 'react';

export const IslandTile = (props) => {
  const { tile } = props;
  const [src, setSrc] = useState(tile.image);

  useEffect(() => {
    setSrc(Helpers.getTileImage(tile));
  }, [tile.image]);

  return (
    <div className="mx-auto grid w-full grid-cols-1 content-stretch">
      <div className="img_container relative mx-auto w-11/12 text-center">
        <div
          className="clip-deroHex main_card_img_bg h-0 w-full rounded-lg pt-[100%] before:absolute before:-inset-1 before:block before:bg-[rgba(144,102,62,0.4)]"
          style={{
            clipPath:
              'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        ></div>
        <div
          className="clip-deroHex absolute -top-[10px] left-0 z-50 inline-block h-0 w-full rounded-lg bg-cover bg-center bg-no-repeat pt-[100%]"
          style={{
            backgroundImage: `url(${src})`,
            clipPath:
              'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        ></div>
      </div>
      <div className="relative flex min-w-full pt-10">
        <div className="w-full items-end space-y-3 text-center leading-8">
          <div className="font-fell text-4xl leading-8 text-[#607361]">
            {Helpers.getTileName(tile)}
          </div>
          <div className="font-fell text-xl text-[#484541]">
            Social Coconut Score: {tile.score ? tile.score : '--'}
          </div>
        </div>
      </div>
    </div>
  );
};
