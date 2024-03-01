import { Helpers } from '@/utils/helpers.js';
import { useContext } from 'react';
import { TileContext } from '@/components/providers/TileContext.jsx';

export const ImageHeader = ({ fundData, editing, setEditing }) => {
  const { gotoIslandTile, myIslands } = useContext(TileContext);

  return (
    <div className="img_container relative">
      <div
        className="bounty_img relative inline-block h-96 max-h-[350px] w-full rounded-lg bg-cover bg-center bg-no-repeat sm:max-h-[400px]"
        style={{
          backgroundImage: `url('${Helpers.getTileImage(fundData)}')`,
        }}
      >
        <div className="edit_button absolute right-3 top-3">
          {!editing &&
          myIslands &&
          myIslands.length > 0 &&
          myIslands.map((x) => x.SCID).includes(fundData.SCID) ? (
            <div
              className="btn w-full cursor-pointer rounded-bl-[25px] rounded-tr-[25px] bg-gradient-to-b from-accent to-[#6CCAB1] px-10 py-1 text-center text-lg leading-tight text-[#FFF] hover:scale-105 hover:shadow-lg sm:rounded-bl-[35px] sm:rounded-tr-[35px] sm:text-2xl"
              onClick={() => {
                setEditing(true);
              }}
            >
              Edit
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        className="absolute -bottom-[20px] left-0 inline-block h-[100px] w-[100px] overflow-hidden bg-[white] p-[5px]"
        style={{
          WebkitClipPath:
            'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          clipPath:
            'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      >
        <img
          className="w-full overflow-hidden"
          src={Helpers.getTileImage(fundData)}
          style={{
            WebkitClipPath:
              'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            clipPath:
              'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        />
      </div>
    </div>
  );
};
