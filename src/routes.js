import { Router } from 'express';

/**
 * Middlewares
 */
import authMiddleware from './app/middlewares/auth';

/**
 * Validations
 */

import ValidationSessionStore from './app/validations/SessionStore';
import ValidationUserStore from './app/validations/UserStore';
import ValidationUserUpdate from './app/validations/UserUpdate';

/**
 * Controllers
 */

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

const routes = new Router();

/**
 * Routes
 */

routes.get('/', (req, res) => {
  res.status(200).json({
    message: 'Api Izi Finance 1.0',
  });
});

routes.post('/login', ValidationSessionStore, SessionController.store);
routes.post('/users', ValidationUserStore, UserController.store);

/**
 * Routes Authenticated
 */

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/user/:userId', UserController.show);
routes.put('/user/:userId', ValidationUserUpdate, UserController.update);
routes.delete('/user/:userId', UserController.destroy);

export default routes;
