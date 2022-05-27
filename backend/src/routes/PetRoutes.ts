import { Router } from 'express';
import PetController from '../controllers/PetController';

const petRoute = Router();

// Middlewares
import verifyToken from '../helpers/VerifyToken';
import imageUpload from '../helpers/ImageUpload';
import isAdmin from '../helpers/IsAdmin';

petRoute.post(
  '/create',
  verifyToken,
  imageUpload.array('avatars', 10),
  PetController.create
);

petRoute.get('/', PetController.listAllPets);
petRoute.get('/my-pets', verifyToken, PetController.listAllPetsByUser);
petRoute.get('/:id', PetController.getPetById);
petRoute.get('/my-adoptions', verifyToken, PetController.listAllAdoptionsByUser);
petRoute.get('/all-adoptions', isAdmin, PetController.listAllAdoptions);
petRoute.delete('/:id', verifyToken, PetController.removePetById);
petRoute.patch(
  '/:id',
  verifyToken,
  imageUpload.array('avatars', 10),
  PetController.updatePet
);

petRoute.patch('/schedule/:id', verifyToken, PetController.scheduleAdoption);
petRoute.patch('/conclude/:id', verifyToken, PetController.concludeAdoption);
petRoute.patch('/cancel/:id', verifyToken, PetController.cancelAdoption);


export default petRoute;
