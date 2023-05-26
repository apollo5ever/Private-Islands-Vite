
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSendTransaction } from '../useSendTransaction'
import { useGetSC } from '../useGetSC'
import { LoginContext } from '../LoginContext';
import Success from './success'
import {Button} from 'react-daisyui'
import hex2a from './hex2a';
import { useGetBalance } from '../useGetBalance';


export default function ClaimIsland() {

  let [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = React.useContext(LoginContext);
    const [addition,setAddition] = React.useState("")
    const [custom,setCustom]=React.useState(false)
    const [judges,setJudges]=React.useState([])
    const [execs,setExecs] = React.useState([])
    const [error,setError] = React.useState("")
    const [sendTransaction] = useSendTransaction()
    const [getSC] = useGetSC()
    const [getBalance] = useGetBalance()
    const [islandSCID,setIslandSCID] = React.useState(searchParams.get("scid"))
    const [islandName,setIslandName] = React.useState(searchParams.get("name"))
    const [islandInWallet,setIslandInWallet] = React.useState(0)

  const Mint = React.useCallback(async (event) => {
    event.preventDefault();
    //check registry to see if name is taken
      const res0 = await getSC(state.scid_registry)
      var search= `S::PRIVATE-ISLANDS::${event.target.island.value}`
      var island_scid = res0.stringkeys[search]
       //----------Errors--------------------------
    if(island_scid){
      setError("this island is taken")
      return
    }

    //-----------------MINT----------------------------------
    const mintData = new Object(
      {
        "ringsize":2,
        "sc_rpc":[
          {
            "name":"entrypoint",
            "datatype":"S",
            "value":"InitializePrivate"
          },
          {
            "name":"name",
            "datatype":"S",
            "value":event.target.island.value
          }
        ],
        "sc":"RnVuY3Rpb24gSW5pdGlhbGl6ZVByaXZhdGUobmFtZSBTdHJpbmcpIFVpbnQ2NAoxMCBJRiBFWElTVFMoIm5hbWUiKSBUSEVOIEdPVE8gMTAwCjIwIFNUT1JFKCJuYW1lIixuYW1lKQozMCBTRU5EX0FTU0VUX1RPX0FERFJFU1MoU0lHTkVSKCksMSxTQ0lEKCkpCjQwIFNUT1JFKCJvd25lciIsIiIpCjk5IFJFVFVSTiAwCjEwMCBSRVRVUk4gMQpFbmQgRnVuY3Rpb24KCkZ1bmN0aW9uIFNldEltYWdlKHVybCBTdHJpbmcpIFVpbnQ2NAoxMCBJRiBBRERSRVNTX1NUUklORyhTSUdORVIoKSkgIT0gTE9BRCgib3duZXIiKSAmJiBBU1NFVFZBTFVFKFNDSUQoKSkgIT0gMSBUSEVOIEdPVE8gMTAwCjIwIFNUT1JFKCJpbWFnZSIsdXJsKQozMCBTRU5EX0FTU0VUX1RPX0FERFJFU1MoU0lHTkVSKCksQVNTRVRWQUxVRShTQ0lEKCkpLFNDSUQoKSkKOTkgUkVUVVJOIDAKMTAwIFJFVFVSTiAxCkVuZCBGdW5jdGlvbgoKRnVuY3Rpb24gU2V0TWV0YWRhdGEobWV0YWRhdGEgU3RyaW5nLCBmb3JtYXQgU3RyaW5nKSBVaW50NjQKMTAgSUYgQUREUkVTU19TVFJJTkcoU0lHTkVSKCkpICE9IExPQUQoIm93bmVyIikgJiYgQVNTRVRWQUxVRShTQ0lEKCkpICE9IDEgVEhFTiBHT1RPIDEwMAoyMCBTVE9SRSgibWV0YWRhdGEiLG1ldGFkYXRhKQozMCBTVE9SRSgibWV0YWRhdGFGb3JtYXQiLGZvcm1hdCkKNDAgU0VORF9BU1NFVF9UT19BRERSRVNTKFNJR05FUigpLEFTU0VUVkFMVUUoU0NJRCgpKSxTQ0lEKCkpCjk5IFJFVFVSTiAwCjEwMCBSRVRVUk4gMQpFbmQgRnVuY3Rpb24KCkZ1bmN0aW9uIERpc3BsYXkoKSBVaW50NjQKMTAgSUYgQVNTRVRWQUxVRShTQ0lEKCkpICE9IDEgVEhFTiBHT1RPIDEwMAoyMCBTVE9SRSgib3duZXIiLEFERFJFU1NfU1RSSU5HKFNJR05FUigpKSkKOTkgUkVUVVJOIDAKMTAwIFJFVFVSTiAxCkVuZCBGdW5jdGlvbgoKRnVuY3Rpb24gUmV0cmlldmUoKSBVaW50NjQKMTAgSUYgU0lHTkVSKCkgIT0gQUREUkVTU19SQVcoTE9BRCgib3duZXIiKSkgVEhFTiBHT1RPIDEwMAoyMCBTRU5EX0FTU0VUX1RPX0FERFJFU1MoU0lHTkVSKCksMSxTQ0lEKCkpCjMwIFNUT1JFKCJvd25lciIsIiIpCjk5IFJFVFVSTiAwCjEwMCBSRVRVUk4gMQpFbmQgRnVuY3Rpb24="
      }
     )

   
    

    let newIslandSCID = await sendTransaction(mintData)
    setIslandSCID(newIslandSCID)
    setSearchParams({"status":"minted","scid":newIslandSCID,"name":event.target.island.value})

    setIslandName(event.target.island.value)



    //-----------------Basic Island------------------------------
    

   


    /*  .then(new async function getIslandBalance(newIslandSCID){
      let balance = await getBalance(newIslandSCID)
      if(balance==0){
        setTimeout(getIslandBalance(newIslandSCID),1000)
      }else return(newIslandSCID)
      })
      .then((newIslandSCID)=>{
        const registrationData = {
         "scid": state.scid_registry,
         "ringsize": 2,
         "transfers": [
           {
             "destination": state.randomAddress,
             "burn": 10000
           },
           {
             "destination": state.randomAddress,
             "burn": 1,
             "scid": newIslandSCID
           }
         ],
         "sc_rpc": [
           {
             "name": "entrypoint",
             "datatype": "S",
             "value": "RegisterAsset"
           },
           {
             "name": "name",
             "datatype": "S",
             "value": event.target.island.value
           },
           {
             "name": "collection",
             "datatype": "S",
             "value": "PRIVATE-ISLANDS"
           },
           {
             "name": "scid",
             "datatype": "S",
             "value": newIslandSCID
           }
         ]
       };
   
       return sendTransaction(registrationData);
      }) */
       
     
    

   



  })

  const checkWalletForIsland = async ()=>{
    if(!islandSCID) return
    console.log("checkwalletforisland")
    const islandBalance = await getBalance(islandSCID)

    setIslandInWallet(islandBalance)
    if(islandBalance==1){
      setSearchParams({"status":"inWallet","name":islandName,"scid":islandSCID})
    }
    
  }

  const registerIsland = async ()=>{
    
    //check registry to see if name is taken
      const res0 = await getSC(state.scid_registry)
      var search= `S::PRIVATE-ISLANDS::${islandName}`
      var island_scid = res0.stringkeys[search]
       //----------Errors--------------------------
    if(island_scid){
      setError("this island is taken")
      return
    }

    const registrationData = {
      "scid": state.scid_registry,
      "ringsize": 2,
      "transfers": [
        {
          "destination": state.randomAddress,
          "burn": 10000
        },
        {
          "destination": state.randomAddress,
          "burn": 1,
          "scid": islandSCID
        }
      ],
      "sc_rpc": [
        {
          "name": "entrypoint",
          "datatype": "S",
          "value": "RegisterAsset"
        },
        {
          "name": "name",
          "datatype": "S",
          "value": islandName
        },
        {
          "name": "collection",
          "datatype": "S",
          "value": "PRIVATE-ISLANDS"
        },
        {
          "name": "scid",
          "datatype": "S",
          "value": islandSCID
        }
      ]
    };

   sendTransaction(registrationData);
   setSearchParams({"status":"registered","name":islandName,"scid":islandSCID})

     




  }
  const updateMetaData = async (event) =>{
    event.preventDefault()
     
    var M = "M"
    var islandMeta = {
      image:event.target.image.value,
      tagline:event.target.tagline.value,
      bio:event.target.bio.value
    }

  var islandData = JSON.stringify({
      "pinataOptions": {
        "cidVersion": 0
      },
      "pinataMetadata": {
        "name": islandName,
        "keyvalues": {
        }
      },
      "pinataContent": islandMeta
    });

    const islandPinata = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json','authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNjc5NzU5MS02OGUxLTQyNzAtYjZhMy01NjBjN2Y3M2IwYTMiLCJlbWFpbCI6ImJhY2tlbmRAYW1icm9zaWEubW9uZXkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDgzZTJkMGQ2Yzg2YTBhNjlkY2YiLCJzY29wZWRLZXlTZWNyZXQiOiJlN2VlMTE4MWM2YTBlN2FmNjQ0YmUzZmEyYmU1ZWY5ZWFmMmNmMmYyYzc0NWQzZGIxNDdiMThhOTU5NWMwZDNlIiwiaWF0IjoxNjYxMTk1NjUxfQ.9Pz2W_h7zCiYyuRuVySKcDwA2fl_Jbm6QDulihAIpmo`
     },
      
            body:  islandData
    });

    
    const addIsland= await state.ipfs.add(JSON.stringify(islandMeta).toString())
     M =addIsland.cid.toString()

     const metaDataData = {
      "scid": islandSCID,
      "ringsize": 2,
      "transfers": [
        {
          "destination": state.randomAddress,
          "burn": 1,
          "scid": islandSCID
        }
      ],
      "sc_rpc": [
        {
          "name": "entrypoint",
          "datatype": "S",
          "value": "SetMetadata"
        },
        {
          "name": "metadata",
          "datatype": "S",
          "value": M
        },
        {
          "name": "format",
          "datatype": "S",
          "value": "ipfs"
        }
      ]
    };
    
    sendTransaction(metaDataData)
    setSearchParams({"status":"success","name":islandName,"scid":islandSCID})


  }


  const selectAddition = e=>{
    e.preventDefault();
    setAddition(e.target.value)
   }

 


  return (
    <div className="function">
      {searchParams.get("status")=="success"?
      <Success/>
      :searchParams.get("status")=="minted"?
      <div className="profile">
      
      
      
      <h3>Wait For Asset to Appear in Your Wallet</h3>
      <p>Wait a block or two and check your wallet for the newly minted Island asset.</p>
      <button onClick={()=>checkWalletForIsland()}>Check Wallet</button>
      
    </div>
      :searchParams.get("status")=="inWallet"?
      <div className="profile">
      
      
      
      <h3>Register your Island to the Private Islands Archipelago</h3>
      <p>This will register your island to the Private Islands Archipelago. Registration costs 0.1 Dero.</p>
      
      <button onClick={()=>registerIsland()}>Register</button>
      {error}
    </div>
      :searchParams.get("status")=="registered"?
      <div className="profile">
      
      
      
      <h3>Update Your Private Island Metadata</h3>
      <p>This will create a native Dero asset and send it to your wallet. This asset is the key to your Private Island.</p>
      <form onSubmit={updateMetaData}>
        <input placeholder="Image URL" id="image" type="text"/>
        <input placeholder="Tagline" id="tagline" type="text" />
        <textarea placeholder="Description" rows="44" cols="80" id="bio"/>
        
        
        
        <p>&nbsp;</p>
        <Button size='sm' type={"submit"}>Create</Button>
      </form>
      {islandSCID && "here's the scid for your island "+islandSCID}
      {error}
    </div>
      :<div className="profile">
      
      
      
      <h3>Mint Your Private Island</h3>
      <p>This will create a native Dero asset and send it to your wallet. This asset is the key to your Private Island.</p>
      <form onSubmit={Mint}>
        <input placeholder="Island Name" id="island" type="text" />
  
        
        <p>&nbsp;</p>
        <Button size='sm' type={"submit"}>Create</Button>
      </form>
      {islandSCID && "here's the scid for your island "+islandSCID}
      {error}
    </div>}
    </div>
  )
}
