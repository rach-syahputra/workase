import { Router } from 'express';
import UsersController from '@/controllers/user.controller';
import CompaniesController from '@/controllers/company.controller';
export const authRouter = () => {
  const router = Router();
  router.post('/register/user', UsersController.register);
  router.post('/login/user', UsersController.login);
  router.post('/register/company', CompaniesController.register);
  router.post('/login/company', CompaniesController.login);
  return router;
};
