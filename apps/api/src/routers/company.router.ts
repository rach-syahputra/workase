import { Router } from 'express';
import companiesController from '@/controllers/company.controller';
export const companiesRouter = () => {
  const router = Router();
  // router.post('/', companiesController.addCompanies);

  return router;
};
