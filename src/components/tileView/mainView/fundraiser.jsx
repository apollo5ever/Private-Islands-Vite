import { Helpers } from '@/utils/helpers.js';
import { useTheme } from '@/components/hooks/useTheme.js';
import { TileContext } from '@/components/providers/TileContext.jsx';
import { useCallback, useContext, useEffect, useState } from 'react';
import { LoginContext } from '@/LoginContext.jsx';
import { useSendTransaction } from '@/useSendTransaction';
import { Button } from '@/components/common/Button.jsx';
import { DetailCard } from '@/components/smokeSignal/DetailCard.jsx';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';

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
    let deadline = new Date(fundData.Deadline * 1000);
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

    setSearchParams({ status: 'success' });
  });

  // TODO MTS fundData.SCID was params.island -- maybe it should be Initiator.SCID?
  return (
    <div className="card card-side my-3 flex flex-col items-end whitespace-normal bg-secondary shadow-xl md:flex-row">
      <div className="mx-10 mt-4">
        {!editing &&
        state.myIslands &&
        state.myIslands.length > 0 &&
        fundData.SCID === state.myIslands[state.active].name ? (
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
            <small
              onClick={() => {
                setEditing(false);
              }}
            >
              cancel
            </small>
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
            <textarea
              placeholder="description"
              rows="44"
              cols="80"
              defaultValue={Helpers.getTileDescription(fundData)}
              id="Description"
            />
            <button type={'submit'}>Submit</button>
          </form>
        ) : (
          <></>
        )}
        {fundData ? (
          <FlexBoxColumn align="end" className="mb-2">
            <DetailCard signal={fundData} deadline={deadlinestring} />
            <div className="">
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
                        <label htmlFor="refundable">Refundable?</label> &nbsp;
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
                    This Smoke Signal has met its fundraiser goal! If you are
                    the owner, you can withdraw the funds to the fundee now.
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
            </div>
          </FlexBoxColumn>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
