import { Schema } from 'mongoose';
import mongoose from '../database/_dbConnection';
import { IUser } from '../types/User';

const User = mongoose.model<IUser>(
  'User',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: false,
      },
      role: {
        type: String,
        required: false,
        enum: ['user', 'admin'],
        default: 'user',
      },
    },
    { timestamps: true }
  )
);

export default User;
