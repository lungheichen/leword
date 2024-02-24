import React from 'react';
import SigninPopup from './SigninPopup';

interface IRightHeader {
  isLoggedIn: boolean;
  loginUser: Function;
}

function RightHeader(props: IRightHeader) {
  // Get fetched props.isLoggedIn noting whether user is still logged in
  var SignUpBox;
  if (!props.isLoggedIn) {
    SignUpBox = <SigninPopup loginUser={props.loginUser} />;
  } else {
    SignUpBox = <div>Signed In!</div>;
  }

  return (
    <div className="App-right-header">
      <div>right header</div>
      <div>help button</div>
      {SignUpBox}
    </div>
  );
}

export default RightHeader;
