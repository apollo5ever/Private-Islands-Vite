import * as React from 'react'
import {
 usePrepareContractWrite,
 useContractWrite,
 useWaitForTransaction,
 useContractRead,
 useContractReads
} from 'wagmi'
import { ethers } from 'ethers'
import { useGetSC } from '../useGetSC'
import getERC20s from './getERC20s'


export function SupportBountyByERC20({H,i}) {
    const [registeredTokens,setRegisteredTokens] = React.useState([])
    const [erc20,setERC20] = React.useState("0x0000000000000000000000000000000000000000")
    const [amount,setAmount] = React.useState(0)
    const privateislandscontract = {
        address:"0x086a2f48CbbD49C45B4197C745d8ACce508016db",
        abi: [{
            "inputs": [],
            "name": "a",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "b",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "c",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }]
    }
    //get a and b params
    const [fee,setFee] = React.useState(0.015)
    const [tokenList,setTokenList] = React.useState([])
    const [getSC] = useGetSC()
    const registrySCID="a6b36e8a23d153c5f09683183fc1059285476a1ce3f7f53952ab67b4fa34bcce"
    const [tokenSymbolToAddress, setTokenSymbolToAddress] = React.useState([{
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
    }]);
    //const {data, isError, isLoading} = getERC20s()

    

    const bridgeContract ={
        address:"0xb6C735bfF2B23f20e2603D4394FE3aF3e2B1EB69",
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "name": "registeredSymbol",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
    }

    
   

    React.useEffect(()=>{
        async function fetchData(){

        
        const registrySC = await getSC(registrySCID)
    
        var tokenSearch = new RegExp('p:DERO:')
        let tokenArray = Object.keys(registrySC.stringkeys)
        .filter(key=>tokenSearch.test(key))
        .map(x=>x.substring(8,))
        .map(y=> new Object(
            {
                ...bridgeContract,
                functionName:'registeredSymbol',
                args:[y]
        })
        )
       tokenArray.push({
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
    })
        setTokenSymbolToAddress(tokenArray)

        }
        fetchData()
    },[])


    


    
    
    const { paramdata, paramisError, paramisLoading } = useContractReads({
        contracts: tokenSymbolToAddress,
        onSettled(data) {
           /*  let result = tokenSymbolToAddress.slice(0, -3).filter((item, index) => data[index] !== '0x0000000000000000000000000000000000000000').map((item, index) => ({
                symbol: item.args[0],
                address: data[index],
              })); */
              let result = []
              for (let i = 0; i < Math.min(tokenSymbolToAddress.length - 3, data.length - 3); i++) {
                if (tokenSymbolToAddress[i].args[0] && tokenSymbolToAddress[i].args[0] !== "0x0000000000000000000000000000000000000000") {
                  result.push({ symbol: tokenSymbolToAddress[i].args[0], address: data[i] });
                }
              }
            setRegisteredTokens(result)
            console.log('READS RESULT', data)
        }
      })








      //get pieswap bridge fee
      const { bridgefeedata, bridgefeeisError, bridgefeeisLoading } = useContractRead({
        address: '0xb6C735bfF2B23f20e2603D4394FE3aF3e2B1EB69',
        abi: [{
            "inputs": [],
            "name": "bridgeFee",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }],
        functionName: 'bridgeFee',
        onSettled(data, error) {
            console.log('Settled', { data, error })
          }
      })
      

    

    

    
     


    console.log("support bounty ",H,i)
   // const value = ethers.utils.parseEther(fee)
 const { config } = usePrepareContractWrite({
 address: '0x086a2f48CbbD49C45B4197C745d8ACce508016db',
 abi: [
 {
 name: 'BuryTreasure',
 type: 'function',
 stateMutability: 'payable',
 inputs: [{
    "internalType": "string",
    "name": "H",
    "type": "string"
},
{
    "internalType": "uint256",
    "name": "i",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
},
{
    "internalType": "address",
    "name": "erc20addr",
    "type": "address"
}],
 outputs: [],
 },
 ],
 functionName: 'BuryTreasure',
 args: [H,parseInt(i),amount,erc20],
 overrides: {
    value:ethers.utils.parseEther('0.01')
 }
 })
 const { data, write } = useContractWrite(config)


 const { isLoading, isSuccess } = useWaitForTransaction({
 hash: data?.hash,
 })

 return (
 <div>
    
    <select id="erc20" onChange={(event) => setERC20(event.target.value)}>
  {registeredTokens.map((token) => (
    <option key={token.address} value={token.address}>
      {token.symbol}
    </option>
  ))}
</select>
<input id="amount" placeholder="amount" onChange={(event)=> setAmount(event.target.value)}/>

<button onClick={() => write?.()}>
 {isLoading ? 'Sending...' : 'Support'}
 </button>
    

 {isSuccess && (
 <div>
 Successfully minted your NFT!
 <div>
 <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
 </div>
 </div>
 )}
 </div>
 )
}
