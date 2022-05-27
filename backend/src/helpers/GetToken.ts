import { Request } from 'express';

const getToken = (req: Request) => {

    const authToken = req.headers.authorization;
    const token = authToken && authToken.split(' ')[1];

    return token;
}

export default getToken;
