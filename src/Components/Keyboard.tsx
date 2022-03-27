import React from 'react';
import Row from './Row';

interface Keyboard {
  handleGuess: Function;
}

function Keyboard(props: Keyboard) {
  
  var rows = [];
  var keys = [];
  return (
    <div className="Keyboard">
      <Row
        letters="QWERTYUIOP"
        handleGuess={props.handleGuess}
      />
      <Row
        letters="ASDFGHJKL"
        handleGuess={props.handleGuess}
      />
      <Row
        letters="ZXCVBNM"
        handleGuess={props.handleGuess}
      />
    </div>
  );
}

export default Keyboard;
