import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import './App.css';
import Board from './Components/Board';
import Keyboard from './Components/Keyboard';
import guessCheck from './Helpers/guessCheck';

function App() {
  const [logger, setLogger] = useState('logger spot');
  const [guess, setGuess] = useState('');
  const [keyInd, setKeyInd] = useState(0);
  const [rowInd, setRowInd] = useState(0);
  const [word, setWord] = useState('');
  const blanks = [];
  for (let i = 0; i < 6; i += 1) {
    blanks.push('     ');
  }
  const [guesses, setGuesses] = useState(blanks);

  const getWord = () => {
    // do fetch from server, then set word to response
    // later... this will check the word on each submit
    // setword will no longer be needed
    setWord('APPLE');
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    if (word === '') {
      getWord();
    }
    console.log(word);
  }, []);

  const handleGuess = (letter: string) => {
    if (keyInd >= 5) {
      // Do nothing; cannot exceed 5 letters
      console.log("You've maxed out on guesses; either clear or submit guess");
    } else {
      setGuess(guess + letter);
      setKeyInd(keyInd + 1);
      console.log(keyInd);
    }
  };

  const handleSubmit = () => {
    if (keyInd === 5) {
      if (guess === word) {
        // set all letters to green
        setLogger('You win!');
        console.log('correct guess');
      } else if (rowInd === 5) {
        console.log('GAME OVER');
      } else {
        // include additional logic to color letters
        console.log('wrong guess; reset');
        const temp = guesses;
        temp[rowInd] = guess;
        setGuesses(temp);
        setKeyInd(0);
        setRowInd(rowInd + 1);
        setGuess('');
      }
    }
  };

  const handleClear = () => {
    console.log('clear');
    setGuess('');
    setKeyInd(0);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // need to figure out how to allow typing as long as user has clicked on website
    const letter = event.key;
    console.log(letter);
    if (letter === 'Backspace' && keyInd > 0) {
      setGuess(guess.slice(0, keyInd - 1));
      setKeyInd(keyInd - 1);
    } else if (letter === 'Enter') {
      event.preventDefault();
      handleSubmit();
    } else if (
      letter.length === 1 &&
      ((letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90) ||
        (letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122))
    ) {
      // flush sync forces synchonous events...
      // may need to do something else...
      flushSync(() => {
        handleGuess(letter.toUpperCase());
      });
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    // <div className="App" onKeyDown={handleKeyDown}>
    <div className="App">
      <header className="App-header">Le Word</header>
      <Board guess={guess} guesses={guesses} rowInd={rowInd} />
      <div className="Debug">
        <p>{logger}</p>
        <p>{guessCheck(word, guess)}</p>
        <p>keyInd: {keyInd}</p>
        <p>rowInd: {rowInd}</p>
      </div>
      <Keyboard handleGuess={handleGuess} handleSubmit={handleSubmit} handleClear={handleClear} />
    </div>
  );
}

export default App;
