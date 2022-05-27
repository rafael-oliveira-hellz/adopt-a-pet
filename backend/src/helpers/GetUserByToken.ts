import * as dotenv from 'dotenv';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';

// Model
import User from '../models/User';

dotenv.config();

const getUserByToken = async (token: any) => {

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });

  return user;
}

export default getUserByToken;
