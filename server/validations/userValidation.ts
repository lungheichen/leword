import { Request, Response, NextFunction } from 'express'
// import { isNumber } from '../helpers/validValues'

const userValidation: any = {}

userValidation.gotUsers = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.users) {
    return next({
      log: 'userValidation.gotUsers: ERROR: Invalid or unfound required data on res.locals object - Expected res.locals.users to be an object.',
      error: { err: 'userValidation.gotUsers: ERROR: Check server logs for details' }
    })
  } else if (res.locals.users.length < 1) {
    console.log('No users found confirm that this is correct')
  }
  return next()
}

// userValidation.validFeedAmount = (req: Request, res: Response, next: NextFunction) => {
//   // yeah, this is sloppy, but I have feed amount coming in as either through req.params through addUser or req.body through updateUser
//   let feedAmount: string
//   if (req.params.feedAmount) {
//     feedAmount = req.params.feedAmount
//   } else {
//     feedAmount = req.body.feedAmount
//   }
//   if (!isNumber(feedAmount)) {
//     return next({
//       log: `userValidation.validFeedAmount: ERROR: Invalid or unfound required data on req.params - Expected req.params.feedAmount (${feedAmount}) to be a number.`,
//       error: { err: `userValidation.validFeedAmount: ERROR: req.params.feedAmount (${feedAmount}) should be a number` }
//     })
//   } else if (+feedAmount < 0) {
//     return next({
//       log: 'userValidation.validFeedAmount: ERROR: Invalid or unfound required data on req.params - Expected req.params.feedAmount to be greater than or equal to zero.',
//       error: {
//         err: 'userValidation.validFeedAmount: ERROR: req.params.feedAmount should not be negative. What are you, crazy??? You cannot steal milk from the baby'
//       }
//     })
//   }
//   return next()
// }

userValidation.gotUser = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.user) {
    return next({
      log: 'userValidation.gotUser: ERROR: Invalid or unfound required data on res.locals object - Expected res.locals.user to be an object.',
      error: { err: 'userValidation.gotUser: ERROR: Check server logs for details' }
    })
    // } else if (res.locals.user.length !== 1) {
    //   // this is intentionally incorrect to check on error middleware
    //   // res.locals.user does not have property "length"
    //   return next({
    //     log: 'userValidation.gotUser: ERROR: No user - Expected res.locals.user to be of length 1.',
    //     error: { err: 'userValidation.gotUser: ERROR: Check server logs for details' }
    //   })
  // } else if (res.locals.user === {}) {  // Typescript notes this doesn't work
  } else if (res.locals.user.length == 0) {
    return next({
      log: 'userValidation.gotUser: ERROR: No user - Expected res.locals.user to not be empty',
      error: { err: 'userValidation.gotUser: ERROR: Check server logs for details' }
    })
  }
  return next()
}

userValidation.deletedUser = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.deletedCount) {
    return next({
      log: 'userValidation.deletedUser: ERROR: Invalid or unfound required data on res.locals object - Expected res.locals.deletedCount to be an object.',
      error: { err: 'userValidation.deletedUser: ERROR: Check server logs for details' }
    })
  } else if (res.locals.deletedCount !== 1) {
    return next({
      log: 'userValidation.deletedUser: ERROR: No user - Expected res.locals.deletedCount to be 1.',
      error: { err: 'userValidation.deletedUser: ERROR: Check server logs for details' }
    })
  }
  return next()
}

export default userValidation
