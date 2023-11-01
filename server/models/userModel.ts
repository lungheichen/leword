import { Schema, model, connect, Document } from 'mongoose'
import * as dotenv from 'dotenv'

// Enables variables from .env file as process.env
dotenv.config()

// const port = process.env.DB_PORT || 27017

interface IOptions {
  user?: string
  pass?: string
  dbName?: string
}

// mongoose.connect('mongodb://username:password@host:port/database?options...');
let uri: string
const options: IOptions = {}
if (process.env.NODE_ENV === 'production') {
  options.user = process.env.DB_USER
  options.pass = process.env.DB_PASS
  options.dbName = process.env.DB_NAME
  // options.host = process.env.DB_HOST
  // options.port = process.env.DB_PORT
  uri = `mongodb+srv://${options.user}:${options.pass}@cluster0.crqzwnh.mongodb.net/?retryWrites=true&w=majority`
} else if (process.env.NODE_ENV === 'development') {
  options.user = process.env.DB_USER
  options.pass = process.env.DB_PASS
  options.dbName = process.env.DB_NAME
  // uri = 'mongodb://btadmin:admin@baby_tracker-db:27017/leword?authSource=admin'
  uri = 'mongodb://lwadmin:admin@db:27017/leword?authSource=admin'
} else if (process.env.NODE_ENV === 'devlocal') {
  // this is for non-containerized local development
  // options.user = process.env.DB_USER
  // options.pass = process.env.DB_PASS
  // options.dbName = process.env.DB_NAME
  // uri = 'mongodb://btadmin:admin@baby_tracker-db:27017/leword?authSource=admin'
  uri = 'mongodb://lwadmin:admin@localhost:27017/leword?authSource=admin' 
}

console.log(`NODE_ENV = ${process.env.NODE_ENV}`)

export interface IUser extends Document {
  name: string
  pass: string  // To be bcrypted
  last_modified: string  // Track changes to the password
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  last_modified: { type: String, required: true },
})

const User = model<IUser>('User', userSchema)

main().catch((err) => console.log(err))

async function main(): Promise<void> {
  await connect(uri, options)
}

export default User
