import React from 'react';

interface IEnter {
  handleSubmit: Function;
}

function Enter(props: IEnter) {
  const enter = "Enter"

  const handleClick = () => {
    props.handleSubmit()
  }

  return (
    <button className="SpecialKey"
      onClick={handleClick}
    >
      {enter}
    </button>
  );
}

export default Enter;
