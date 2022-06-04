import React from 'react';
import Row from './Row';

// delete once I use a non-Key to do this
interface IBoard {
  // handleGuess: Function;
  guess: string;
  guesses: string[];
  boardColors: string[][];
  rowInd: number;
}

function Board(props: IBoard) {
  const rows = [];
  for (let i = 0; i < 6; i++) {
    let row;
    if (i === props.rowInd) {
      row = (
        <Row
          key={i}
          letters={props.guess.padEnd(5, ' ')}
          colors={props.boardColors[i]}
          // handleGuess={props.handleGuess}
        />
      );
    } else {
      row = (
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
