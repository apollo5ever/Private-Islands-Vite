importScripts('/wasmjs/wasm_exec.js');

async function initialize() {
  const GO = new self.Go();
  const wasm = await fetch('../dero_wallet.wasm');
  console.log(wasm)
  const { instance } = await WebAssembly.instantiateStreaming(wasm, GO.importObject);
  GO.run(instance);
console.log("GO",GO)
console.log("window",self)
  await new Promise(resolve => {
        
    self.Initialize("mainnet","https://dero-api.mysrv.cloud")
    const handleConnected = () => {
        
        resolve()
     }

     console.log('waiting for connection...');
     console.log = (function(old_function, handleConnected){
         return function(text){
             if (text === 'successfully connected' ) {
                 handleConnected();
             }
             old_function.apply(console, arguments);
         }
     })(console.log, handleConnected);
  });
  console.log("true")
  return true

}

  


self.onmessage = async (event) => {
  if (event.data.type === 'initialize') {
    console.log("LOADING WORKER");
    initialize();
  }else{
    
      const { functionName, args } = event.data;
      const result = await self[functionName].apply(null, args);
      let key = args[0];
      console.log("worker received this msg",functionName,args)
      if (key == "key") {
        const intervalId = setInterval(() => {
          console.log('waiting for key',key)
          if (self[key]) {
            clearInterval(intervalId);
            self.postMessage({ result, key: self[key] });
            self[key] = null
          }
        }, 1000);
      } else {
        self.postMessage({ result });
      }
    
    
  }
};