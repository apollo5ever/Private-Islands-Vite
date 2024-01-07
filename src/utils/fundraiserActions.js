export const withdraw = async (tile, state, sendTransaction, event) => {
  event.preventDefault();
  let hash = tile.SCID;

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
        value: parseInt(tile.Index),
      },
    ],
  });

  await sendTransaction(data);
};

export const oaoWithdraw = async (tile, state, sendTransaction, event) => {
  event.preventDefault();

  const data = new Object({
    scid: state.scid_fundraisers,
    ringsize: 2,
    transfers: [
      {
        scid: tile.WithdrawlToken,
        burn: parseInt(event.target.amount.value),
      },
    ],
    sc_rpc: [
      {
        name: 'entrypoint',
        datatype: 'S',
        value: 'OAOWithdrawFromFundraiser',
      },
      {
        name: 'H',
        datatype: 'S',
        value: (tile.SCID + tile.Index).toString(),
      },
      {
        name: 'amount',
        datatype: 'U',
        value: 0,
      },
    ],
  });

  await sendTransaction(data);
};

export const getTokens = async (tile, state, sendTransaction, event) => {
  event.preventDefault();

  const data = new Object({
    scid: state.scid_fundraisers,
    ringsize: 2,
    sc_rpc: [
      {
        name: 'entrypoint',
        datatype: 'S',
        value: 'GetTokens',
      },
      {
        name: 'H',
        datatype: 'S',
        value: (tile.SCID + tile.Index).toString(),
      },
    ],
  });

  await sendTransaction(data);
};

export const supportGoal = async (
  tile,
  state,
  sendTransaction,
  getRandomAddress,
  event
) => {
  event.preventDefault();
  const randomAddress = await getRandomAddress();
  let HashAndIndex = tile.SCID + tile.Index;
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
        destination: randomAddress,
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
        name: 'Refundable',
        datatype: 'U',
        value: refundable,
      },
    ],
  });

  await sendTransaction(data);
};

export const setMetaData = async (
  tile,
  state,
  sendTransaction,
  getRandomAddress,
  event
) => {
  event.preventDefault();
  const randomAddress = await getRandomAddress();
  const transfers = [
    {
      destination: randomAddress,
      scid: tile.SCID,
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
        value: tile.SCID,
      },
      {
        name: 'i',
        datatype: 'U',
        value: parseInt(tile.Index),
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

  await sendTransaction(txData);
};
