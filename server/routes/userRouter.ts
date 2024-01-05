import express, { Request, Response } from 'express'
import userController from '../controllers/userController'
import cookieController from '../controllers/cookieController'
import sessionController from '../controllers/sessionController'
import userValidation from '../validations/userValidation'
// var router = express.Router();
const router = express.Router()

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });



/**
 * Post request to authenticate user with password,
 * then store user id in a cookie,
 * and create and save a new session into the database
 */ 
router.post(
  '/',
  // gather past data
  userController.getUser, // Currently is doing the validation
  // then check on last played date to match with today's date
  // then check on attempt number
  // userValidation.foundUser,
  // Get Cookie, then verify this cookie for all future requests from frontend 
  // -- use jwt
  cookieController.setSSIDCookie,
  // then set up session that checks if the _id from the cookie has not expired
  // with the session, allow GET request of past scores and POST request updated scores (instead of patch)
  sessionController.startSession,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.user)
    // res.status(200).json({})
  }
)


/**
 * Post request to create user and its associated guess and score models,
 * then store user id in a cookie,
 * and create and save a new session into the database
 */ 
router.post(
  '/create',
  // gather past data
  userController.createUser, // Currently is doing the validation
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req: Request, res: Response) => {
    res.status(200).json({})
  }
)


/**
 * Compare answer to guess,
 * check cookie,
 * then update score and guess document tied to userId
 */
router.patch(
  '/guess/',
  sessionController.isLoggedIn,
  userController.compareGuess,  // check based on date or answer_id
  // and pass right or wrong
  userController.getCurrentAttempt,
  userController.updateAttempt,  // update attempt if guess is wrong
  userController.updateScore,  // update score if guess is correct
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.isCorrect)
  }
)


router.put(
  '/guess/reset/',
  sessionController.isLoggedIn,
  userController.resetGuesses,
  (req: Request, res: Response) => {
    res.status(200).json({})
  }
)


router.get(
  '/',
  // gather past data
  userController.getUsers, // Currently is doing the validation
  // userValidation.foundUser,
  // Get Cookie, then verify this cookie for all future requests from frontend 
  // -- use jwt
  // with the cookie, allow get of past scores and post updates (instead of patch) 
  (req: Request, res: Response) => {
    res.status(200).json(`Users: ${res.locals.users}`)
  }
)


// delete one.  Example:
// '61c9356a3f656caa94495769'
router.delete('/', userController.deleteUser, userValidation.deletedUser, (req: Request, res: Response) => {
  res.status(200).json(`deleted log with _id: ${res.locals._id}`)
})


router.delete(
  '/all',
  userController.deleteAllUsers,
  // userValidation.deletedUser,
  (req: Request, res: Response) => {
    res.status(200).json(`deleted logs. Total logs: ${res.locals.deletedCount}`)
  }
)

// export default router
// // if more than one export
module.exports = router
