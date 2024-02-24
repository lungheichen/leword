import React, { useState } from 'react';
import { Popup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// interface ISigninPopup {
//   handleGuess?: Function;
// }

interface ICredentials {
  loginUser: Function;
}

function SigninPopup(props: ICredentials) {
  // const handleClick = () => {
  // if (props.handleGuess) {
  //   props.handleGuess(props.letter)
  // }

  // Open window
  // }x
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [name, setName] = useState('');
  const [pass, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await props.loginUser({
      name,
      pass,
    });
    console.log(token);
    // setToken(token);
  };

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
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Submit form</button>
          </form>
        </div>
      </Popup>
    </div>
  );
}

export default SigninPopup;
