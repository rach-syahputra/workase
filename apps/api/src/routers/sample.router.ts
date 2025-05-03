import { Router } from 'express';

import SampleController from '@/controllers/sample/sample.controller';
import { uploadDeveloperImage } from '@/helpers/multer';

class SampleRouter {
  private router: Router;
  private sampleController: SampleController;

  constructor() {
    this.sampleController = new SampleController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.sampleController.getSample);
    this.router.get('/:email', this.sampleController.getSampleByEmail);
    this.router.post(
      '/',
      uploadDeveloperImage.single('image'),
      this.sampleController.addSample,
    );
    this.router.post('/auth', this.sampleController.login);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default SampleRouter;
