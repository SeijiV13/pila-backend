import { Request, Response, Router } from 'express';
import auth from './auth';
import business from './business';
import category from './category';
import profile from './profile';
import user from './user';
const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/business', business);
routes.use('/profile', profile);
routes.use('/category', category);

export default routes;
