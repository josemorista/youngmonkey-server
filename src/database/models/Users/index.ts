import { Schema, Document } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export default userSchema;