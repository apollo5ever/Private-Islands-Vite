import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { LoginContext } from '../LoginContext';
import {useSearchParams,NavLink} from 'react-router-dom'
import to from 'await-to-js';
import TreasureCard from './treasureCard';
import FundCard from './fundCard';
import Subscribe from './subscribe';
import TrustIsland from './trustIsland';
import hex2a from './hex2a';
import getMIB from './getMIB';
import GI from './getIslands'
import getBounties from './getBounties';
import getFundraisers from './getFundraisers';
import { useSendTransaction } from '../useSendTransaction';




export default function Test(){
  const [sendTransaction] = useSendTransaction()
  const [selection,setSelection] = useState(1)
  const [text,setText] = useState("")
  const [history,setHistory] = useState([])
  const [index,setIndex] = useState(0)

  const imageSet1 = ["this","lovey","dovey","ghetto","elvis","visas"]
  const imageSet2 = ["that","rabbit","bunny","party","disco","fool"]
  

  const select =(n)=>{
    setSelection(n)
  }

  const confirm =()=>{
    setText(`You submitted ${selection}`)
    setHistory([...history,selection])
    setIndex(index+1)

  }
  
  const tester = ()=>{
    const data = new Object({
      "scid":"",
      "ringsize":2,
      "transfers":[],
      "sc_rpc":[{
        "name": "entrypoint",
        "datatype": "S",
        "value": "test"
      } 
      ]
    })
    console.log("tryna test here")
   sendTransaction(data)
  }

    return(
        <div className="function">
          <div className="profile">
<h1>Which Face is Human?</h1>

<div onClick={()=>select(1)}className="function">
{selection==1?

<b>{imageSet1[index]}</b>:imageSet1[index]}
</div>
<div onClick={()=>select(2)}className="function">
{selection==2?

<b>{imageSet2[index]}</b>:imageSet2[index]}
  </div>
  <button onClick={()=>confirm()}>Submit</button>
          
        {text} 
        <div>
          {history}</div>  
          </div>
          
        </div>
    )
}