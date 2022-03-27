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
      />
      <Row
        letters="ASDFGHJKL"
      />
      <Row
        letters="ZXCVBNM"
      />
    </div>
  );
}

export default Keyboard;
