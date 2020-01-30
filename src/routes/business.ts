import { Router } from 'express';
import BusinessController from '../controllers/BusinessController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
// tslint:disable-next-line: no-var-requires
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });

const router = Router();

router.get('/', [checkJwt], BusinessController.getBusiness);
router.post('/', [checkJwt, checkRole(['ADMIN']), BusinessController.createBusiness]);
router.post(
  '/upload-logo-img',
  singleFileUpload.single('file'),
  BusinessController.uploadLogoImage
);
router.delete('/', [checkJwt], BusinessController.deleteBusiness);

export default router;
