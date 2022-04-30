import React from 'react';
import Row from './Row';
import LastRow from './LastRow';

interface Keyboard {
  handleGuess: (word: string) => void;
  handleSubmit: () => void;
  handleClear: () => void;
}

function Keyboard(props: Keyboard) {
  // I'll be taking props.keyboardColors (to be implemented later) that will be a dictionary to build an array of colors by for-looping through the letters.
  const firstRowLetters = 'QWERTYUIOP';
  const firstRowColors = [];
  for (let i = 0; i < firstRowLetters.length; i += 1) {
    continue;
  }
  const secondRowLetters = 'ASDFGHJKL';
  const lastRowLetters = 'ZXCVBNM';

  return (
    <div className="Keyboard">
      <Row letters={firstRowLetters} handleGuess={props.handleGuess} />
      <Row letters={secondRowLetters} handleGuess={props.handleGuess} />
      <LastRow
        letters={lastRowLetters}
        handleGuess={props.handleGuess}
        handleSubmit={props.handleSubmit}
        handleClear={props.handleClear}
      />
    </div>
  );
}

export default Keyboard;
