import * as dotenv from 'dotenv';
import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';

// Model
import User from '../models/User';
import getToken from './GetToken';

dotenv.config();

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      status: 401,
      error: 'Acesso negado',
    });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'O token é obrigatório',
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    req.user = decoded;

    if (decoded.role !== 'admin') {
      return res.status(403).json({
        status: 403,
        error: 'Acesso negado',
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: 'Token inválido',
    });
  }

  return req.user;
};

export default isAdmin;
