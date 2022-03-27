import React from 'react';
import Key from "./Key";

interface Row {
  letters: String;
  handleGuess?: Function;
}

function Row(props: Row) {

  const letters = []
  for (let i = 0; i < props.letters.length; i++) {
    if (props.handleGuess) {
      var key = 
        <Key 
          handleGuess={props.handleGuess}
          key={i}
          letter={props.letters[i]}
        />
    } 
    else {
      var key = 
        <Key 
          key={i}
          letter={props.letters[i]}
        />      
    }
    letters.push(key);
  }
  

  return (
    <div>
      <div className="Row">
        {letters}
      </div>
    </div>
  );
}

export default Row;
