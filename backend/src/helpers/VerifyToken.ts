import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

// Helper
import getToken from './GetToken';

dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {

  if (!req.headers.authorization) {
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized'
    });
  }

  const token = getToken(req);

  if (!token) {
      return res.status(401).json({
          status: 401,
          error: 'Token is required'
      });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid token'
    });
  }

  return req.user;
}

export default verifyToken;
