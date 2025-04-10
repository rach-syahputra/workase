import { Router } from 'express';
import developersController from '@/controllers/developer.controller';
export const developersRouter = () => {
  const router = Router();
  router.post('/', developersController.addDevelopers);

  return router;
};
