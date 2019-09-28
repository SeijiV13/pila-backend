import { Router } from 'express';
import BusinessController from '../controllers/BusinessController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

router.get('/', [checkJwt], BusinessController.getBusiness);
router.post('/', [checkJwt, checkRole(['ADMIN']), BusinessController.createBusiness]);
router.delete('/', [checkJwt], BusinessController.deleteBusiness);

export default router;
