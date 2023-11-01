import { Request, Response, NextFunction } from 'express'
import { Query, Document } from 'mongoose'
import User, { IUser } from '../models/userModel'
import { DeleteResult, ObjectId } from 'mongodb'

const userController: any = {}

// interface ProjectQueryHelpers {
//   byName(name: string): Query<any, Document<User>> & ProjectQueryHelpers
// }

userController.getUser = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name
  const password = req.body.password
  console.log(`name = ${name}`)
  const user = await User.find({
    name: name,
    pass: password
  })
  res.locals.user = user
  next()
}



userController.getUsers = async (req: Request, res: Response, next: NextFunction) => {
  await User.find({}, null, (err: Error, users: Query<any, Document<IUser>>) => {
    if (err) {
      // Check this again
      console.log('we have a problem with getUsers...')
    }
    console.log()
    res.locals.users = users
    next()
  })
}

userController.addUser = async (req: Request, res: Response, next: NextFunction) => {
  const last_modified = new Date()
  const name = req.params.name
  const pass = req.params.pass
  const user: IUser = await User.create({
    name: name,
    pass: pass,
    last_modified: last_modified.toTimeString()
  })
  console.log('Added user on', user.last_modified)
  res.locals.user = user
  return next()
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

// db.users.update({feedAmount: 0}, {$set: {feedAmount: 10}})

export default userController
