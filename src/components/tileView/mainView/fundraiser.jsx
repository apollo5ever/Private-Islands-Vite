import { Helpers } from '@/utils/helpers.js';
import { useTheme } from '@/components/hooks/useTheme.js';
import { TileContext } from '@/components/providers/TileContext.jsx';
import { useCallback, useContext, useEffect, useState } from 'react';
import { LoginContext } from '@/LoginContext.jsx';
import { useSendTransaction } from '@/components/hooks/useSendTransaction';
import { Button } from '@/components/common/Button.jsx';
import { DetailCard } from '@/components/smokeSignal/DetailCard.jsx';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';

export const Fundraiser = ({ fundData }) => {
  const { proseClass } = useTheme();
  const { gotoIslandTile } = useContext(TileContext);
  console.log('FUNDDATA', fundData);

  const [state, setState] = useContext(LoginContext);
  const [editing, setEditing] = useState(false);
  const [sendTransaction] = useSendTransaction();

  const withdraw = useCallback(async (event) => {
    event.preventDefault();
    var hash = fundData.SCID;

    const data = new Object({
      scid: state.scid_fundraisers,
      ringsize: 2,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'WFF',
        },
        {
          name: 'H',
          datatype: 'S',
          value: hash,
        },
        {
          name: 'i',
          datatype: 'U',
          value: parseInt(fundData.Index),
        },
      ],
    });

    await sendTransaction(data);
  });

  const supportGoal = useCallback(async (event) => {
    event.preventDefault();
    let HashAndIndex = fundData.SCID + fundData.Index;
    let refundable = 0;
    if (event.target.refundable.checked) {
      refundable = 1;
    }

    const data = new Object({
      scid: state.scid_fundraisers,
      ringsize: 2,
      transfers: [
        {
          burn: parseInt(event.target.amount.value * 100000),
          destination: state.randomAddress,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'SG',
        },
        {
          name: 'H',
          datatype: 'S',
          value: HashAndIndex,
        },
        {
          name: 'R',
          datatype: 'U',
          value: refundable,
        },
      ],
    });

    sendTransaction(data);
  });

  if (fundData) {
    let deadline = new Date(fundData.Expiry * 1000);
    var deadlinestring =
      (deadline.getMonth() + 1).toString() +
      '/' +
      deadline.getDate().toString() +
      '/' +
      deadline.getUTCFullYear().toString();
  }

  const SetMetaData = useCallback(async (event) => {
    event.preventDefault();
    const transfers = [
      {
        destination: state.randomAddress,
        scid: fundData.SCID,
        burn: 1,
      },
    ];

    let fee;
    if (event.target.Description.value.length > 360) fee = 10000;

    const txData = new Object({
      scid: state.scid_fundraisers,
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
          name: 'H',
          datatype: 'S',
          value: fundData.SCID,
        },
        {
          name: 'i',
          datatype: 'U',
          value: parseInt(fundData.Index),
        },
        {
          name: 'Name',
          datatype: 'S',
          value: event.target.Name.value,
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
          name: 'Description',
          datatype: 'S',
          value: event.target.Description.value,
        },
      ],
    });
    sendTransaction(txData);
  });

  return (
    <FlexBoxRow className="align-center card card-side my-3 whitespace-normal bg-secondary shadow-xl">
      <div>
        {!editing &&
        state.myIslands &&
        state.myIslands.length > 0 &&
        state.myIslands.map((x) => x.SCID).includes(fundData.SCID) ? (
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
        {fundData && editing ? (
          <form onSubmit={SetMetaData}>
            <FlexBoxColumn className="mt-20">
              <FlexBoxRow gap={2}>
                <input
                  placeholder="name"
                  defaultValue={Helpers.getTileName(fundData)}
                  id="Name"
                />
                <input
                  placeholder="image url"
                  defaultValue={Helpers.getTileImage(fundData)}
                  id="Image"
                />
                <input
                  placeholder="tagline"
                  defaultValue={Helpers.getTileTagline(fundData)}
                  id="Tagline"
                />
              </FlexBoxRow>
              <textarea
                placeholder="description"
                rows="44"
                cols="80"
                defaultValue={Helpers.getTileDescription(fundData)}
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
        {fundData ? (
          <>
            <div className="card-body break-words font-fell">
              <FlexBoxColumn align="start" className="">
                <figure className="mr-4 min-w-[200px] max-w-[300px] content-center rounded-lg">
                  <img
                    src={Helpers.getTileImage(fundData)}
                    alt={Helpers.getTileName(fundData)}
                  />
                </figure>

                <FlexBoxColumn className="" align="start">
                  <h1 className="card-title">
                    {Helpers.getTileName(fundData)}
                  </h1>
                  <h3
                    className="cursor-pointer font-bold"
                    onClick={() =>
                      gotoIslandTile(Helpers.getInitiatorScid(fundData))
                    }
                  >
                    Initiated by {Helpers.getInitiatorName(fundData)}
                  </h3>
                  <h1 className=" font-bold" style={{ fontSize: '2.2rem' }}>
                    Raised: {fundData.Raised / 100000}/{fundData.Goal / 100000}{' '}
                    DERO
                  </h1>
                  <div className={`${proseClass} text-zinc-900`}>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: Helpers.getTileDescription(fundData),
                      }}
                    />{' '}
                  </div>

                  {fundData.Status === 0 ? (
                    <FlexBoxColumn align="end" className="mb-2">
                      <form onSubmit={supportGoal}>
                        <FlexBoxColumn align="end" className="mb-2">
                          <input
                            id="amount"
                            className="input-bordered input w-full max-w-xs"
                            placeholder="Dero amount to donate"
                            type="text"
                          />
                          <div>
                            <label htmlFor="refundable">Refundable?</label>{' '}
                            &nbsp;
                            <input
                              id="refundable"
                              type="checkbox"
                              className="mr-2"
                            />
                          </div>
                          <Button size="sm" type={'submit'}>
                            Support
                          </Button>
                        </FlexBoxColumn>
                      </form>
                      {fundData.Raised >= fundData.Goal ? (
                        <form onSubmit={withdraw}>
                          <Button size="sm" type={'submit'}>
                            Withdraw
                          </Button>
                        </form>
                      ) : (
                        ''
                      )}
                    </FlexBoxColumn>
                  ) : fundData.Status === 1 ? (
                    <>
                      <p>
                        This Smoke Signal has met its fundraiser goal! If you
                        are the owner, you can withdraw the funds to the fundee
                        now.
                      </p>
                      <form onSubmit={withdraw}>
                        <Button size="sm" type={'submit'}>
                          Withdraw
                        </Button>
                      </form>
                    </>
                  ) : fundData.Status === 2 ? (
                    <>
                      <p>
                        This Smoke Signal failed to meet its goal. If you made a
                        refundable donation, you can withdraw those funds now.
                      </p>
                      <form onSubmit={withdraw}>
                        <Button size="sm" type={'submit'}>
                          Withdraw
                        </Button>
                      </form>
                    </>
                  ) : (
                    ''
                  )}
                </FlexBoxColumn>
              </FlexBoxColumn>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </FlexBoxRow>
  );
};
