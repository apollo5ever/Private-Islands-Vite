import RichTextEditor from '@/components/common/richTextEditor.jsx';
import React, { useState } from 'react';
import { useSendTransaction } from '@/components/hooks/useSendTransaction.jsx';
import { useGetGasEstimate } from '@/components/hooks/useGetGasEstimate.jsx';
import { LoginContext } from '@/LoginContext.jsx';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetSC } from '@/components/hooks/useGetSC.jsx';
import { useGetAddress } from '@/components/hooks/useGetAddress.jsx';
import { useGetRandomAddress } from '@/components/hooks/useGetRandomAddress.jsx';

export const AddFundraiser = () => {
  const [sendTransaction] = useSendTransaction();
  const [getGasEstimate] = useGetGasEstimate();
  const [state, setState] = React.useContext(LoginContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [getSC] = useGetSC();
  const [getAddress] = useGetAddress();
  const [getRandomAddress] = useGetRandomAddress();
  const params = useParams();
  const island = params.island;
  const index = params.index;
  const [editorHtml, setEditorHtml] = useState('');
  const [formData, setFormData] = useState({
    image: '',
    bio: '',
    tagline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // TODO
  //  - Need response msg for user (snackbar?)
  //  - TEST TEST TEST

  const addNewFundraiser = React.useCallback(async (event) => {
    event.preventDefault();
    const randomAddress = await getRandomAddress();
    const userAddress = await getAddress();

    let oao = 0;
    if (event.target.OAO.checked) {
      oao = 1;
    }
    let ico = 0;
    if (event.target.ICO.checked) {
      ico = 1;
    }

    var deadline = new Date(event.target.deadline.value).getTime() / 1000;

    let transfers = [
      {
        destination: randomAddress,
        scid: island,
        burn: 1,
      },
    ];

    if (ico === 1 && event.target.icoAmount.value > 0) {
      transfers = transfers.concat({
        burn: parseInt(event.target.icoAmount.value),
        scid: event.target.icoToken.value,
      });
    }

    const txData = new Object({
      scid: state.scid_fundraisers,
      ringsize: 2,
      transfers: transfers,
      signer: userAddress,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'NF',
        },

        {
          name: 'Goal',
          datatype: 'U',
          value: parseInt(event.target.goal.value) * 100000,
        },
        {
          name: 'Deadline',
          datatype: 'U',
          value: deadline,
        },
        {
          name: 'Recipient',
          datatype: 'S',
          value: event.target.address.value,
        },
        {
          name: 'H',
          datatype: 'S',
          value: island,
        },
        {
          name: 'i',
          datatype: 'U',
          value: parseInt(index),
        },
        {
          name: 'name',
          datatype: 'S',
          value: event.target.fundName.value,
        },
        {
          name: 'icoToken',
          datatype: 'S',
          value: event.target.icoToken.value,
        },
        {
          name: 'image',
          datatype: 'S',
          value: event.target.fundPhoto.value,
        },
        {
          name: 'tagline',
          datatype: 'S',
          value: event.target.tagline.value,
        },

        {
          name: 'desc',
          datatype: 'S',
          value: formData.bio,
        },
        {
          name: 'WithdrawlType',
          datatype: 'U',
          value: oao,
        },
        {
          name: 'ICO',
          datatype: 'U',
          value: ico,
        },
      ],
    });
    txData.gas_rpc = [
      {
        name: 'SC_ACTION',
        datatype: 'U',
        value: 0,
      },
      {
        name: 'SC_ID',
        datatype: 'H',
        value: state.scid_fundraisers,
      },
    ].concat(txData.sc_rpc);

    txData.fees = await getGasEstimate(txData);

    sendTransaction(txData);
  });

  return (
    <form onSubmit={addNewFundraiser}>
      {' '}
      {/*TODO add function name in form tag onSubmit={addNewFundraiser} - leaving out so I don't accidently submit to prod back end */}
      <div className="main_container relative mx-5 mb-12 mt-0 grid h-full grid-cols-1 items-start gap-x-5 gap-y-2 lg:grid-cols-1">
        <div className="edit_title content-center px-2 pt-2 lg:col-span-2">
          <h1 className="mb-4 text-3xl">Add New Fundraiser&nbsp;&#8853;</h1>
        </div>
        <div className="main_info relative mx-auto mb-8 w-full rounded-lg bg-[white] py-6 shadow-xl ring-1 ring-gray-900/5 lg:col-span-2 lg:mb-0">
          <div className="mx-auto grid w-full grid-cols-1 content-start">
            <div className="content_container relative w-full px-4 sm:px-6">
              <div className="relative inline-block w-full rounded-md">
                <label
                  htmlFor="fund_img"
                  className="mb-2 block text-xl font-bold leading-6 text-[#484541]"
                >
                  Fundraiser Image
                </label>
                <input
                  type="text"
                  name="fund_img"
                  id="fundPhoto"
                  className="inline-block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-base leading-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-accent"
                  placeholder="Image URL"
                />
                <p className="mt-2 text-sm text-accent">
                  Recommended size: 1980 x 800 pixels
                </p>
              </div>

              <div className="clear-both h-6"></div>

              <div className="relative inline-block w-full rounded-md">
                <label
                  htmlFor="fund_name"
                  className="mb-2 block text-xl font-bold leading-6 text-[#484541]"
                >
                  Fundraiser Title
                </label>
                <input
                  type="text"
                  name="fund_name"
                  id="fundName"
                  className="inline-block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-base leading-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-accent"
                  placeholder="Fundraiser Name"
                />
                <p className="mt-2 text-sm text-accent">
                  *This field is immutable. It cannot be changed afterwards.
                </p>
              </div>

              <div className="clear-both h-6"></div>

              <div className="relative inline-block w-full rounded-md">
                <label
                  htmlFor="fund_tagline"
                  className="mb-2 block text-xl font-bold leading-6 text-[#484541]"
                >
                  Fundraiser Tagline
                </label>
                <input
                  type="text"
                  name="fund_tagline"
                  id="tagline"
                  className="inline-block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-base leading-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-accent"
                  placeholder="Your Tagline Here"
                />
              </div>

              <div className="clear-both h-6"></div>

              <div className="relative inline-block w-full rounded-md">
                <label
                  htmlFor="fund_recipient"
                  className="mb-2 block text-xl font-bold leading-6 text-[#484541]"
                >
                  Recipient's Address
                </label>
                <input
                  type="text"
                  name="fund_recipient"
                  id="address"
                  className="inline-block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-base leading-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-accent"
                  placeholder="dero1qytnj6ybdghjymn65rtvc....."
                />
                <p className="mt-2 text-sm text-accent">
                  *This field is immutable. It cannot be changed afterwards.
                </p>
              </div>

              <div className="clear-both h-6"></div>

              <div className="relative w-full rounded-md">
                <label
                  htmlFor="fund_goal"
                  className="mb-2 block text-xl font-bold leading-6 text-[#484541]"
                >
                  Fundraiser Goal
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="fund_goal"
                    id="goal"
                    className="inline-block w-full appearance-none rounded-md border-0 py-1.5 pl-4 pr-4 text-base leading-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-accent"
                    placeholder="0.00000"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">
                      Currency
                    </label>
                    <select
                      id="Currency"
                      name="currency"
                      className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm"
                    >
                      <option>DERO</option>
                      <option>COCO</option>
                      <option>DUSDT</option>
                    </select>
                  </div>
                </div>
                <p className="mt-2 text-sm text-accent">
                  *This field is immutable. It cannot be changed afterwards.
                </p>
              </div>

              <div className="clear-both h-6"></div>

              <div className="relative inline-block w-full rounded-md shadow-sm">
                <label
                  htmlFor="fund_deadline"
                  className="mb-2 block text-xl font-bold leading-6 text-[#484541]"
                >
                  Fundraiser Deadline
                </label>
                <input
                  type="datetime-local"
                  name="fund_deadline"
                  id="deadline"
                  className="inline-block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-base leading-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-accent"
                  placeholder="dd/mm/yyyy, --:--"
                  min="2024-01-01T00:00"
                  max="2035-12-12T00:00"
                />
                <p className="mt-2 text-sm text-accent">
                  *This field is immutable. It cannot be changed afterwards.
                </p>
              </div>

              <div className="clear-both h-6"></div>

              <div className="relative inline-block w-full rounded-md">
                <label
                  htmlFor="fund_description"
                  className="mb-2 block text-xl font-bold leading-6 text-[#484541]"
                >
                  Fundraiser Description
                </label>
                <RichTextEditor
                  editorHtml={editorHtml}
                  setEditorHtml={setEditorHtml}
                  bio={formData.bio}
                  handleChange={handleChange}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>

              <div className="clear-both h-6"></div>

              <div className="withdrawToken_checkbox w-full">
                <div className="form-control">
                  <div className="flex items-center">
                    <input
                      id="OAO"
                      type="checkbox"
                      value=""
                      className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-accent focus:ring-2 focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-accent"
                    />
                    <label
                      htmlFor="OAO"
                      className="ms-2 w-full text-base font-medium text-[#484541] dark:text-[#484541]"
                    >
                      Check this box if you are using a withdrawal token in
                      place of a DERO address.{' '}
                      <button
                        onClick={() => console.log('Clicked OAO')}
                        className="text-accent hover:underline dark:text-accent"
                      >
                        (What's&nbsp;this?)
                      </button>
                    </label>
                  </div>
                </div>
              </div>

              <div className="clear-both h-6"></div>

              <div className="rewardToken_checkbox w-full">
                <div className="form-control">
                  <div className="flex items-center">
                    {/*TODO need name for this field??*/}
                    <input
                      id="ICO"
                      type="checkbox"
                      value=""
                      className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-accent focus:ring-2 focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-accent"
                    />
                    <label
                      htmlFor="ICO"
                      className="ms-2 w-full text-base font-medium text-[#484541] dark:text-[#484541]"
                    >
                      Check this box to reward funders with a token.{' '}
                      <button
                        onClick={() => console.log('Clicked 2')}
                        className="text-accent hover:underline dark:text-accent"
                      >
                        (What's&nbsp;this?)
                      </button>
                    </label>
                  </div>
                </div>
              </div>

              <div className="clear-both h-6"></div>

              <div className="relative inline-block w-full rounded-md">
                <label
                  htmlFor="fund_icoSCID"
                  className="mb-2 block text-xl font-bold leading-6 text-[#484541]"
                >
                  ICO Token SCID
                </label>
                <input
                  type="text"
                  name="fund_icoToken"
                  id="icoToken"
                  className="inline-block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-base leading-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-accent"
                  placeholder="SCID"
                />
                <p className="mt-2 text-sm text-accent">
                  *This field is immutable. It cannot be changed afterwards.
                </p>
              </div>

              <div className="clear-both h-6"></div>

              <div className="relative inline-block w-full rounded-md">
                <label
                  htmlFor="fund_icoAmt"
                  className="mb-2 block text-xl font-bold leading-6 text-[#484541]"
                >
                  ICO Token Amount
                </label>
                <input
                  type="text"
                  name="fund_icoAmt"
                  id="icoAmount"
                  className="inline-block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-base leading-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-accent"
                  placeholder="0.00000"
                />
                <p className="mt-2 text-sm text-accent">
                  *This field is immutable. It cannot be changed afterwards.
                </p>
              </div>

              <div className="clear-both h-10"></div>

              <div className="buttons mx-auto grid justify-items-center gap-5 pb-2 sm:grid-cols-2">
                <button
                  type={'submit'}
                  className="btn mx-auto w-full cursor-pointer rounded-bl-[35px] rounded-tr-[35px] bg-gradient-to-b from-accent to-[#6CCAB1] py-1 text-center text-3xl leading-tight text-[#FFF] hover:shadow-lg"
                >
                  Create Fundraiser
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
