import { Schema, model, Document } from 'mongoose'

export interface ISession extends Document {
  cookieId: string
  created_at: Date
}

/**
* FYI, Mongo's cleanup service runs once per minute so the session could last up to 900+60 seconds before it's deleted.
*/
const sessionSchema = new Schema<ISession>({
  cookieId: { type: String, required: true, unique: true },
  created_at: { type: Date, expires: 900, default: Date.now }
});

const Session = model<ISession>('Session', sessionSchema)

export default Session
