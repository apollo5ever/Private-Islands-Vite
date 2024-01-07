export const claimTreasure = async (
  tile,
  state,
  getAddress,
  sendTransaction,
  event
) => {
  event.preventDefault();
  const userAddress = await getAddress();

  const data = new Object({
    ringsize: 16,
    transfers: [
      {
        destination: tile.judgeAddress,
        amount: 1,

        payload_rpc: [
          {
            name: 'C',
            datatype: 'S',
            value: 'Treasure Claim Submitted by: ' + userAddress,
          },
          {
            name: 'POC',
            datatype: 'S',
            value: event.target.proof.value,
          },
        ],
      },
    ],
  });

  console.log('YO NIG - data = ', data);

  await sendTransaction(data);
};

export const addTreasure = async (
  tile,
  state,
  getRandomAddress,
  sendTransaction,
  event
) => {
  event.preventDefault();
  const randomAddress = await getRandomAddress();

  const data = new Object({
    scid: state.scid_bounties,
    ringsize: 2,
    transfers: [
      {
        destination: randomAddress,
        burn: parseInt(event.target.amount.value * 100000),
      },
    ],
    sc_rpc: [
      {
        name: 'entrypoint',
        datatype: 'S',
        value: 'BT',
      },

      {
        name: 'H',
        datatype: 'S',
        value: state.islandSCID,
      },
      {
        name: 'i',
        datatype: 'U',
        value: parseInt(tile.index),
      },
      {
        name: 'J',
        datatype: 'S',
        value: 'J',
      },
      {
        name: 'X',
        datatype: 'S',
        value: 'X',
      },
      {
        name: 'E',
        datatype: 'U',
        value: 0,
      },
      {
        name: 'name',
        datatype: 'S',
        value: '',
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
    scid: state.scid_bounties,
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
        value: islandSCID,
      },
      {
        name: 'i',
        datatype: 'U',
        value: parseInt(index),
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

  // TODO MTS - this was in orig code -- need to handle this somewhere
  // setSearchParams({ status: 'success' });
};
