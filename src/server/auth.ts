const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
import { secret } from '../env';

interface IDecodedApiRequest {
  id: string;
  token: string;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ errorMessage: 'Ops, token not provided.', errorCode: 'au401' });
  } else {
    const parts = auth.split(' ');
    if (!parts || !(parts.length === 2)) {
      return res.status(401).json({ errorMessage: 'Ops, token error.', errorCode: 'au402' });
    }
    const [scheme, token] = parts;
    if (!/Bearer$/i.test(scheme)) {
      return res.status(401).json({ errorMessage: 'Ops, bad formatted token.', errorCode: 'au403' });
    }
    jwt.verify(token, secret, (err: Error, decoded: IDecodedApiRequest) => {
      if (err) return res.status(401).json({ errorMessage: 'Ops, invalid token.', errorCode: 'au405' });
      req.userId = decoded.id;
      req.token = decoded.token || undefined;
      next();
    });
  }
};
