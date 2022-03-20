import React from 'react';
import Row from './Row';

function Keyboard() {
  
  var rows = [];
  var keys = [];
  return (
    <div>
      <p>This is where the keyboard goes</p>
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
    </div>
  );
}

export default Keyboard;
