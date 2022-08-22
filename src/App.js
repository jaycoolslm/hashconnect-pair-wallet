import React, { useState } from 'react';
import logo from './logo.svg';
import { pairHashpack, authenticateUser } from './hashconnect';
import './App.css';

function App() {
  const [pairingString, setPairingString] = useState('')
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p id='accountid'></p>
        {
          pairingString &&
          <>
            <h1>Pairing string</h1>
            <p>{pairingString}</p>
          </>
        }
        <button onClick={authenticateUser}>Authenticate</button>
        
        <button onClick={async () => {
          const saveData = await pairHashpack()
          setPairingString(saveData.pairingString)
        }}>Pair wallet</button>
      </header>
    </div>
  );
}

export default App;
