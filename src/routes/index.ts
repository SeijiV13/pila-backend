import { Request, Response, Router } from 'express';
import auth from './auth';
import business from './business';
import user from './user';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/business', business);

export default routes;
