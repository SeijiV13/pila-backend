import { Router } from 'express';
import MenuCategoryController from '../controllers/MenuCategoryController';
import { checkJwt } from '../middlewares/checkJwt';

const router = Router();
// Login route
router.get('/', [checkJwt], MenuCategoryController.getAllMenuCategory);
router.post('/', [checkJwt], MenuCategoryController.createMenuCategory);
export default router;
