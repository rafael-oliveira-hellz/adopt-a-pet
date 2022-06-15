import { Schema } from 'mongoose';
import mongoose from '../database/_dbConnection';
import { IPet } from '../types/Pet';

const User = mongoose.model<IPet>(
  'Pet',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      breed: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      images: {
        type: [String],
        required: false,
      },
      available: {
        type: Boolean,
        required: false,
        default: true,
      },
      user: {
        type: Object,
        ref: 'User',
        required: true,
      },
      adopter: {
        type: Object,
        ref: 'User',
        required: false,
      },
    },
    { timestamps: true }
  )
);

export default User;
