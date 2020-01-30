import { Router } from 'express';
import BusinessMenuController from '../controllers/BusinessMenuController';
import { checkJwt } from '../middlewares/checkJwt';
const router = Router();

router.get('/', [checkJwt], BusinessMenuController.getAllBusinessMenu);
router.get('/getbybusiness', [checkJwt], BusinessMenuController.getAllBusinessMenuOfOneBusiness);
router.post('/', [checkJwt], BusinessMenuController.createBusinessMenu);
export default router;
