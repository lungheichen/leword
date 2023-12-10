import { Schema, Types, model, connect, Document } from 'mongoose'
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
  // connecting to mongosh
  // sudo service mongod start
  // mongosh --username lwadmin --password admin --host localhost --port 27017 leword

  uri = 'mongodb://lwadmin:admin@localhost:27017/leword' 
}

console.log(`NODE_ENV = ${process.env.NODE_ENV}`)

export interface IUser extends Document {
  name: string
  pass: string  // To be bcrypted
  lastModified?: Date  // Track changes to the password
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  lastModified: { type: Date, required: true, default: Date.now },
})

export const User = model<IUser>('User', userSchema)

export interface IScore extends Document {
  userId: Types.ObjectId
  winAtTry: Map<string, number>
  lastPlayed: Date
}

const scoreSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  winAtTry: { type: Map, of: Number },
  lastPlayed: Date,
})

export const Score = model<IScore>('Score', scoreSchema)

export interface IGuess extends Document {
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  attempt: number
  guesses: Map<string, string>
}

const guessSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  attempt: Number,
  guesses: Map<string, string>,
})

export const Guess = model<IGuess>('Guess', guessSchema)

main().catch((err) => console.log(err))

async function main(): Promise<void> {
  await connect(uri, options)
}
