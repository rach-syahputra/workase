
import { Router } from 'express';
import usersController from '@/controllers/user.controller';
export const usersRouter = () => {
  const router = Router();
  router.post('/', usersController.addUsers);

  return router;
};
