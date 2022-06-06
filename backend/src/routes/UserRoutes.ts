import { Router } from 'express';

import UserController from '../controllers/UserController';

// Helper
import verifyToken from '../helpers/VerifyToken';
import imageUpload from '../helpers/ImageUpload';
import isAdmin from '../helpers/IsAdmin';

const userRoute = Router();

userRoute.get('/', (req, res) => {
  res.status(200).json({
    OK: 'User Routes Connected!!!',
  });
});

userRoute.post('/register', UserController.register);
userRoute.post('/login', UserController.login);
userRoute.get('/checkToken', UserController.checkToken);
userRoute.get('/:id', UserController.getUserById);
userRoute.patch('/edit/:id', verifyToken, imageUpload.single('avatar'), UserController.updateUser);
userRoute.delete('/delete/:id', isAdmin, UserController.deleteUser);

export default userRoute;
