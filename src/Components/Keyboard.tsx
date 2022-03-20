import React from 'react';
import Row from './Row';

function Keyboard() {
  
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
