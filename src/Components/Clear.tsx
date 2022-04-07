import React from 'react';

interface Clear {
  handleClear: Function;
}

function Clear(props: Clear) {
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
