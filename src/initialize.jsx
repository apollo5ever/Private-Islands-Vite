import React, { useState,useContext } from "react";
import { LoginContext } from "./LoginContext";
import Cookies from "js-cookie";


export default async function initialize(){

   

    
    
    await new Promise(resolve => {
        
      window.Initialize("mainnet","https://dero-api.mysrv.cloud")
      const handleConnected = () => {
          
          resolve()
       }
  
       console.log('waiting for connection...');
       console.log = (function(old_function, handleConnected){
           return function(text){
               if (text === 'successfully connected') {
                   handleConnected();
               }
               old_function.apply(console, arguments);
           }
       })(console.log, handleConnected);
    });
    console.log("true")
    return true
  }
  
 
  