import React from "react";
import { useContractReads } from "wagmi";

export default function getERC20s(){
   
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
    
      const contracts = [
           
           
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
       
    ]
    const contracts2 = [
        {
            ...bridgeContract,
            functionName: 'registeredSymbol',
            args: ['DAI']
        },
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
    ]
    
    console.log("contracts",contracts)
   
    const { paramdata, paramisError, paramisLoading } = useContractReads({
        contracts: [
            
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
      })

      return {
        data: paramdata,
        isError: paramisError,
        isLoading: paramisLoading,
      }


}