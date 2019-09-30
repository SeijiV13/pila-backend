import { Router } from 'express';
import BusinessCategoryController from '../controllers/BusinessCategoryController';
import { checkJwt } from '../middlewares/checkJwt';

const router = Router();
// Login route
router.get('/', [checkJwt], BusinessCategoryController.getAllCategories);

export default router;
