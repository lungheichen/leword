import { Request, Response, NextFunction } from 'express'
import Session from '../models/sessionModel'
import jwt from 'jsonwebtoken'

const sessionController: any = {}

// verify session
sessionController.isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.ssid) {
    // return res.render('./../client/signup', {error: 'cookies missing; please sign up or log in again'})
    console.log('cookies missing; please sign up or log in again')
  }
  const ssid = req.cookies.ssid
  jwt.verify(ssid, 'secret2000', (err: any, decoded: any) => {
    if (err) {
      console.log(err)
      // return res.render('./../client/signup', {error: 'session ended please sign up or log in again'})
      return next({
        log: 'sessionController.isLoggedIn: ERROR: An unexpected error occurred at cookie verification',
        message: {err: 'sessionController.isLoggedIn: ERROR: Check server logs for details'},
      })
    } else {
      console.log(decoded)
      res.locals.userId = decoded.cookieId
      console.log(`sessionController.isLoggedIn: res.locals.userId = ${res.locals.userId}`)
      next()
    }
  })
  // Session.findOne({'cookieId': id}, (err, session) => {
  //   if (!session) {
  //     // in the future, change it so that it redirects to login instead
  //     return res.render('./../client/signup', {error: 'session ended or not started please sign up or log in again'})
  //   }
  //   // do I need to check for a possible error?
  //   // console.log(`session = ${JSON.stringify(session)}`)
  //   next()
  // })
}

// start session with log-in
sessionController.startSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = res.locals.userId
    console.log(`sessionController.startSession: id = ${id}`)
    const insertSession = await Session.create({'cookieId': id})
    console.log(`insertSession = ${insertSession}`)
    next()
  } catch (err) {
    // catch errors, such as when there are duplicates
    // I think it errors out when I have a cookie already because it won't replace it?
    return next({
      log: 'sessionController.startSession: ERROR: An unexpected error occurred at session insert',
      message: {err: 'sessionController.startSession: ERROR: Check server logs for details'},
    })
  }
}

export default sessionController
