import React, { useState } from 'react';
import Row from "./Row";

function Board() {
  const rows = []
  const blanks = "     "
  for (let i = 0; i < blanks.length; i++) {
    var row = 
      <Row
        key={i}
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
