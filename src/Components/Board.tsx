import React, { useState } from 'react';
import Row from "./Row";

// delete once I use a non-Key to do this
interface Board {
  // handleGuess: Function;
}

function Board(props: Board) {
  const rows = []
  const blanks = "     "
  for (let i = 0; i < blanks.length; i++) {
    var row = 
      <Row
        key={i}
        letters={blanks} 
        // handleGuess={props.handleGuess}
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
