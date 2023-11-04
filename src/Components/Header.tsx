import React from 'react';
import RightHeader from "./RightHeader";


function Header() {

  return (
    <header className="App-header">
      <div className="App-header-div">left</div>
      <div className="App-header-div">Le Word</div>
      <RightHeader/>
    </header>
  );
}

export default Header;
