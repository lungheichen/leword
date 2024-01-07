const getGuessColors = (answer: string, guess: string) => {
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
        // Need to check if more than one letter exists in answer
        colors[i] = 'y'
        answerLetters[guess[i]]--
      } else {
        colors[i] = 'n'
      }
    }
  }
  
  return colors
};

export default getGuessColors