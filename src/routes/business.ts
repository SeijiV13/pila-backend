import { Router } from 'express';
import { checkJwt } from "../middlewares/checkJwt";
import BusinessController from '../controllers/BusinessController';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

router.get("/", [checkJwt, checkRole(["ADMIN"])], BusinessController.getBusiness)
router.post("/", [checkJwt, checkRole(["ADMIN"]), BusinessController.createBusiness])

export default router;