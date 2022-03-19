import React, { useState } from 'react';
import Row from "./Row";

function Board() {
  const [word, setWord] = useState("")

  const getWord = () => {
    // do fetch from server, then set word to response
    setWord('yyyyy')
  }

  const rows = []
  for (let i = 0; i < 6; i++) {
    var row = 
      <Row
        letters={"     "} 
      />
    rows.push(row)
  }
  

  return (
    <div>
      <p>This is where the board goes</p>
      <div className="Board">
        {rows}
      </div>
    </div>
  );
}

export default Board;
