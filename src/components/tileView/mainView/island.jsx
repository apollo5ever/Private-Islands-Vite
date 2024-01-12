import React, { useState, useContext } from 'react';
import { useTheme } from '@/components/hooks/useTheme.js';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { Button } from '@/components/common/Button.jsx';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import { LoginContext } from '@/LoginContext';
import { Helpers } from '@/utils/helpers.js';
import { useSendTransaction } from '@/components/hooks/useSendTransaction';
import { TileContext } from '@/components/providers/TileContext.jsx';
import { useGetRandomAddress } from '../../hooks/useGetRandomAddress';

export const Island = (data) => {
  const [editing, setEditing] = useState(false);
  const [state, setState] = useContext(LoginContext);
  const { myIslands } = useContext(TileContext);
  const { proseClass } = useTheme();
  const [sendTransaction] = useSendTransaction();
  const [getRandomAddress] = useGetRandomAddress();

  const toggleEdit = () => {
    setEditing((prevEditing) => !prevEditing);
  };
  const SetMetaData = async (event) => {
    event.preventDefault();
    const randomAddress = getRandomAddress();
    const transfers = [
      {
        destination: randomAddress,
        scid: data.island.SCID,
        burn: 1,
      },
    ];

    let fee;
    if (event.target.Description.value.length > 360) fee = 10000;

    const txData = new Object({
      scid: data.island.SCID,
      ringsize: 2,
      fees: fee,
      transfers: transfers,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'SetMetadata',
        },

        {
          name: 'Image',
          datatype: 'S',
          value: event.target.Image.value,
        },
        {
          name: 'Tagline',
          datatype: 'S',
          value: event.target.Tagline.value,
        },

        {
          name: 'Bio',
          datatype: 'S',
          value: event.target.Description.value,
        },
      ],
    });
    sendTransaction(txData);
    toggleEdit();
  };

  return (
    <div className="hero relative mt-3 min-h-screen items-start rounded-lg bg-secondary px-2 font-fell">
      <div className="hero-content">
        <FlexBoxColumn align="start">
          {!editing &&
          myIslands &&
          myIslands.length > 0 &&
          myIslands.map((x) => x.SCID).includes(data.island.SCID) ? (
            <Button size="small" handleClick={toggleEdit} className="mb-4">
              Edit My Island
            </Button>
          ) : (
            <></>
          )}
          <FlexBoxRow justify="between" align="start" className="w-full">
            {data && editing ? (
              <form onSubmit={SetMetaData}>
                <FlexBoxColumn className="mt-20">
                  <FlexBoxRow gap={2}>
                    <input
                      className="input input-bordered w-full max-w-xs"
                      placeholder="Image URL: http://..."
                      defaultValue={Helpers.getTileImage(data.island)}
                      id="Image"
                    />
                    <input
                      className="input input-bordered w-full max-w-xs"
                      placeholder="Tag Line"
                      defaultValue={Helpers.getTileTagline(data.island)}
                      id="Tagline"
                    />
                  </FlexBoxRow>
                  <textarea
                    className="my-2"
                    placeholder="Description (Can embed HTML)"
                    rows="24"
                    cols="80"
                    defaultValue={Helpers.getTileDescription(data.island)}
                    id="Description"
                  />
                  <FlexBoxRow>
                    <Button size="small" type={'submit'} className="mr-3">
                      Submit
                    </Button>
                    <Button size="small" handleClick={toggleEdit}>
                      Cancel
                    </Button>
                  </FlexBoxRow>
                </FlexBoxColumn>
              </form>
            ) : (
              <>
                <FlexBoxColumn className="mr-3">
                  {data.island.Image ? (
                    <figure className="max-w-[350px] cursor-pointer pb-4">
                      <img
                        src={data.island.Image}
                        alt="title"
                        className="rounded-lg"
                      />
                    </figure>
                  ) : (
                    ''
                  )}
                  <h1 className="pb-4 text-5xl font-bold">
                    {data.island.title}
                  </h1>
                </FlexBoxColumn>
                <div className={proseClass}>
                  <h2>{data.island.Tagline}</h2>
                  <h3>Social Coconut Score: {data.island.score}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data.island.Description,
                    }}
                  />
                </div>
              </>
            )}
          </FlexBoxRow>
        </FlexBoxColumn>
      </div>
    </div>
  );
};
