import { Request, Response } from 'express';
import UserController from "../controllers/UserController";

const validateUserData = (user: Object, req: Request, res: Response): Promise<Response> => {

  // Verifica de forma genérica se um campo do usuário não foi enviado no body da requisição



  return res.status(200);
}
