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

  const blankLetters = [];
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


  const getWord = () => {
    // depreciated; don't want the user to have the password
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

  // const handleLogin = () => {
  //   fetch('/user', {
  //     method: 'POST',
  //     body: JSON.stringify({ username, password }),
  //     headers: {'Content-Type': 'application/json'},
  //   })
  //   .then(res => {
  //     if(res.status === 200) {
  //       dispatch(createMarket(marketId, location));
  //     } else {
  //       console.log('in createMarketThunk - Server returned status', res.status)
  //     }
  //   })  
  //   .catch(err => console.log('Error in createMarketThunk fetch:', err));
    
  // }

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
