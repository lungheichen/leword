import React from 'react';

interface Letter {
  letter: string;
}

function Key(props: Letter) {
  const letter = <b>{props.letter}</b>

  return (
    <button className="Key">
      {letter}
    </button>
  );
}

export default Key;
