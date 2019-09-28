import { Request, Response, Router } from 'express';
import auth from './auth';
import business from './business';
import profile from './profile';
import user from './user';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/business', business);
routes.use('/profile', profile);

export default routes;
