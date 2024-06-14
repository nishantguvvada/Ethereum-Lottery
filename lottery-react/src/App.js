import { useState, useEffect } from 'react';
import web3UserVersion from './web3';
import lottery from './lottery';

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(()=>{
    const fetchInfo = async () => {
      try{
        const manager = await lottery.methods.manager().call();
        setManager(manager);
        const players = await lottery.methods.getPlayers().call();
        setPlayers(players);
        const balance = await web3UserVersion.eth.getBalance(lottery.options.address);
        setBalance(balance);
      } catch(err){
        console.log(err);
      }
    };
    fetchInfo();
  },[])

  const onSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3UserVersion.eth.getAccounts();
    setMessage("Waiting on transaction success...")
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3UserVersion.utils.toWei(value,'ether')
    });
    setMessage("You have been entered!")
  };

  const onClick = async () => {
    const accounts = await web3UserVersion.eth.getAccounts();
    setMessage("Waiting on transaction success...")
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })
    setMessage("A winner has been picked!")
  }
  
  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}.
      There are currently {players.length} peopel entered,
      competing to win {web3UserVersion.utils.fromWei(balance, 'ether')} ether!</p>
      <hr/>
      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter </label>
          <input value={value} onChange={(e)=>{
            setValue(e.target.value);
          }}></input>
        </div>
        <button>Enter</button>
      </form>
      <hr/>
      <h4>Ready to pick a winner?</h4>
      <button onClick={onClick}>Pick a winner!</button>
      <hr/>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
