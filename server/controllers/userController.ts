import { Request, Response, NextFunction } from 'express'
import { Query, Document } from 'mongoose'
import { User, IUser, Score, IScore, Guess, IGuess } from '../models/userModel'
import { DeleteResult, ObjectId } from 'mongodb'
import getGuessColors from '../helpers/getGuessColors'

const userController: any = {}

// interface ProjectQueryHelpers {
//   byName(name: string): Query<any, Document<User>> & ProjectQueryHelpers
// }

userController.getUser = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name
  const pass = req.body.pass
  console.log(`getUser: name = ${name}`)
  const user = await User.find({
    name: name,
    pass: pass
  })
  console.log('user found; data:')
  console.log(user)
  if (user.length != 1) {
    return next({
      log: 'userController.getUser: ERROR: No data from database query - Expected res.locals.user to be non-empty object',
      message: {err: 'userController.getUser: ERROR: Check server logs for details'},
    })
    // res.locals.error = 'userController.getUser: ERROR: Check server logs for details'
    // err.message = 'bad'
    // err.status = 500
    // return next()
    // return next({
    //   message: 'userController.getUser: ERROR: Check server logs for details',
    //   status: 500
    // })
  }
  res.locals.user = user
  res.locals.userId = user[0]._id
  
  next()
}


/**
 * Get answer and put it into res.locals
 * Can be from database or read from local file
 */
userController.getAnswer = (req: Request, res: Response, next: NextFunction) => {
  res.locals.answer = 'apple'
  next()
}

/**
 * Get saved guesses for login and when returning to a daily game
 * this will be called after cookie check
 */
userController.getSavedGuesses = async (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.userId
  const guess = await Guess.findOne(
    { userId: new ObjectId(userId) }
  )
  console.log("userController.getSavedGuesses: guess = ")
  console.log(guess)
  if (!guess) {
    return next({
      log: 'userController.getSavedGuesses: ERROR: no guess document found for the user',
      message: {err: 'userController.getSavedGuesses: ERROR: Check server logs for details'},
    })
  }
  res.locals.guesses = guess.guesses
  next()
}


/**
 * Determine colors for all guesses at once
 * Place them in res.locals.colorsArr
 */
userController.getColors = async (req: Request, res: Response, next: NextFunction) => {
  const guesses: IGuess['guesses'] = res.locals.guesses
  const answer = res.locals.answer

  var colorsArr = []
  // for each guess, determine color
  for (let i = 1; i < guesses.size + 1; i++) {
    const guess = guesses.get(i.toString())
    if (!guess) {
      console.log(`userController.getColors: guesses didn't find key ${i}`)
      continue
    }
    console.log(`userController.compareGuess: guess = ${guess}`)
    // Set up database for daily answers to compare to
    // set up so that database...
    
    // build array of string of letters representing colors to send back in json
    const colors = getGuessColors(answer, guess)
    colorsArr.push(colors)
  }

  res.locals.colorsArr = colorsArr

  next()
}


userController.createUser = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name
  const pass = req.body.pass
  // Validation: check if user name already exists
  const user: IUser = await User.create({
    name: name,
    pass: pass,
  })
  console.log('Added user on', user.lastModified)
  
  const userId = user._id
  const winAtTry: Record<string, number> = {}
  const lastPlayed = new Date()
  const guesses: Record<string, string> = {}
  for (let i = 1; i < 7; i++) {
    winAtTry[i] = 0
    guesses[i] = ''
  }
  const score: IScore = await Score.create({
    userId: userId,
    winAtTry: winAtTry,
    lastPlayed: lastPlayed,
  })
  const guess: IGuess = await Guess.create({
    userId: userId,
    attempt: 1,
    guesses: guesses
  })
  console.log('userController.createScore: added new score')
  res.locals.userId = user._id
  next()
}


userController.getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.find({})
  res.locals.users = users
  next()
}


// Delete One User...
userController.deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const _id: string = req.body._id // this will already check that it isn't null
  const deleteResponse: DeleteResult = await User.deleteOne({
    _id: new ObjectId(_id)
  })
  res.locals.deletedCount = deleteResponse.deletedCount
  console.log(`res.locals.deletedCount = ${res.locals.deletedCount}`)
  res.locals._id = _id
  next()
}

