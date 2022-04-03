import React from 'react';
import Row from './Row';
import Enter from './Enter'
import Clear from './Clear'

interface Keyboard {
  handleGuess: Function;
  handleSubmit: Function;
  handleClear: Function;
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
      <Clear 
        handleClear={props.handleClear}
      />
    </div>
  );
}

export default Keyboard;
