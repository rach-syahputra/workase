import { Router } from 'express';
import UsersController from '@/controllers/user.controller';
import CompaniesController from '@/controllers/company.controller';
import {
  validateUserRegistration,
  validateUserLogin,
} from '@/middlewares/user.middleware';

export const authRouter = () => {
  const router = Router();
  router.post(
    '/register/user',
    validateUserRegistration,
    UsersController.register,
  );
  router.post('/login/user', validateUserLogin, UsersController.login);
  router.post('/register/company', CompaniesController.register);
  router.post('/login/company', CompaniesController.login);
  return router;
};
