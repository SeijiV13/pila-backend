import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import { checkJwt } from '../middlewares/checkJwt';
const router = Router();

router.post('/', [checkJwt], ProfileController.newProfile);
router.patch('/', [checkJwt], ProfileController.editProfile);

export default router;
