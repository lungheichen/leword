/* 
getKeyboardColors is a helper to figure out colors for the keyboard
*/

const getKeyboardColors = (keyboardColors: {[letters: string]: string}, guess: string, guessColors: string[]) => {
  const colorRank: {[colors: string]: number} = {' ': 0, 'n': 1, 'y': 2, 'g': 3}
  // guess will be letters of current row before moving on to the next row.
  // guessColors will be colors for the current row before moving on to the next row.
  for (let i = 0; i < guess.length; i += 1) {
    const rankGuess = colorRank[guessColors[i]];
    const rankKeyboardLetter = colorRank[keyboardColors[guess[i]]];
    if (rankGuess > rankKeyboardLetter) {
      keyboardColors[guess[i]] = guessColors[i]
    }
  }
  return keyboardColors;
};

export default getKeyboardColors;