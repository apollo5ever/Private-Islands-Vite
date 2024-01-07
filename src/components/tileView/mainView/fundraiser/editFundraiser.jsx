import { useFundraiserActions } from '@/components/hooks/useFundraiserActions.js';
import { Helpers } from '@/utils/helpers.js';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';

export const EditFundraiser = ({ tile }) => {
  const { handleSetMetaData } = useFundraiserActions(tile);

  {
    /*
    TODO DO - TEST - From submission NOT TESTED as of Feb 4, 2024
            - Handle a user response post submit based on searchParams.get('status') == 'success'
            - Create a snackbar type message?
  */
  }

  return (
    <>
      <form onSubmit={handleSetMetaData}>
        <div className="mx-auto grid w-full grid-cols-1 content-start">
          <div className="img_container relative">
            <div
              className="bounty_img relative inline-block h-96 max-h-[350px] w-full rounded-lg bg-cover bg-center bg-no-repeat sm:max-h-[400px]"
              style={{
                backgroundImage: `url('${Helpers.getTileImage(tile)}')`,
              }}
            >
              <div className="edit_button absolute right-3 top-3">
                <button
                  type="submit"
                  onClick={() => {
                    setEditing(false);
                  }}
                  className="btn w-full cursor-pointer rounded-bl-[25px] rounded-tr-[25px] bg-gradient-to-b from-[#61C0A8] to-[#6CCAB1] px-10 py-1 text-center text-lg leading-tight text-[#FFF] hover:scale-105 hover:shadow-lg sm:rounded-bl-[35px] sm:rounded-tr-[35px] sm:text-2xl"
                >
                  Save Changes
                </button>
              </div>
            </div>
            <div
              className="absolute -bottom-[20px] left-0 inline-block h-[100px] w-[100px] overflow-hidden bg-[white] p-[5px]"
              style={{
                clipPath:
                  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <img
                className="w-full overflow-hidden"
                src={Helpers.getTileImage(tile)}
                style={{
                  clipPath:
                    'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              />
            </div>
          </div>

          <div className="clear-both h-10"></div>

          <div className="content_container relative w-full px-4 sm:px-6">
            <FlexBoxRow
              justify="start"
              className="relative inline-block w-full rounded-md"
            >
              <label className="mr-2 block w-1/3 text-xl font-bold leading-6 text-[#484541] lg:w-1/4">
                Fundraiser Image
              </label>
              <input
                type="text"
                name="fund_img"
                id="Image"
                className="inline-block flex-grow rounded-md border-0 py-1.5 pl-4 pr-4 text-base leading-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-accent"
                value={Helpers.getTileImage(tile)}
                placeholder="Image URL"
              />
            </FlexBoxRow>
            <div className="clear-both h-6"></div>
            <FlexBoxRow
              justify="start"
              align="center"
              className="relative inline-block w-full rounded-md"
            >
              <label className="mr-2 block w-1/3 text-xl font-bold leading-6 text-[#484541] lg:w-1/4">
                Fundraiser Title
              </label>
              <input
                type="text"
                name="fund_name"
                id="Name"
                className="inline-block flex-grow rounded-md border-0 py-1.5 pl-4 pr-4 text-base leading-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-accent"
                value={Helpers.getTileName(tile)}
              />
            </FlexBoxRow>
            <div className="clear-both h-6"></div>
            <FlexBoxRow
              justify="start"
              className="relative inline-block w-full rounded-md"
            >
              <label className="mr-2 block w-1/3 text-xl font-bold leading-6 text-[#484541] lg:w-1/4">
                Fundraiser Tagline
              </label>
              <input
                type="text"
                name="fund_tagline"
                id="Tagline"
                className="inline-block flex-grow rounded-md border-0 py-1.5 pl-4 pr-4 text-base leading-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#61C0A8]"
                value={Helpers.getTileTagline(tile)}
                placeholder="Your Tagline Here"
              />
            </FlexBoxRow>
            <div className="clear-both h-6"></div>

            <div className="relative inline-block w-full rounded-md">
              <label className="mb-2 block text-xl font-bold leading-6 text-[#484541]">
                Fundraiser Description
              </label>
              <textarea
                name="fund_description"
                id="Description"
                className="textarea textarea-lg inline-block min-h-[300px] w-full rounded-md border-0 py-2 pl-4 pr-4 text-base leading-7 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#61C0A8]"
                placeholder="Your Description Here"
                value={Helpers.getTileDescription(tile)}
              ></textarea>
            </div>
            <div className="clear-both h-10"></div>

            <div className="buttons mx-auto grid justify-items-center gap-5 pb-2 sm:grid-cols-2">
              <button
                type="submit"
                onClick={() => {
                  setEditing(false);
                }}
                className="mx-auto w-full cursor-pointer rounded-bl-[35px] rounded-tr-[35px] bg-gradient-to-b from-[#61C0A8] to-[#6CCAB1] py-1 text-center font-fell text-3xl leading-tight text-[#FFF] hover:shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
