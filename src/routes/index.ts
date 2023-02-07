import { Router } from 'express';

import auth from './auth';
import user from './user';
import establecimiento from './establecimientos';


const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/establecimientos', establecimiento);

export default routes;
