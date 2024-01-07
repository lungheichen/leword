/* 
guessCheck has to be handled on the backend now.

guessCheck will take in the answer and guess and output the colors to color the guess boxes.  Colors are represented by 'g' for Green, 'y' for Yellow, and 'n' for No-color. 

I think this is a fitting place to include a dictionaryChecker helper function
*/

const guessCheck = (answer: string, guess: string) => {
  // Submit get request with body containing guess
  // response of colors as array of letters representing colors

  const uri = `${process.env.REACT_APP_SERVER}/user/guess`;
  console.log(`client: uri = ${uri}`)
  if (!uri) {
    return
  }
  return fetch(uri, {
    method: 'PATCH',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({guess: guess})
  })
    .then(res => res.json())
    .then(colors => {
      console.log(`colors = ${colors}`)
      return colors
    })
    .catch(err => console.log('loginUser: fetch /user: ERROR: ', err))
};

export default guessCheck;