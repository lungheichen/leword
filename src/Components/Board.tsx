import React from 'react';
import Row from './Row';

// delete once I use a non-Key to do this
interface Board {
  // handleGuess: Function;
  guess: string;
  guesses: string[];
  boardColors: string[][];
  rowInd: number;
}

function Board(props: Board) {
  const rows = [];
  const blanks = '     ';
  for (let i = 0; i < 6; i++) {
    if (i === props.rowInd) {
      var row = (
        <Row
          key={i}
          letters={props.guess.padEnd(5, ' ')}
          colors={props.boardColors[i]}
          // handleGuess={props.handleGuess}
        />
      );
    } else {
      var row = (
        <Row
          key={i}
          letters={props.guesses[i]}
          colors={props.boardColors[i]}
          // handleGuess={props.handleGuess}
        />
      );
    }
    rows.push(row);
  }

  return <div className="Board">{rows}</div>;
}

export default Board;
