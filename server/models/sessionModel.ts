import { Schema, model, Document } from 'mongoose'

export interface ISession extends Document {
  cookieId: string
  createdAt: Date
}

/**
* FYI, Mongo's cleanup service runs once per minute so the session could last up to 3000+60 seconds before it's deleted.
*/
const sessionSchema = new Schema<ISession>({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 900, default: Date.now }
});

const Session = model<ISession>('Session', sessionSchema)

export default Session
