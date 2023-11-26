import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const cookieController: any = {}

// store the user id in a cookie
cookieController.setSSIDCookie = (req: Request, res: Response, next: NextFunction) => {
  const id = res.locals.id
  console.log(`id in cookiesController.setSSIDCookie: ${id}`)
  var token = jwt.sign(
    { 'cookieId': id },
    'secret2000',
    { expiresIn: 900 }  // 15 minutes
  )
  // store cookie with user
  res.cookie('ssid', token, { httpOnly: true , secure: true})
  next()
}

export default cookieController
