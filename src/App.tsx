import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import './App.css';
import Board from './Components/Board';
import Keyboard from './Components/Keyboard';
import guessCheck from './Helpers/guessCheck';

function App() {
  const [logger, setLogger] = useState('logger spot');
  const [guess, setGuess] = useState('');  // Could be renamed currentGuess
  const [keyInd, setKeyInd] = useState(0);
  const [rowInd, setRowInd] = useState(0);
  const [word, setWord] = useState('');
  const blankLetters = [];
  for (let i = 0; i < 6; i += 1) {
    blankLetters.push('     ');
  }
  // All 6 guesses representing the 6 rows on the board
  // Probably should convert to using array of arrays for guesses in order to deal with sync issues
  const [guesses, setGuesses] = useState(blankLetters);
  const blankColors = [];
  for (let i = 0; i < 6; i += 1) {
    blankColors.push([' ', ' ', ' ', ' ', ' ', ' ']);
  }
  const [boardColors, setBoardColors] = useState(blankColors);
  const blankColorDict: {[letter: string]: string} = {}
  for (let c = 65; c <= 90; c += 1) {
    blankColorDict[String.fromCharCode(c)] = ' '
  }
  const [keyBoardColors, setKeyboardColors] = useState(blankColorDict)

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
      // Set in the current guess to the current row
      const temp = guesses;
      temp[rowInd] = guess;
      setGuesses(temp);
      // include additional logic to color letters
      const colorsTemp = boardColors;
      colorsTemp[rowInd] = guessCheck(word, guess);
      
      setBoardColors(colorsTemp);
      // I think this should also output the colors for the keyboard, though it may make this messier.  Use a dict of letters A-Z?
      // setKeyboardColors(colorsTemp)
      if (guess === word) {
        setLogger('You win!');
        console.log('correct guess');
      } else if (rowInd === 5) {
        console.log('GAME OVER');
      } else {
        console.log('wrong guess; reset');
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

  useEffect(() => {
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
  
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [guess, keyInd, rowInd, guesses, boardColors]);
  // }, [handleKeyDown]);  // needs handleKeyDown function to be outside of useEffect

  return (
    // <div className="App" onKeyDown={handleKeyDown}>
    <div className="App">
      <header className="App-header">Le Word</header>
      <Board guess={guess} guesses={guesses} boardColors={boardColors} rowInd={rowInd} />
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
