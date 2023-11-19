import express, { Request, Response } from 'express'
import userController from '../controllers/userController'
import userValidation from '../validations/userValidation'
// var router = express.Router();
const router = express.Router()

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });




router.post(
  '/',
  // gather past data
  userController.getUser, // Currently is doing the validation
  // userValidation.foundUser,
  // Get Cookie, then verify this cookie for all future requests from frontend 
  // -- use jwt
  // with the cookie, allow get of past scores and post updates (instead of patch) 
  (req: Request, res: Response) => {
    res.status(200).json(`Password GOOD for ${res.locals.user}`)
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

router.post(
  '/:feedAmount',
  // userValidation.validFeedAmount,
  userController.addUser,
  userValidation.gotUser,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.log)
  }
)

// delete one.  Example:
// "61c9356a3f656caa94495769"
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

router.patch(
  '/:id',
  // userValidation.validFeedAmount, // need to change this to body?
  // userValidation.validId,  // I don't need this only valid Ids should ever pass through
  userController.updateUser,
  userValidation.gotUser,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.log)
  }
)

// export default router
// // if more than one export
module.exports = router
