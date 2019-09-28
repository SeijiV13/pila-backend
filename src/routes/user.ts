import { Router } from 'express';
import UserController from '../controllers/UserController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

// Get all users
router.get('/', [checkJwt, checkRole(['ADMIN'])], UserController.listAll);

// Get one user
router.get('/getone', [checkJwt], UserController.getOneByUsername);

// Create a new user
router.post('/', UserController.newUser);

// Delete one user
router.delete('/', [checkJwt], UserController.deleteUser);

export default router;
