import React from 'react';
import Key from './Key';

interface IRow {
  letters: string;
  handleGuess?: (word: string) => void;
  colors: string[];
}

function Row(props: IRow) {
  const letters = [];
  for (let i = 0; i < props.letters.length; i++) {
    let key;
    if (props.handleGuess) {
      // keys for keyboard (with handleGuess aka handleKeystroke) 
      key = <Key handleGuess={props.handleGuess} key={i} letter={props.letters[i]} color={props.colors[i]} />;
    } else {
      key = <Key key={i} letter={props.letters[i]} color={props.colors[i]} />;
    }
    letters.push(key);
  }

  return (
    <div>
      <div className="Row">{letters}</div>
    </div>
  );
}

export default Row;
