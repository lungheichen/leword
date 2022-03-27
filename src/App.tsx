import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Components/Board'
import Keyboard from './Components/Keyboard';

function App() {
  const [guess, setGuess] = useState("")
  const [rowNum, setrowNum] = useState(0)  
  const [word, setWord] = useState("")

  const getWord = () => {
    // do fetch from server, then set word to response
    setWord('yyyyy')
  }

  const handleGuess = function(word: string) {
    setGuess(word)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Board />
      <Keyboard
        handleGuess={handleGuess}
      />
    </div>
  );
}

export default App;
