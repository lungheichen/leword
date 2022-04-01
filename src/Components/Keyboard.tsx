import React from 'react';
import Row from './Row';
import Enter from './Enter'

interface Keyboard {
  handleGuess: Function;
  handleSubmit: Function;
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
      <Enter
        handleSubmit={props.handleSubmit}
      /> 
    </div>
  );
}

export default Keyboard;
