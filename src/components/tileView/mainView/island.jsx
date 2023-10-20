import React, { useState, useContext } from 'react';
import { useTheme } from '@/components/hooks/useTheme.js';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { Button } from '@/components/common/Button.jsx';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import { LoginContext } from '../../../LoginContext';
import { Helpers } from '@/utils/helpers.js';
import { useSendTransaction } from '@/components/hooks/useSendTransaction';

export const Island = (data) => {
  const [editing, setEditing] = useState(false);
  const [state, setState] = useContext(LoginContext);
  const { proseClass } = useTheme();
  const [sendTransaction] = useSendTransaction();
  console.log('ISLAND DATA', data);

  const SetMetaData = async (event) => {
    event.preventDefault();
    const transfers = [
      {
        destination: state.randomAddress,
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
  };

  return (
    <div className="hero relative mt-3 min-h-screen items-start rounded-lg bg-secondary px-2 font-fell">
      <div className="hero-content">
        <FlexBoxRow justify="between" align="start" className="w-full">
          {!editing &&
          state.myIslands &&
          state.myIslands.length > 0 &&
          state.myIslands.map((x) => x.SCID).includes(data.island.SCID) ? (
            <small
              onClick={() => {
                setEditing(true);
              }}
            >
              edit
            </small>
          ) : (
            <></>
          )}
          {data && editing ? (
            <form onSubmit={SetMetaData}>
              <FlexBoxColumn className="mt-20">
                <FlexBoxRow gap={2}>
                  <input
                    placeholder="image url"
                    defaultValue={Helpers.getTileImage(data)}
                    id="Image"
                  />
                  <input
                    placeholder="tagline"
                    defaultValue={Helpers.getTileTagline(data)}
                    id="Tagline"
                  />
                </FlexBoxRow>
                <textarea
                  placeholder="description"
                  rows="44"
                  cols="80"
                  defaultValue={Helpers.getTileDescription(data)}
                  id="Description"
                />

                <Button size="small" type={'submit'}>
                  Submit
                </Button>
                <small
                  onClick={() => {
                    setEditing(false);
                  }}
                >
                  cancel
                </small>
              </FlexBoxColumn>
            </form>
          ) : (
            <></>
          )}
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
            <h1 className="pb-4 text-5xl font-bold">{data.island.title}</h1>
          </FlexBoxColumn>
          <div className={proseClass}>
            <h2>{data.island.Tagline}</h2>
            <h3>Social Coconut Score: {data.island.score}</h3>
            <p dangerouslySetInnerHTML={{ __html: data.island.Description }} />
          </div>
        </FlexBoxRow>
      </div>
    </div>
  );
};
