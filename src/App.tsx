// import React, { useState, useEffect, useRef } from 'react';
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Components/Board'
import Keyboard from './Components/Keyboard';

function App() {
  const [guess, setGuess] = useState("")
  const [wordGuess, setWordGuess] = useState("")
  const [keyInd, setKeyInd] = useState(0)
  const [rowInd, setRowInd] = useState(0)  
  const [word, setWord] = useState("")

  // const prevGuessRef = useRef("");
  // useEffect(() => {
  //   prevGuessRef.current = guess;
  // });
  // const prevGuess = prevGuessRef.current;

  const getWord = () => {
    // do fetch from server, then set word to response
    setWord('yyyyy')
  }

  const handleGuess = (word: string) => {
    console.log(wordGuess)
    setGuess(word)
    setWordGuess(wordGuess+word)
    // handleWordGuess()
  }

  // const handleWordGuess = () => {
  //   var tryout = {text: wordGuess + ""}
  //   setWordGuess({text: "aaa"})
  // }

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
      <Board 
        // handleGuess={handleGuess}
      />
      <p>wordGuess: {wordGuess}</p>
      <p>guess: {guess}</p>
      <Keyboard
        handleGuess={handleGuess}
      />
    </div>
  );
}

export default App;
