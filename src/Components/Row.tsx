import React from 'react';
import Key from "./Key";

interface Letter {
  letters: string;
}

function Row(props: Letter) {

  const letters = []
  for (let i = 0; i < props.letters.length; i++) {
    var key = 
      <Key 
        key={i}
        letter={props.letters[i]}
      />
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
