import React from 'react';
import Key from "./Key";
import Enter from './Enter'
import Clear from './Clear'

interface ILastRow {
  letters: string;
  handleGuess: (word: string) => void;
  handleSubmit: Function;
  handleClear: Function;
  colors: string[];
}

function LastRow(props: ILastRow) {

  const letters = []
  for (let i = 0; i < props.letters.length; i++) {
    var key = 
      <Key 
        handleGuess={props.handleGuess}
        key={i}
        letter={props.letters[i]}
        color={props.colors[i]} 
      />
    letters.push(key);
  }
  

  return (
    <div>
      <div className="Row">
        <Clear 
          handleClear={props.handleClear}
        />
        {letters}
        <Enter
          handleSubmit={props.handleSubmit}
        /> 
      </div>
    </div>
  );
}

export default LastRow;
