import React, { useState } from 'react';
import Row from "./Row";

function Board() {
  const [word, setWord] = useState("")

  const getWord = () => {
    // do fetch from server, then set word to response
    setWord('yyyyy')
  }

  const rows = []
  const blanks = "     "
  for (let i = 0; i < blanks.length; i++) {
    var row = 
      <Row
        letters={blanks} 
      />
    rows.push(row)
  }
  

  return (
    <div className="Board">
      {rows}
    </div>
  );
}

export default Board;
