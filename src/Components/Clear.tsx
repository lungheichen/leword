import React from 'react';

interface IClear {
  handleClear: Function;
}

function Clear(props: IClear) {
  const clear = "Clear"

  const handleClick = () => {
    props.handleClear()
  }

  return (
    <button className="SpecialKey"
      onClick={handleClick}
    >
      {clear}
    </button>
  );
}

export default Clear;
