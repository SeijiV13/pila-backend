import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import { checkJwt } from '../middlewares/checkJwt';
const router = Router();

router.get('/', [checkJwt], ProfileController.listAll);
router.post('/', [checkJwt], ProfileController.newProfile);
router.get('/:id([0-9])+', [checkJwt], ProfileController.getOneById);
router.patch('/', [checkJwt], ProfileController.editProfile);
router.delete('/:id([0-9]+)', [checkJwt], ProfileController.deleteProfile);

export default router;