// Delete all users, guesses, and scores ... not a normal thing to do
userController.deleteAll = async (req: Request, res: Response, next: NextFunction) => {
  const deleteResponseUsers: DeleteResult = await User.deleteMany({})
  const deleteResponseScores: DeleteResult = await Score.deleteMany({})
  const deleteResponseGuesses: DeleteResult = await Guess.deleteMany({})
  if (
    deleteResponseUsers != deleteResponseScores && deleteResponseUsers != deleteResponseGuesses
  ) {
    return next({
      log: 'userController.deleteAll: ERROR: deleted more score or guess documents than user documents',
      message: {err: 'userController.deleteAll: ERROR: Check server logs for details'},
    })
  }
  res.locals.deletedCount = deleteResponseUsers.deletedCount
  console.log(`res.locals.deletedCount = ${res.locals.deletedCount}`)
  next()
}
// though mongo:
// mongo
// use leword
// db.users.deleteMany({})
// db.guesses.deleteMany({})
// db.scores.deleteMany({})

// should be able to update date, time, or feed amount using id
userController.updateUser = async (req: Request, res: Response, next: NextFunction) => {
  // format should be:
  // day: Sun Jan 02 2022
  // time: 19:27:59 GMT-0500 (Eastern Standard Time)
  // feedAmount: number
  // const _id = req?.params?._id  // https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial suggested using those question marks
  const _id = req.params.id // this will already check that it isn't null
  const updatedUser: IUser = req.body
  const user = await User.updateOne(
    {
      _id: new ObjectId(_id)
    },
    {
      $set: updatedUser
    }
  )
  console.log('Replaced user with _id = ', _id)
  res.locals.user = user
  next()
}


// Compare guess to answer
userController.compareGuess = (req: Request, res: Response, next: NextFunction) => {
  const guess: string = req.body.guess.toLowerCase()
  console.log(`userController.compareGuess: guess = ${guess}`)
  const answer = res.locals.answer
  // Set up database for daily answers to compare to
  // set up so that database...
  
  // build array of string of letters representing colors to send back in json
  const colors = getGuessColors(answer, guess)
  res.locals.colors = colors
  
  res.locals.isCorrect = (guess === answer)
  res.locals.guess = guess
  next()
}

// Get current attempt from the guess document
// in order to determine current attempt value
// e.g., used in userController.updateGuess for updating guesses
userController.getCurrentAttempt = async (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.userId
  const guess = await Guess.findOne(
    {
      userId: new ObjectId(userId)
    }
  )
  // Perform all checks on guess; e.g., 6 attempts
  if (!guess) {
    return next({
      log: 'userController.updateGuess: ERROR: No data from database query - Expected guess to be non-empty object',
      message: {err: 'userController.updateGuess: ERROR: Check server logs for details'},
    })
  }
  res.locals.attempt = guess.attempt

  next()
}

/**
 * Update guess document based on win attempt number
 * this will be called after cookie check
 */
userController.updateGuess = async (req: Request, res: Response, next: NextFunction) => {
  var attemptIncrement = 0
  if (!res.locals.isCorrect) {
    // increase attempt
    attemptIncrement = 1
  }
  const userId = res.locals.userId
  const attempt = res.locals.attempt
  const currentGuess = res.locals.guess
  const updateDetails = await Guess.updateOne(
    { userId: new ObjectId(userId) },
    {
      // increment attempt if guess is wrong; otherwise, don't increment
      $inc: { 'attempt': attemptIncrement },  
      $set: {  // keep the document, but modify one field
        [`guesses.${attempt}`]: currentGuess
      }
    }
  )

  console.log("userController.updateGuess: updateDetails = ")
  console.log(updateDetails)
  next()
}


/**
 * Update score document if guess is correct
 */
userController.updateScore = async (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.isCorrect) {
    // increase attempt
    const userId = res.locals.userId
    const attempt = res.locals.attempt
    const score = await Score.updateOne(
      {
        userId: new ObjectId(userId)
      },
      {
        $inc: { [`winAtTry.${attempt}`]: 1 }
      }
    )
    console.log('userController.updateScore: score increased by one')
    return next()
  }
  // Else: wrong answer so handled alraedy by to userController.updateGuess!
  next()
}


// Update score based on win attempt number
// this will be called after cookie check
// How should I store attempt?  In Score or in it's own database??
// or just call it handle attempt
userController.resetGuesses = async (req: Request, res: Response, next: NextFunction) => {
  // increase attempt
  const userId = res.locals.userId
  const guess = await Guess.updateOne(
    {
      userId: new ObjectId(userId)
    },
    {
      $set: { 
        'attempt': 1,
        'guesses': {
          '1': '', '2': '', '3': '', '4': '', '5': '', '6': ''
        }
      }
    }
  )

  console.log("userController.resetGuesses: reset complete")
  // Else: correct answer so go to userController.updateScore!
  next()
}


// db.users.update({feedAmount: 0}, {$set: {feedAmount: 10}})

export default userController
