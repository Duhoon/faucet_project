import './App.css';
import useWeb3 from "./hooks/useWeb3";
import {useState, useEffect} from "react";
import Faucet from "./contracts/Faucet.json";

function App() {
  const [web3, account] = useWeb3();
  const [faucet, setFaucet] = useState(null);
  const [number, setNumber] = useState(0);
  const contractAddress = "0xC742376eABdee93ef5474C94aaBEe987112A0a45"

  const giveBtnClickHandler = async ()=>{
    if(number > 0){
      const result = await web3.eth.sendTransaction({from:account, to:contractAddress, value:number});
      console.log(result);
    }
  }

  const receiveBtnClickHandler = async ()=>{
    if(number > 0){
      const result = await faucet.methods.withdraw(number).send({from:account});
      console.log(result);
    }
  }

  const numChangeHandler = (e)=>{
    setNumber(e.target.value);
  }

  useEffect(()=>{
    if (!web3) return;

    const contract = new web3.eth.Contract(Faucet.abi, contractAddress)
    setFaucet(contract);
  }, [web3])

  return (
    <div className="App">
      <div className="container">
        <div className="box">
          <div>  
            <p>내 주소</p>
            { account ? <p>{account}</p>
              : <p>메타마스크와 연결이 안되었습니다.</p>
            }
          </div>
          <div className="input-box">
            <input placeholder="숫자를 입력하세요 (1 wei)" type="number" value={number} onChange={numChangeHandler}/>
          </div>
          <button type="button" className="btn" onClick={giveBtnClickHandler}>Give Ether</button>
          <button type="button" className="btn" onClick={receiveBtnClickHandler}>Receive Ether</button>
        </div>
      </div>
    </div>
  );
}

export default App;
