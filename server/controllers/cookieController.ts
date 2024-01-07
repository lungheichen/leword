import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const cookieController: any = {}

// store the user id in a cookie
cookieController.setSSIDCookie = (req: Request, res: Response, next: NextFunction) => {
  const id = res.locals.userId
  console.log(`id in cookiesController.setSSIDCookie: ${id}`)
  var token = jwt.sign(
    { 'cookieId': id },
    'secret2000',
    { expiresIn: 9000 }  // 150 minutes
  )
  // store cookie with user
  res.cookie('ssid', token, { httpOnly: true , secure: true, maxAge: 1000*9000})
  console.log("cookieController.setSSIDCookie: cookie created")
  next()
}

export default cookieController
