/**
 * Things to add:
 * - Style the pop-up
 * - Auto close with message that login was successful
 * - add Signup button
 */
import React, { useState } from 'react';
import { Popup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// interface ISigninPopup {
//   handleGuess?: Function;
// }

interface ISignupForm {
  signupUser: Function;
}

function SignupForm(props: ISignupForm) {
  const [name, setName] = useState('');
  const [pass, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await props.signupUser({
      name,
      pass,
    });
    console.log(token);
    // setToken(token);
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="name">Username: </label>
        <input
          type="text"
          id="name"
          name="name"
          size={10}
          onKeyDown={(e) => e.stopPropagation()}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="pass"
          value={pass}
          onKeyDown={(e) => e.stopPropagation()}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Make a New Account</button>
    </form>
  );
}

interface ISigninForm {
  loginUser: Function;
}

function SigninForm(props: ISigninForm) {
  const [name, setName] = useState('');
  const [pass, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await props.loginUser({
      name,
      pass,
    });
    console.log(token);
    // setToken(token);
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="name">Username: </label>
        <input
          type="text"
          id="name"
          name="name"
          size={10}
          onKeyDown={(e) => e.stopPropagation()}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="pass"
          value={pass}
          onKeyDown={(e) => e.stopPropagation()}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
}

interface ISigninPopup {
  loginUser: Function;
  signupUser: Function;
}

function SigninPopup(props: ISigninPopup) {
  // const handleClick = () => {
  // if (props.handleGuess) {
  //   props.handleGuess(props.letter)
  // }

  // Open window
  // }
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <button type="button" className="button modal-button" onClick={() => setOpen((o) => !o)}>
        Sign In
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          {/* <form method='POST' action={server+'/user'}> */}
          {isSigningUp ? (
            <SignupForm signupUser={props.signupUser} />
          ) : (
            <SigninForm loginUser={props.loginUser} />
          )}
          <button onClick={() => (isSigningUp ? setIsSigningUp(false) : setIsSigningUp(true))}>
            {isSigningUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
          </button>
        </div>
      </Popup>
    </div>
  );
}

export default SigninPopup;
