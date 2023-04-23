import React from "react";
import { useContractReads } from "wagmi";

export default function getERC20s(symbols,privateislandscontract){
    const { paramdata, paramisError, paramisLoading } = useContractReads({
        contracts: [...symbols,
           
           
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