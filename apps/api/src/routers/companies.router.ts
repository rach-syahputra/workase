import { Router } from 'express';
import companiesController from '@/controllers/company.controller';
import {
  verifyCompany,
  verifyRefreshToken,
} from '@/middlewares/auth.middleware';
import companyController from '@/controllers/company.controller';
import {
  validateCompanyProfileUpdate,
  validateEmailCompany,
  validateNewCompanyPassword,
} from '@/middlewares/company.middleware';
import { uploadCompanyImage } from '@/helpers/multer';
export const companiesRouter = () => {
  const router = Router();
  router.post('/token', verifyRefreshToken, companiesController.refreshToken);
  //email verification
  router.post(
    '/email-verification-request',
    verifyCompany,
    companiesController.sendEmailVerification,
  );
  router.patch('/verify', verifyCompany, companiesController.verifiedEmail);
  //password reset
  router.post(
    '/password-reset-request',
    validateEmailCompany,
    companyController.passwordResetRequest,
  );
  router.patch(
    '/reset-password',
    verifyCompany,
    validateNewCompanyPassword,
    companyController.resetPassword,
  );
  //company profile management
  router.get('/', verifyCompany, companiesController.getCompanyProfile);
  router.patch(
    '/',
    verifyCompany,
    validateCompanyProfileUpdate,
    companiesController.updateCompanyProfile,
  );
  router.post(
    '/image',
    verifyCompany,
    uploadCompanyImage.single('image'),
    companiesController.addImageCloudinary,
  );
  return router;
};
