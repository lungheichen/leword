import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const cookieController: any = {};

// store the user id in a cookie
cookieController.setSSIDCookie = (req: Request, res: Response, next: NextFunction) => {
  const id = res.locals.id
  var token = jwt.sign(
    { 'cookieId': id }, 
    'mySecretKey101', 
    { expiresIn: 300 }  // 5 minutes
  );
  res.cookie('ssid', token, { httpOnly: true , secure: true})
  next()
}

export default cookieController
