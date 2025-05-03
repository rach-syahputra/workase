import { Router } from 'express';

import DeveloperController from '../controllers/developer.controller';

class DeveloperRouter {
  private router: Router;
  private developerController: DeveloperController;

  constructor() {
    this.router = Router();
    this.developerController = new DeveloperController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/auth', this.developerController.login);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default DeveloperRouter;
