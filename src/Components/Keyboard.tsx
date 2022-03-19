import React from 'react';
import Key from './Key';

function Keyboard() {
  
  var rows = [];
  var keys = [];
  return (
    <div>
      <p>This is where the keyboard goes</p>
      <div className="Keyboard">
        <Key
          letter="Q"
        />
      </div>
    </div>
  );
}

export default Keyboard;
