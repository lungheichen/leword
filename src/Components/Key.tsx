import React from 'react';

interface Key {
  letter: String;
  handleGuess?: Function;
}

function Key(props: Key) {
  const letter = <b>{props.letter}</b>

  const handleClick = () => {
    if (props.handleGuess) {
      props.handleGuess(props.letter)
    }
  }

  return (
    <button className="Key"
      onClick={handleClick}
    >
      {letter}
    </button>
  );
}

export default Key;
