import { Router } from 'express';

import { verifyUser } from '@/middlewares/auth.middleware';
import CvController from '@/controllers/cv.controller';

class CvRouter {
  private router: Router;
  private cvController: CvController;

  constructor() {
    this.cvController = new CvController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', verifyUser, this.cvController.addCv);
    this.router.get('/:slug', this.cvController.getCvBySlug);
    this.router.patch('/:cvId', verifyUser, this.cvController.updateCv);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default CvRouter;
