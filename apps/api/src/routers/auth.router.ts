import { Router } from 'express';
import UsersController from '../controllers/user.controller';
import CompaniesController from '../controllers/company.controller';
import {
  validateUserRegistration,
  validateUserLogin,
} from '../middlewares/user.middleware';
import {
  validateCompanyLogin,
  validateCompanyRegistration,
} from '../middlewares/company.middleware';
import { verifyRefreshToken } from '../middlewares/auth.middleware';

export const authRouter = () => {
  const router = Router();
  router.post(
    '/register/user',
    validateUserRegistration,
    UsersController.register,
  );
  router.post('/login/user', validateUserLogin, UsersController.login);
  router.post(
    '/register/company',
    validateCompanyRegistration,
    CompaniesController.register,
  );
  router.post(
    '/login/company',
    validateCompanyLogin,
    CompaniesController.login,
  );
  return router;
};
