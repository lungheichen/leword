import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import './App.css';
import Board from './Components/Board';
import Keyboard from './Components/Keyboard';
import Header from './Components/Header';
import guessCheck from './Helpers/guessCheck';
import getKeyboardColors from './Helpers/getKeyboardColors';
import dictWords from './Assets/dict';

// console.log(fs);

interface ISavedGuesses {
  [index: string]: string;
}

function App() {
  // const [logger, setLogger] = useState('logger spot');
  const [guess, setGuess] = useState(''); // Could be renamed currentGuess
  const [keyInd, setKeyInd] = useState(0);
  const [rowInd, setRowInd] = useState(0);
  const [word, setWord] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dictSet = new Set(dictWords);
  // fetch('./Assets/dict.txt')
  //   .then((r) => r.text())
  //   .then(text  => {
  //     console.log(text[1]);
  // })

  // Get board letters
  // Array of 6 strings
  // eventually should convert to array of arrays for improvement of time complexity and consistency with board colors array
  const blankLetters: string[] = [];
  for (let i = 0; i < 6; i += 1) {
    blankLetters.push('     ');
  }
  // All 6 guesses representing the 6 rows on the board
  // Probably should convert to using array of arrays for guesses in order to deal with sync issues
  const [guesses, setGuesses] = useState(blankLetters);

  // Get board colors
  // Array of 6 rows/arrays of 6 letters
  const blankColors: string[][] = [];
  for (let i = 0; i < 6; i += 1) {
    blankColors.push([' ', ' ', ' ', ' ', ' ']);
  }
  const [boardColors, setBoardColors] = useState(blankColors);

  // Get keyboard colors
  // Key-value pairs of letter: color-letter
  const blankColorDict: { [letter: string]: string } = {};
  for (let c = 65; c <= 90; c += 1) {
    blankColorDict[String.fromCharCode(c)] = ' ';
  }
  const [keyboardColors, setKeyboardColors] = useState(blankColorDict);

  const UpdateBoardandKeyboard = (savedGuesses: ISavedGuesses, savedColors: string[][]) => {
    for (let i = 1; i < savedColors.length + 1; i++) {
      const currGuess = savedGuesses[i];
      console.log(`currGuess = ${currGuess} for i = ${i}`);
      blankLetters[i - 1] = currGuess.toUpperCase();

      blankColors[i - 1] = savedColors[i - 1];
      console.log(`blankColors = ${blankColors[i - 1]} for i = ${i - 1}`);

      // Update keyboard colors after each board row is filled
      // This is needed as keyboard colors are ranked based on
      // It's possible to move it outside the forloop, but that's additional
      //  memory to create a new keyboard-color object
      setKeyboardColors(
        getKeyboardColors(keyboardColors, savedGuesses[i].toUpperCase(), savedColors[i - 1]),
      );
    }

    setRowInd(savedColors.length);
    setBoardColors(blankColors);
    setGuesses(blankLetters); // set guesses last which reloads page
    return;
  };

  const getSavedGuessesAndColors = async () => {
    const uri = `${process.env.REACT_APP_SERVER}/user`;
    if (!uri) {
      return;
    }

    fetch(uri, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('getSavedGuessesAndColors: data = ');
        console.log(data);
        const savedGuesses: ISavedGuesses = data.guesses;
        const savedColors = data.colorsArr;
        setIsLoggedIn(data.isLoggedIn);
        UpdateBoardandKeyboard(savedGuesses, savedColors);
      })
      .catch((err) => console.log('App.componentDidMount: get guesses: ERROR: ', err));
  };

  const getWord = () => {
    // depreciated; don't want the user to have the answer
    setWord('APPLE');
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    getWord(); // remove this eventually once board and colors are fetched from server
    // might need to just GET both guesses and colors together
    // then handle them
    getSavedGuessesAndColors(); // fetch saved guesses and their colors
    console.log('getWord and getSavedGuessesAndColors ran');

    // make updates
    flushSync(() => {});
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

  const handleSubmit = async () => {
    console.log(guess.toLowerCase());
    if (keyInd === 5) {
      // check if word is in dictSet first
      if (!dictSet.has(guess.toLowerCase())) {
        console.log('word not in dictionary; try again');
        return;
      }
      // Set in the current guess to the current row
      const temp = guesses;
      temp[rowInd] = guess;
      setGuesses(temp);

      // include additional logic to color letters
      const colorsTemp = boardColors;
      // Submit get request with body containing guess
      // response of colors as array of letters representing colors
      const colors: string[] = await guessCheck(word, guess);
      console.log(`client: colors = `);
      console.log(colors);
      if (colors.length !== 5) {
        return;
      }

      colorsTemp[rowInd] = colors;
      setBoardColors(colorsTemp);
      // I think this should also output the colors for the keyboard, though it may make this messier.  Use a dict of letters A-Z?

      var guessIsCorrect = true;
      for (let i = 0; i < 5; i++) {
        if (colors[i] !== 'g') {
          guessIsCorrect = false;
          break;
        }
      }

      setKeyboardColors(getKeyboardColors(keyboardColors, guess, colorsTemp[rowInd]));
      if (guessIsCorrect) {
        // setLogger('You win!');
        console.log('correct guess');
        // lazy fix; I should be able to just disable key logging
        setRowInd(6);
      } else if (rowInd === 5) {
        console.log('GAME OVER');
        // lazy fix; I should be able to just disable key logging
        setRowInd(rowInd + 1);
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
      <Header isLoggedIn={isLoggedIn} />
      <Board guess={guess} guesses={guesses} boardColors={boardColors} rowInd={rowInd} />
      {/* <div className="Debug">
        <p>{logger}</p>
        <p>{guessCheck(word, guess)}</p>
        <p>keyInd: {keyInd}</p>
        <p>rowInd: {rowInd}</p>
      </div> */}
      <Keyboard
        handleGuess={handleGuess}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        keyboardColors={keyboardColors}
      />
    </div>
  );
}

export default App;
