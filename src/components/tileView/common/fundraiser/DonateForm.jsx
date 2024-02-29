import { useFundraiserActions } from '@/components/hooks/useFundraiserActions.js';

export const DonateForm = ({ tile }) => {
  const { handleSupportGoal } = useFundraiserActions(tile);

  return (
    <>
      <div className="donate_info mx-auto grid w-full flex-1 grid-cols-1 content-between">
        <div className="upper_content relative w-full space-y-3 py-4 leading-6">
          <div className="donation_info_container col-span-3">
            <div className="donation_form inline-block w-full rounded-lg bg-gradient-to-b from-primary via-[#F0EBDD] to-secondary px-4 pb-6 pt-3 ring-1 ring-slate-300">
              <form onSubmit={handleSupportGoal} className="w-full">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium leading-6 sm:text-base"
                >
                  Enter your donation amount
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    className="block w-full appearance-none rounded-md border-0 py-1.5 pl-4 pr-20 text-[#484541] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#61C0A8] sm:text-sm sm:leading-6"
                    placeholder="Dero amount to donate"
                  />
                  {/*TODO Currency options not yet supported*/}
                  {/*<div className="absolute inset-y-0 right-0 flex items-center">*/}
                  {/*  <label htmlFor="currency" className="sr-only">*/}
                  {/*    Currency*/}
                  {/*  </label>*/}
                  {/*  <select*/}
                  {/*    id="currency"*/}
                  {/*    name="currency"*/}
                  {/*    className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#61C0A8]  sm:text-sm"*/}
                  {/*  >*/}
                  {/*    <option>DERO</option>*/}
                  {/*    <option>COCO</option>*/}
                  {/*    <option>DUSDT</option>*/}
                  {/*  </select>*/}
                  {/*</div>*/}
                </div>

                <div className="refundable_checkbox mt-6 w-full">
                  <div className="form-control">
                    <div className="flex items-center">
                      <input
                        id="refundable"
                        type="checkbox"
                        className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-[#61C0A8] focus:ring-2 focus:ring-[#61C0A8] dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-[#61C0A8]"
                      />
                      <label
                        htmlFor="refundable"
                        className="sm:text-md ms-2 text-sm font-medium"
                      >
                        Make my donation refundable.{' '}
                        {/*TODO need effect for the tool tip*/}
                        <button className="text-accent hover:underline dark:text-accent">
                          (What's&nbsp;this?)
                        </button>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="donation_button mt-6">
                  <button
                    type={'submit'}
                    className="btn w-full cursor-pointer rounded-bl-[25px] rounded-tr-[25px] bg-gradient-to-b from-accent to-[#6CCAB1] py-1 text-center text-3xl leading-tight text-[#FFF] hover:shadow-lg sm:rounded-bl-[35px] sm:rounded-tr-[35px]"
                  >
                    Support
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
