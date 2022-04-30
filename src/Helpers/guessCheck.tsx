/* 
guessCheck will take in the answer and guess and output the colors to color the guess boxes.  Colors are represented by 'g' for Green, 'y' for Yellow, and 'n' for No-color. 

I think this is a fitting place to include a dictionaryChecker helper function
*/

const guessCheck = (answer: string, guess: string) => {
  // dictionaryChecker should go here before even checking the guess
  // get dict of letter count in answer
  const answerLetters: {[letter: string]: number} = {}
  for (let i = 0; i < answer.length; i++) {
    const letter = answer[i]
    if (letter in answerLetters) {
      answerLetters[letter]++
    } else {
      answerLetters[letter] = 1
    }
  }

  let colors = []
  for (let i = 0; i < answer.length; i++) {
    colors.push('')
  }
  for (let i = 0; i < guess.length; i++) {
    // evalute for Green
    if (guess[i] === answer[i]) {
      colors[i] = 'g'
      answerLetters[guess[i]]--
    }
  }
  for (let i = 0; i < guess.length; i++) {
    // then evaluate for Yellow or No-color
    if (colors[i] === '') {
      if (answerLetters[guess[i]] > 0) {
        colors[i] = 'y'
        answerLetters[guess[i]]--
      } else {
        colors[i] = 'n'
      }
    }
  }
  
  // failed attempt
  // let colors = '';
  // actually need to go through over correct answers,
  // then over off guesses
  // mistake from APPLE from PPPXX --- gives ygg00 instead of 0gg00
  // for (let i = 0; i < guess.length; i++) {
  //   const letter = guess[i]
  //   if (letter in answerLetters) {
  //     if (letter === answer[i]) {
  //       colors += 'g'
  //       answerLetters[letter]--

  //     } else if (answerLetters[letter] > 0) {
  //       colors += 'y'
  //       answerLetters[letter]--
  //     } else {
  //       colors += '0'
  //     }
  //   } else {
  //     colors += '0'
  //   }
  // }

  return colors
};

export default guessCheck;