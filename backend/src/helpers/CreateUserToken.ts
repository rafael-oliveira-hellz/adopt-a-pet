import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

dotenv.config();

const createUserToken = (user: any, req: Request, res: Response) => {

    const SECRET = process.env.JWT_SECRET!;

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    },
    SECRET,
    {
      expiresIn: '1d',
      algorithm: "HS256"
    }
    );

    return token;
}

export default createUserToken;
