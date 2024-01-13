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
  const dictSet = new Set(dictWords)
  // fetch('./Assets/dict.txt')
  //   .then((r) => r.text())
  //   .then(text  => {
  //     console.log(text[1]);
  // })  

  const blankLetters: string[] = [];
  for (let i = 0; i < 6; i += 1) {
    blankLetters.push('     ');
  }
  // All 6 guesses representing the 6 rows on the board
  // Probably should convert to using array of arrays for guesses in order to deal with sync issues
  const [guesses, setGuesses] = useState(blankLetters);

  // Get board colors
  const blankColors = [];
  for (let i = 0; i < 6; i += 1) {
    blankColors.push([' ', ' ', ' ', ' ', ' ']);
  }
  const [boardColors, setBoardColors] = useState(blankColors);

  const blankColorDict: { [letter: string]: string } = {};
  for (let c = 65; c <= 90; c += 1) {
    blankColorDict[String.fromCharCode(c)] = ' ';
  }
  const [keyboardColors, setKeyboardColors] = useState(blankColorDict);


  const AddGuessesToBoard = (savedGuesses: ISavedGuesses) => {

    console.log(`savedGuesses = `);
    console.log(savedGuesses);
    var boardComplete = true;

    for (let i = 1; i < guesses.length + 1; i++) {
      // const stringI: string = i.toString()
      const currGuess = savedGuesses[i];
      console.log(`currGuess = ${currGuess} for i = ${i}`);
      if (currGuess === '' ) {
        boardComplete = false;
        setRowInd(i - 1);
        break;
      }
      blankLetters[i - 1] = currGuess.toUpperCase();
    }
    
    // disable guessing if all 6 guesses were fetched
    if (boardComplete) setRowInd(6);

    setGuesses(blankLetters);
    console.log(guesses);
    return;
  }


  const getSavedGuesses = async () => {
    const uri = `${process.env.REACT_APP_SERVER}/user`;
    if (!uri) {
      return;
    }
  
    fetch(uri, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then((savedGuesses: ISavedGuesses) => {
        // set row and guesses
        AddGuessesToBoard(savedGuesses)
      })
      .catch(err => console.log('App.componentDidMount: get guesses: ERROR: ', err));
  }

  // const guessesToBoard = (savedGuesses) => {

  // }

  const getWord = () => {
    // depreciated; don't want the user to have the answer
    setWord('APPLE');
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    getWord();  // remove this eventually once board and colors are fetched from server
    getSavedGuesses();  // fetch saved guesses
    console.log("getWord and getSavedGuesses ran")
    // get colors

    // apply colors to board


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
    console.log(guess.toLowerCase())
    if (keyInd === 5) {
      // check if word is in dictSet first
      if (!(dictSet.has(guess.toLowerCase()))) {
        console.log('word not in dictionary; try again')
        return
      }
      // Set in the current guess to the current row
      const temp = guesses;
      temp[rowInd] = guess;
      setGuesses(temp);

      // include additional logic to color letters
      const colorsTemp = boardColors;
      // Submit get request with body containing guess
      // response of colors as array of letters representing colors
      const colors: string[] = await guessCheck(word, guess)
      console.log(`client: colors = `)
      console.log(colors)
      if (colors.length !== 5) {
        return
      }

      colorsTemp[rowInd] = colors
      setBoardColors(colorsTemp);
      // I think this should also output the colors for the keyboard, though it may make this messier.  Use a dict of letters A-Z?

      var guessIsCorrect = true;
      for (let i = 0; i < 5; i++) {
        if (colors[i] !== 'g') {
          guessIsCorrect = false;
          break
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
      <Header/>
      <Board guess={guess} guesses={guesses} boardColors={boardColors} rowInd={rowInd} />
      {/* <div className="Debug">
        <p>{logger}</p>
        <p>{guessCheck(word, guess)}</p>
        <p>keyInd: {keyInd}</p>
        <p>rowInd: {rowInd}</p>
      </div> */}
      <Keyboard handleGuess={handleGuess} handleSubmit={handleSubmit} handleClear={handleClear} keyboardColors={keyboardColors} />
    </div>
  );
}

export default App;
