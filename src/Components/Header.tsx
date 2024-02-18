import React from 'react';
import RightHeader from './RightHeader';

interface IHeader {
  isLoggedIn: boolean;
}

function Header(props: IHeader) {
  return (
    <header className="App-header">
      <div className="App-header-div">left</div>
      <div className="App-header-div">Le Word</div>
      <RightHeader isLoggedIn={props.isLoggedIn} />
    </header>
  );
}

export default Header;
