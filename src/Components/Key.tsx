import React from 'react';

interface IKey {
  letter: string;
  handleGuess?: Function;
  color?: string;  // In the future, make this a required value?
}

function Key(props: IKey) {
  const letter = <b>{props.letter}</b>
  let color: string;
  if (props.color) {
    color = props.color
  } else {
    color = ' '
  }
  
  const colorChoices: {[key: string]: string} = {
    // ' ': '#826cd3', // What I originally wanted
    ' ': '#ED2939', // More French-colored
    n: 'gray',
    y: '#FFD700',
    g: 'green'
  }

  const style: React.CSSProperties = {
    backgroundColor: colorChoices[color],
  }

  const handleClick = () => {
    if (props.handleGuess) {
      props.handleGuess(props.letter)
    }
  }

  return (
    <button className="Key" style={style}
      onClick={handleClick}
    >
      {letter}
    </button>
  );
}

export default Key;
