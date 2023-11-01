import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// interface ISigninPopup {
//   handleGuess?: Function;
// }

function SigninPopup() {
  // const handleClick = () => {
    // if (props.handleGuess) {
    //   props.handleGuess(props.letter)
    // }

    // Open window
  // }x
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [password, setPassword] = useState("");
  const server = process.env.REACT_APP_SERVER;

  // Need to reintroduce the handleSubmit so that it receives the data back

  return (
    <div>
      <button type="button" className="button" onClick={() => setOpen(o => !o)}>
        Sign In
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <form method='POST' action={server+'/user'}>
            <div>
              <label htmlFor="name">Username: </label>
              <input type="text" id="name" name="name" size={10} />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit">Submit form</button>
          </form>
        </div>
      </Popup>
    </div>
  );
}

export default SigninPopup;
