/**
 * TODO list
 * - make help button circular
 * - add stats icon
 */

import React from 'react';
import SigninPopup from './SigninPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-regular-svg-icons';

interface IRightHeader {
  isLoggedIn: boolean;
  loginUser: Function;
  signupUser: Function;
}

var StatisticsButton = (
  <div>
    <FontAwesomeIcon type="button" id="help-button" className="button" icon={faChartBar} />
  </div>
);

var HelpButton = (
  <div>
    <FontAwesomeIcon type="button" id="help-button" className="button" icon={faQuestion} />
  </div>
);

function RightHeader(props: IRightHeader) {
  // Get fetched props.isLoggedIn noting whether user is still logged in
  var SignUpBox = props.isLoggedIn ? (
    <div>
      <button type="button" className="button modal-button">
        Signed In!
      </button>
    </div>
  ) : (
    <SigninPopup loginUser={props.loginUser} signupUser={props.signupUser} />
  );

  return (
    <div className="App-right-header">
      {StatisticsButton}
      {HelpButton}
      {SignUpBox}
    </div>
  );
}

export default RightHeader;
