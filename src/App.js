import React from 'react';
//mport logo from './logo.svg';
import './App.css';

import './components/auth/login.scss'
import Login from './components/auth/login'


function App() {
  return (
    <div className='App2'>
     
        <div className='Logo'>Logo</div>

        <div className='textMotto'>
        <h1>Your movies,<br/> your way.</h1>
        </div>

        <div className='box1'>picture</div>

        <div className='box2'>Groa Helps</div>
     
      <Login/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
