import { Request, Response, NextFunction } from 'express'
import { Query, Document } from 'mongoose'
import { User, IUser, Score, IScore, Guess, IGuess } from '../models/userModel'
import { DeleteResult, ObjectId } from 'mongodb'

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
    // err.message = "bad"
    // err.status = 500
    // return next()
    // return next({
    //   message: 'userController.getUser: ERROR: Check server logs for details',
    //   status: 500
    // })
  }
  res.locals.user = user
  res.locals.id = user[0]._id
  
  next()
}


userController.createUser = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name
  const pass = req.body.pass
  const user: IUser = await User.create({
    name: name,
    pass: pass,
  })
  console.log('Added user on', user.last_modified)
  
  const user_id = user._id
  const win_at_try: Record<string, number> = {}
  const last_played = new Date()
  const guesses: Record<string, string> = {}
  for (let i = 1; i < 7; i++) {
    win_at_try[i] = 0
    guesses[i] = ""
  }
  const score: IScore = await Score.create({
    user_id: user_id,
    win_at_try: win_at_try,
    last_played: last_played,
  })
  const guess: IGuess = await Guess.create({
    user_id: user_id,
    attempt: 1,
    guesses: guesses
  })
  console.log('userController.createScore: added new score')
  res.locals.id = user._id
  return next()
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

// Delete All Users... not a normal thing to do
userController.deleteAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const deleteResponse: DeleteResult = await User.deleteMany({})
  res.locals.deletedCount = deleteResponse.deletedCount
  console.log(`res.locals.deletedCount = ${res.locals.deletedCount}`)
  next()
}
// for now, use:
// mongo
// use babyTracker
// db.users.deleteMany({})

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
  return next()
}


// Update score based on win attempt number
// this will be called after cookie check
// How should I store attempt?  In Score or in it's own database??
userController.updateScore = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = req.cookies.ssid // this will already check that it isn't null
  console.log(user_id)
  const updatedScore: IScore = req.body
  const score = await Score.updateOne(
    {
      _id: new ObjectId(user_id)
    },
    {
      $set: updatedScore
    }
  )
  console.log('Replaced user with _id = ', user_id)
  res.locals.user_id = user_id
  return next()
}

// db.users.update({feedAmount: 0}, {$set: {feedAmount: 10}})

export default userController
