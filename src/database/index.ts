import mongoose from 'mongoose';
import { database } from '../env';
import User, { IUser } from './models/Users';
import Tiles, { ITiles } from './models/Tiles';

mongoose.connect(String(database), { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = {
  Tiles: mongoose.model<ITiles>('tiles', Tiles, 'tiles'),
  Users: mongoose.model<IUser>('users', User, 'users')
};

export { ITiles, IUser };

export default db;
