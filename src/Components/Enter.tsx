import React from 'react';

interface Enter {
  handleSubmit: Function;
}

function Enter(props: Enter) {
  const enter = "Enter"

  const handleClick = () => {
    props.handleSubmit()
  }

  return (
    <button className="Enter"
      onClick={handleClick}
    >
      {enter}
    </button>
  );
}

export default Enter;
