// import React, { useState, useEffect, useRef } from 'react';
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Components/Board'
import Keyboard from './Components/Keyboard';
import { isConstructorDeclaration } from 'typescript';

function App() {
  const [guess, setGuess] = useState("")
  const [keyInd, setKeyInd] = useState(0)
  const [rowInd, setRowInd] = useState(0)  
  const [word, setWord] = useState("")
  const blanks = []
  for (let i = 0; i < 6; i++) {
    blanks.push("     ")
  }
  const [guesses, setGuesses] = useState(blanks)
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    if (word === "") {
      getWord()
    }
    console.log(word)
  }, []);

  // const prevGuessRef = useRef("");
  // useEffect(() => {
  //   prevGuessRef.current = guess;
  // });
  // const prevGuess = prevGuessRef.current;

  const getWord = () => {
    // do fetch from server, then set word to response
    setWord('YYYYY')
  }
  
  const handleGuess = (word: string) => {
    if (keyInd >= 5) {
      // Do nothing; cannot exceed 5 letters
      return
    } else {
      setGuess(guess+word)
      setKeyInd(keyInd+1)
    }
  }

  const handleSubmit = () => {
    if (keyInd === 5) {
      if (guess === word) {
        console.log("game won")
      } else if (rowInd === 5) {
        console.log("GAME OVER")
        return
      } else {
        console.log('wrong guess; reset')
        const temp = guesses
        temp[rowInd] = guess
        setGuesses(temp)
        setKeyInd(0)
        setRowInd(rowInd+1)
        setGuess("")
      }
    }
  }

  const handleClear = () => {
    console.log('clear')
    setGuess("")
    setKeyInd(0)
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
      <Board
        guess={guess}
        guesses={guesses}
        rowInd={rowInd}
      />
      <p>guess: {guess}</p>
      <p>keyInd: {keyInd}</p>
      <p>rowInd: {rowInd}</p>
      <Keyboard
        handleGuess={handleGuess}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
      />
    </div>
  );
}

export default App;
