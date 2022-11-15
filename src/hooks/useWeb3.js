import {useEffect, useState} from 'react';
import Web3 from "web3/dist/web3.min.js";


const useWeb3 = ()=>{
    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);

    useEffect(()=>{
    
        (async ()=>{
          if (!window.ethereum) return;
          
          const [address] = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
          
          setAccount(address);

          const web3 = new Web3('ws://localhost:8545');
          setWeb3(web3);

        })();
      }, []);

      return [web3, account];
};

export default useWeb3;