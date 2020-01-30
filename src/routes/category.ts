import { Router } from 'express';
import BusinessCategoryController from '../controllers/BusinessCategoryController';
import { checkJwt } from '../middlewares/checkJwt';
import { Businesscategory } from './../entity/Businesscategory';

const router = Router();
// Login route
router.get('/', [checkJwt], BusinessCategoryController.getAllCategories);
router.post('/', [checkJwt], BusinessCategoryController.createCategory);
router.purge('/', [checkJwt], BusinessCategoryController.updateCategory);

export default router;
