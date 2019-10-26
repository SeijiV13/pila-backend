import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import { checkJwt } from '../middlewares/checkJwt';
const router = Router();
// tslint:disable-next-line: no-var-requires
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });

router.post('/', [checkJwt], ProfileController.newProfile);
router.post(
  '/upload-profile-img',
  singleFileUpload.single('file'),
  ProfileController.uploadProfileImage
);
router.patch('/', [checkJwt], ProfileController.editProfile);

export default router;
