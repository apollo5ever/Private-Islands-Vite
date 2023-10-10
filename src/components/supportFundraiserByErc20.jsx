import * as React from 'react';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
  useContractReads,
  useSigner,
} from 'wagmi';
import { ethers } from 'ethers';
import { useGetSC } from './hooks/useGetSC';
import getERC20s from './getERC20s';

export function SupportFundraiserByERC20({ H }) {
  const [registeredTokens, setRegisteredTokens] = React.useState([]);
  const [erc20, setERC20] = React.useState({
    address: '0x0000000000000000000000000000000000000000',
    allowance: ethers.BigNumber.from('0'),
    decimals: ethers.BigNumber.from('18'),
  });
  const [amount, setAmount] = React.useState(ethers.BigNumber.from('0'));
  const privateislandsContractAddress =
    '0x8C3AfbFBF84A361B38e83966Be1D44AE2C4aC18F';
  const [userAddress, setUserAddress] = React.useState(
    '0x0000000000000000000000000000000000000000'
  );
  const [allowanceArray, setAllowanceArray] = React.useState([]);
  const [decimalsArray, setDecimalsArray] = React.useState([]);
  const [contractPrep, setContractPrep] = React.useState({
    address: privateislandsContractAddress,
    abi: [
      {
        name: 'SupportGoal',
        type: 'function',
        stateMutability: 'payable',
        inputs: [
          {
            internalType: 'string',
            name: 'H',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'erc20addr',
            type: 'address',
          },
        ],
        outputs: [],
      },
    ],
    functionName: 'SupportGoal',
    args: [H, amount, erc20.address],
    overrides: {
      value: ethers.utils.parseEther('0.04'),
    },
  });
  const privateislandscontract = {
    address: privateislandsContractAddress,
    abi: [
      {
        inputs: [],
        name: 'a',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'b',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'c',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
  };

  const { data: signer } = useSigner({
    onSettled(data, error) {
      setUserAddress(data._address);
      console.log('Settled', data._address, error);
    },
  });

  //get a and b params
  const [fee, setFee] = React.useState(0.015);
  const [tokenList, setTokenList] = React.useState([]);
  const [getSC] = useGetSC();
  const registrySCID =
    'a6b36e8a23d153c5f09683183fc1059285476a1ce3f7f53952ab67b4fa34bcce';
  const [tokenSymbolToAddress, setTokenSymbolToAddress] = React.useState([
    {
      ...privateislandscontract,
      functionName: 'a',
    },
    {
      ...privateislandscontract,
      functionName: 'b',
    },
    {
      ...privateislandscontract,
      functionName: 'c',
    },
  ]);
  //const {data, isError, isLoading} = getERC20s()

  const bridgeContract = {
    address: '0xb6C735bfF2B23f20e2603D4394FE3aF3e2B1EB69',
    abi: [
      {
        inputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        name: 'registeredSymbol',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
  };

  React.useEffect(() => {
    async function fetchData() {
      const registrySC = await getSC(registrySCID);

      var tokenSearch = new RegExp('p:DERO:');
      let tokenArray = Object.keys(registrySC.stringkeys)
        .filter((key) => tokenSearch.test(key))
        .map((x) => x.substring(8))
        .map(
          (y) =>
            new Object({
              ...bridgeContract,
              functionName: 'registeredSymbol',
              args: [y],
            })
        );
      let newAllowanceArray = [];
      let newDecimalsArray = [];
      for (let i = 0; i < registeredTokens.length; i++) {
        newAllowanceArray.push({
          address: registeredTokens[i].address,
          abi: [
            {
              constant: true,
              inputs: [
                {
                  name: '_owner',
                  type: 'address',
                },
                {
                  name: '_spender',
                  type: 'address',
                },
              ],
              name: 'allowance',
              outputs: [
                {
                  name: 'remaining',
                  type: 'uint256',
                },
              ],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
          ],
          functionName: 'allowance',
          args: [userAddress, privateislandsContractAddress],
        });
        newDecimalsArray.push({
          address: registeredTokens[i].address,
          abi: [
            {
              constant: true,
              inputs: [],
              name: 'decimals',
              outputs: [
                {
                  name: '',
                  type: 'uint256',
                },
              ],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
          ],
          functionName: 'decimals',
        });
      }
      setDecimalsArray(newDecimalsArray);
      setAllowanceArray(newAllowanceArray);
      /*         tokenArray.push({
        ...privateislandscontract,
        functionName: 'a',
    },
    {
        ...privateislandscontract,
        functionName: 'b',
    },
    {
        ...privateislandscontract,
        functionName: 'c',
    })  */
      setTokenSymbolToAddress(tokenArray);
    }
    fetchData();
  }, [registeredTokens, userAddress]);

  const { paramdata, paramisError, paramisLoading } = useContractReads({
    contracts: tokenSymbolToAddress
      .concat(allowanceArray)
      .concat(decimalsArray),
    onSettled(data) {
      /*  let result = tokenSymbolToAddress.slice(0, -3).filter((item, index) => data[index] !== '0x0000000000000000000000000000000000000000').map((item, index) => ({
                symbol: item.args[0],
                address: data[index],
              })); */
      let result = [];
      for (
        let i = 0;
        i < Math.min(tokenSymbolToAddress.length, data.length);
        i++
      ) {
        if (
          tokenSymbolToAddress[i].args[0] &&
          data[i] !== '0x0000000000000000000000000000000000000000'
        ) {
          result.push({
            symbol: tokenSymbolToAddress[i].args[0],
            address: data[i],
          });
        }
      }
      if (data.length >= tokenSymbolToAddress.length) {
        for (let i = 0; i < result.length; i++) {
          result[i].allowance =
            data[
              result.length + i + (tokenSymbolToAddress.length - result.length)
            ];
          result[i].decimals =
            data[
              2 * result.length +
                i +
                (tokenSymbolToAddress.length - result.length)
            ];
        }
      }
      setRegisteredTokens(result);

      console.log(
        'READS RESULT',
        data,
        result,
        tokenSymbolToAddress,
        allowanceArray
      );
    },
  });

  //get pieswap bridge fee
  const { bridgefeedata, bridgefeeisError, bridgefeeisLoading } =
    useContractRead({
      address: '0xb6C735bfF2B23f20e2603D4394FE3aF3e2B1EB69',
      abi: [
        {
          inputs: [],
          name: 'bridgeFee',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      functionName: 'bridgeFee',
      onSettled(data, error) {
        console.log('Settled', { data, error });
      },
    });

  console.log('support bounty ', H);
  // const value = ethers.utils.parseEther(fee)
  const { config } = usePrepareContractWrite(contractPrep);
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleChangeAmount = (event) => {
    console.log('decimals', erc20.decimals.toNumber());
    let newAmount = ethers.utils.parseUnits(
      event.target.value,
      erc20.decimals.toNumber()
    );
    setAmount(newAmount);
    if (erc20.allowance.lt(newAmount)) {
      console.log('newAmount', newAmount);
      //set to approve else set to support
      setContractPrep({
        address: erc20.address,
        abi: [
          {
            constant: false,
            inputs: [
              {
                name: '_spender',
                type: 'address',
              },
              {
                name: '_value',
                type: 'uint256',
              },
            ],
            name: 'approve',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        functionName: 'approve',
        args: [privateislandsContractAddress, newAmount],
      });
    } else {
      setContractPrep({
        address: privateislandsContractAddress,
        abi: [
          {
            name: 'SupportGoal',
            type: 'function',
            stateMutability: 'payable',
            inputs: [
              {
                internalType: 'string',
                name: 'H',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'erc20addr',
                type: 'address',
              },
            ],
            outputs: [],
          },
        ],
        functionName: 'SupportGoal',
        args: [H, newAmount, erc20.address],
        overrides: {
          value: ethers.utils.parseEther('0.04'),
        },
      });
    }
  };

  const handleChangeToken = (event) => {
    console.log('OLD AMOUNT', amount);
    let token = JSON.parse(event.target.value);
    token.allowance = ethers.BigNumber.from(token.allowance.hex);
    token.decimals = ethers.BigNumber.from(token.decimals.hex);
    let newAmount = amount
      .mul(ethers.BigNumber.from(10).pow(token.decimals))
      .div(ethers.BigNumber.from(10).pow(erc20.decimals));
    console.log('token change decimals: ', amount, newAmount);
    console.log('token', token);
    setAmount(newAmount);
    setERC20(token);
    if (token.allowance.lt(newAmount)) {
      //set to approve else set to support
      setContractPrep({
        address: token.address,
        abi: [
          {
            constant: false,
            inputs: [
              {
                name: '_spender',
                type: 'address',
              },
              {
                name: '_value',
                type: 'uint256',
              },
            ],
            name: 'approve',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        functionName: 'approve',
        args: [privateislandsContractAddress, newAmount],
      });
    } else {
      setContractPrep({
        address: privateislandsContractAddress,
        abi: [
          {
            name: 'SupportGoal',
            type: 'function',
            stateMutability: 'payable',
            inputs: [
              {
                internalType: 'string',
                name: 'H',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'erc20addr',
                type: 'address',
              },
            ],
            outputs: [],
          },
        ],
        functionName: 'SupportGoal',
        args: [H, newAmount, token.address],
        overrides: {
          value: ethers.utils.parseEther('0.04'),
        },
      });
    }
  };

  return (
    <div>
      {userAddress != '0x0000000000000000000000000000000000000000' ? (
        <div className="ethBountyBox">
          <h3>Support by ERC-20</h3>

          <select id="erc20" onChange={handleChangeToken}>
            {registeredTokens.map((token) => (
              <option key={token.address} value={JSON.stringify(token)}>
                {token.symbol}
              </option>
            ))}
          </select>
          <input
            id="amount"
            type="number"
            min="0.0001"
            placeholder="amount"
            step="0.0001"
            onChange={handleChangeAmount}
          />

          {erc20.allowance.gte(amount) ? (
            <button onClick={() => write?.()}>
              {isLoading ? 'Sending...' : 'Support'}
            </button>
          ) : (
            <button onClick={() => write?.()}>Approve</button>
          )}

          {isSuccess && (
            <div>
              Success!
              <div>
                <a href={`https://etherscan.io/tx/${data?.hash}`}>
                  View transaction on etherscan
                </a>
              </div>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
