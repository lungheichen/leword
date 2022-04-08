import React, { useState } from 'react';
import Row from "./Row";

// delete once I use a non-Key to do this
interface Board {
  // handleGuess: Function;
  guess: string;
  rowInd: number;
}

function Board(props: Board) {
  const rows = []
  const blanks = "     "
  for (let i = 0; i < 6; i++) {
    if (i === props.rowInd) {
      var row = 
        <Row
          key={i}
          letters={props.guess.padEnd(5, " ")} 
          // handleGuess={props.handleGuess}
        />
    } else {
      var row = 
        <Row
          key={i}
          letters={blanks} 
          // handleGuess={props.handleGuess}
        />
    }
    rows.push(row)
  }
  

  return (
    <div className="Board">
      {rows}
    </div>
  );
}

export default Board;
