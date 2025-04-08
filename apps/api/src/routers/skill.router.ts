import { Router } from 'express';

import SkillController from '@/controllers/skill.controller';
import { verifyDeveloper } from '@/middlewares/auth.middleware';

class SkillRouter {
  private router: Router;
  private skillController: SkillController;

  constructor() {
    this.router = Router();
    this.skillController = new SkillController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', verifyDeveloper, this.skillController.getSkills);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default SkillRouter;
