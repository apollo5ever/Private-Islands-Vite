import React, { useState,useContext,useEffect} from "react";
import { LoginContext } from "./LoginContext";
import initialize from "./initialize";
import Info from "./info";
import { useRPCWallet } from "./components/useRPCWallet";
import Cookies from 'js-cookie'


const WalletMenu = ({handleClose}) => {
  const [menuOption, setMenuOption] = useState("main");
  const [state, setState] = useContext(LoginContext);
  const [walletInfo, isLoading, error, fetchWalletInfo] = useRPCWallet();




  const handleOptionClick = option => {
    setMenuOption(option);
  };

  const handleSelectRPC = ()=>{
    fetchWalletInfo()
  }

  const handleSubmitSeed = async (e) => {
    
        e.preventDefault()
        
        let name =e.target.name.value
        let pass = e.target.pass.value
        let conf = e.target.conf.value
        let seed = e.target.seed.value
        if(pass!=conf) return
        console.log(state)

        const walletInfo = await new Promise((resolve) => {
          state.worker.onmessage = (event) => {
            
            resolve(event.data.result);
          };
          
          state.worker.postMessage({ functionName: "RecoverWalletFromSeed", args: [pass, seed] });
        });
     
     const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
     const decoder = new TextDecoder();
     const jsonString = decoder.decode(arrayBuffer);
     const jsonObject = JSON.parse(jsonString);
     const fileData=JSON.stringify(jsonObject)
 
     
     
     console.log(walletInfo)

     let wallet = walletInfo.value
wallet.name=name
wallet.fileData=fileData
wallet.open=false
   
  localStorage.setItem(`wallet-${state.walletList.length}-${wallet.name}`,JSON.stringify(wallet))
  setState({...state,"initialized":true,"walletList":[...state.walletList,wallet], "walletType":"WASM" })
        
        
       
    
    
}

const handleSubmitHexSeed = async (e) => {
    
  e.preventDefault()
  let name = e.target.name.value
  let pass = e.target.pass.value
  let conf = e.target.conf.value
  let seed = e.target.seed.value
  if(pass!=conf) return
  console.log(state)


console.log(state)
const walletInfo = await new Promise((resolve) => {
  state.worker.onmessage = (event) => {
    
    resolve(event.data.result);
  };
  console.log("waiting for worker",pass,seed)
  state.worker.postMessage({ functionName: "RecoverWalletFromHexSeed", args: [pass, seed] });
});

console.log("walletInfo",walletInfo)
const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
const decoder = new TextDecoder();
const jsonString = decoder.decode(arrayBuffer);
const jsonObject = JSON.parse(jsonString);
const fileData=JSON.stringify(jsonObject)


console.log("wallet info",walletInfo,fileData)

let wallet = walletInfo.value
wallet.name=name
wallet.fileData=fileData
wallet.open=false
 
  //console.log("cookie time baby",JSON.stringify([...state.walletList.slice(1,),wallet]))  
  localStorage.setItem(`wallet-${state.walletList.length}-${wallet.name}`,JSON.stringify(wallet))
 // Cookies.remove('walletList')
  //  Cookies.set('walletList',JSON.stringify([...state.walletList.slice(1,),wallet]),{ expires: 7, path: '/' })
    setState({...state,"initialized":true,"walletList":[...state.walletList,wallet], "walletType":"WASM" })
  
}

const handleSubmitCreateNewWallet = async (e) => {
    
  e.preventDefault()
  let pass = e.target.pass.value
  let conf = e.target.conf.value
  let name = e.target.name.value
  
  if (pass === conf) {

    const walletInfo = await new Promise((resolve) => {
      state.worker.onmessage = (event) => {
        resolve(event.data.result);
      };
    
      state.worker.postMessage({ functionName: "CreateNewWallet", args: [pass] });
    });
   
    
    
  const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
  const decoder = new TextDecoder();
  const jsonString = decoder.decode(arrayBuffer);
  const jsonObject = JSON.parse(jsonString);
  const fileData=JSON.stringify(jsonObject)

 
  console.log(walletInfo)
  
  let wallet = walletInfo.value
  wallet.name=name
  wallet.fileData=fileData
  wallet.open=false
     
    localStorage.setItem(`wallet-${state.walletList.length}-${wallet.name}`,JSON.stringify(wallet))
    setState({...state,"initialized":true,"walletList":[...state.walletList,wallet], "walletType":"WASM" })
  

  }

 


}

const handleSubmitDisk = async (e) => {
    
  e.preventDefault()
  console.log(e.target.file.value)
  let name = e.target.name.value
  let pass = e.target.pass.value
  let file = await e.target.file.files[0].text()
  
  
  

console.log(state)
const walletInfo = await new Promise((resolve) => {
  state.worker.onmessage = (event) => {
    resolve(event.data.result);
  };

  state.worker.postMessage({ functionName: "RecoverWalletFromDisk", args: [pass, file] });
});
console.log("walletInfo",walletInfo)

const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
const decoder = new TextDecoder();
const jsonString = decoder.decode(arrayBuffer);
const jsonObject = JSON.parse(jsonString);
const fileData=JSON.stringify(jsonObject)


console.log(walletInfo)

let wallet = walletInfo.value
wallet.name=name
wallet.fileData = fileData
if(state.walletList.length==1){
  Cookies.set('walletList',JSON.stringify([wallet]),{ expires: 7, path: '/' })
  setState({...state,"initialized":true,"walletList":[...state.walletList,wallet], "walletType":"WASM"})
}else{
  Cookies.remove('walletList')
  Cookies.set('walletList',JSON.stringify([...state.walletList.slice(1,),wallet]),{ expires: 7, path: '/' })
  setState({...state,"initialized":true,"walletList":[...state.walletList,wallet], "walletType":"WASM" })
  
}
  
  

  

 


}

const openSelectedWallet = async (e) =>{
  e.preventDefault()
  let pass = e.target.pass.value
  /* const arrayBuffer = new Uint8Array(state.walletList[state.selectedWallet].fileData).slice();
  const decoder = new TextDecoder();
  const jsonString = decoder.decode(arrayBuffer);
  const jsonObject = JSON.parse(jsonString);
  const fileData=JSON.stringify(jsonObject) */
  const err = await new Promise((resolve) => {pass
    state.worker.onmessage = (event) => {
      resolve(event.data.result);
    };
  
    state.worker.postMessage({ functionName: "OpenWallet", args: [state.walletList[state.activeWallet].hexSeed,pass,state.walletList[state.activeWallet].fileData,true] });
  });
  console.log(err)
  if(err.err == null) {
    let walletList = state.walletList
    walletList[state.activeWallet].open = true
    setState({...state,walletList:walletList})
  }

}

const renderMainMenu = () =>{
  return(
    <div className="menu">
      <button onClick={()=>handleClose()}>X</button>
      <div><h3>RPC Wallet</h3>
      <button onClick={()=>handleSelectRPC()}>Select</button>
      </div>
      <div><h3>Integrated Wallets</h3>
      <Info/>
      <button onClick={()=>handleOptionClick("addWallet")}>Add Wallet</button>
      <form onSubmit={openSelectedWallet}>
        <input id="pass" type="password"/>
        <button type={"submit"}>Open</button>
      </form>
      </div>
    </div>
  )
}


  const renderAddWalletMenu = () => {
    return (
      <div className="menu">
        <button onClick={()=>handleOptionClick("main")}>Back</button>
        <button onClick={handleClose}>X</button>
        <h2>Select an option:</h2>
        <div className="menu-options">
        <div className="menu-option" onClick={() => handleOptionClick("Fast Registration")}>Fast Registration</div>
        <div className="menu-option" onClick={() => handleOptionClick("Create New Wallet")}>Create New Wallet</div>
        <div className="menu-option" onClick={() => handleOptionClick("Recover From Seed")}>Recover From Seed</div>
        <div className="menu-option" onClick={() => handleOptionClick("Recover From Hex Seed")}>Recover From Hex Seed</div>
        <div className="menu-option" onClick={() => handleOptionClick("Recover From Disk")}>Recover From Disk</div>
        </div>
      </div>
    );
  };

  const renderOptionMenu = () => {
    return (
      <div className="menu">
        <button onClick={() => handleOptionClick("main")}>Back</button>
        {renderInputFields()}
      </div>
    );
  };

  const renderInputFields = () => {
    switch (menuOption) {
      case "Fast Registration":
        return <input type="text" placeholder="Enter your email"></input>;
      case "Create New Wallet":
        return <form onSubmit={handleSubmitCreateNewWallet}>
          <input type="text" placeholder="Name your new wallet" id="name"/>
          <input type="password" placeholder="Enter a password" id="pass"/>
          <input type="password" placeholder="Confirm password" id="conf"/>
          <button type={"submit"}>Create</button>
          </form>;
      case "Recover From Seed":
        return <form onSubmit={handleSubmitSeed}>
        <input type="text" id="name" placeholder="Name your wallet"/>
        <input type="text" name="" id="seed" placeholder="Enter your seed phrase"/>
        <input type="password" id="pass" placeholder="Enter a password"/>
        <input type="password" id="conf" placeholder="Confirm password"/>
        <button type={"submit"}>Submit</button>
      </form>;
      case "Recover From Hex Seed":
        return <form onSubmit={handleSubmitHexSeed}>
        <input type="text" id="name" placeholder="Name your wallet"/>
        <input type="text" name="" id="seed" placeholder="Enter your hex seed"/>
        
        <input type="password" id="pass" placeholder="Enter a password"/>
        <input type="password" id="conf" placeholder="Confirm password"/>
        <button type={"submit"}>Submit</button>
      </form>;
      case "Recover From Disk":
        return <form onSubmit={handleSubmitDisk}>
          <input type="text" id="name" placeholder="Name your wallet"/>
          <input type="password" id="pass" placeholder="Enter password"/>
          <input type="file" id="file"/>
          <button type={"submit"}>Submit</button>
          </form>;
      default:
        return null;
    }
  };

  return menuOption === "main" ? renderMainMenu() : menuOption === "addWallet" ? renderAddWalletMenu() : renderOptionMenu();
};

export default WalletMenu;
