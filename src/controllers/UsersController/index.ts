import db from '../../database';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { secret } from '../../env';


class UsersController {
  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await db.Users.findOne({ _id: id });
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: 'Ops! ' + error.message || '', errorCode: error.name || 'us000' });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const { email, password, invitedBy } = req.body;
      const user = await db.Users.findOne({ email }).select('+password');
      if (!user) {
        let notFoundError = new Error('user not found.');
        notFoundError.name = 'us001';
        throw notFoundError;
      } else {
        if (!(await bcrypt.compare(password, user.password))) {
          let wrongPasswordError = new Error('wrong password.');
          wrongPasswordError.name = 'us002';
          throw wrongPasswordError;
        } else {
          const token = jwt.sign({ id: user._id }, secret, {
            expiresIn: 86400,
          });
          return res.json({ userId: user._id, token });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: 'Ops! ' + error.message || '', errorCode: error.name || 'us000' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const user = await db.Users.create({ ...req.body });
      user.password = await bcrypt.hash(user.password, 10);
      await user.save();
      const token = jwt.sign({ id: user._id }, secret, {
        expiresIn: 86400,
      });
      return res.json({ userId: user._id, token });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: 'Ops! ' + error.message || '', errorCode: error.name || 'us000' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = await db.Users.updateOne({ _id: req.userId }, { $set: { ...req.body } });
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: 'Ops! ' + error.message || '', errorCode: error.name || 'us000' });
    }
  }

  async verifyToken(req: Request, res: Response) {
    const token = String(req.headers.authorization || req.body.token);
    if (!token) {
      return res.json({ valid: false });
    } else {
      jwt.verify(token, secret, (error) => {
        if (error) return res.json({ valid: false });
        return res.json({ valid: true });
      });
    }
  }
}

export default UsersController;
