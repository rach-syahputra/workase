import { Router } from 'express';

import CertificateController from '../controllers/certificate.controller';
import { verifyUser } from '../middlewares/auth.middleware';
import { uploadCertificatePdf } from '../helpers/multer';

class CertificateRouter {
  private router: Router;
  private certificateController: CertificateController;

  constructor() {
    this.certificateController = new CertificateController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/token',
      verifyUser,
      this.certificateController.generateCertificateToken,
    );
    this.router.post(
      '/',
      uploadCertificatePdf.single('pdf'),
      verifyUser,
      this.certificateController.addCertificate,
    );
    this.router.get('/:slug', this.certificateController.getCertificateDetail);
    this.router.get(
      '/:slug/metadata',
      this.certificateController.getCertificateMetadata,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default CertificateRouter;
