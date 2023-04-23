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


export function SupportBountyByERC20({H,i,amount,erc20addr}) {
    //get a and b params
    const [fee,setFee] = React.useState(0.015)
    const [tokenList,setTokenList] = React.useState([])
    const [getSC] = useGetSC()
    const registrySCID="a6b36e8a23d153c5f09683183fc1059285476a1ce3f7f53952ab67b4fa34bcce"
    const [tokenSymbolToAddress, setTokenSymbolToAddress] = React.useState(null);

    

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
        setTokenSymbolToAddress(tokenArray)

        }
        fetchData()
    },[])


    


    tokenSymbolToAddress? 
    console.log("dummy",[...tokenSymbolToAddress,{...privateislandscontract,functionName:'b'}] )&&
    console.log("TSTA",tokenSymbolToAddress) &&
    useContractReads({
        contracts: [...tokenSymbolToAddress,
           
           
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
            }
           
        ],
        onSettled(data) {
            
            console.log('Settled', data)
        }
      }) : console.log('okkk')








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
      

    

    

    
     


    console.log("support bounty ",H,i,amount,erc20addr,fee)
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
 args: [H,parseInt(i),amount,erc20addr],
 overrides: {
    value:fee
 }
 })
 const { data, write } = useContractWrite(config)

 const { isLoading, isSuccess } = useWaitForTransaction({
 hash: data?.hash,
 })

 return (
 <div>
    <form onSubmit={write}>
        

    </form>
 <button disabled={!write || isLoading} onClick={() => write()}>
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
