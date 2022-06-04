import React from 'react';
import Row from './Row';
import LastRow from './LastRow';

interface IKeyboard {
  handleGuess: (word: string) => void;
  handleSubmit: () => void;
  handleClear: () => void;
  keyboardColors: {[letter: string]: string}
}

function Keyboard(props: IKeyboard) {
  // I'll be taking props.keyboardColors (to be implemented later) that will be a dictionary to build an array of colors by for-looping through the letters.
  const rowLetters = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
  const rowColors: string[][] = [];
  for (let row = 0; row < rowLetters.length; row += 1) {
    rowColors.push([])
    for (let i = 0; i < rowLetters[row].length; i += 1) {
      const letter = rowLetters[row][i];
      rowColors[row].push(props.keyboardColors[letter]);
    }
  }

  return (
    <div className="Keyboard">
      <Row letters={rowLetters[0]} colors={rowColors[0]} handleGuess={props.handleGuess} />
      <Row letters={rowLetters[1]} colors={rowColors[1]} handleGuess={props.handleGuess} />
      <LastRow
        letters={rowLetters[2]}
        colors={rowColors[2]}
        handleGuess={props.handleGuess}
        handleSubmit={props.handleSubmit}
        handleClear={props.handleClear}
      />
    </div>
  );
}

export default Keyboard;
