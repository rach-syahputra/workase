import { Router } from 'express';

import { verifyRefreshToken, verifyUser } from '../middlewares/auth.middleware';
import userController from '../controllers/user.controller';

import usersController from '../controllers/user.controller';
import {
  validateNewUserPassword,
  validateEmailUser,
  validateUserProfileUpdate,
  markPasswordResetAsIncomplete,
  verifyPasswordResetStatus,
  markPasswordResetTokenAsUsed,
} from '../middlewares/user.middleware';
import { uploadUserImage } from '../helpers/multer';
import userStatsController from '../controllers/user-stats.controller';

export const usersRouter = () => {
  const router = Router();
  router.post('/token', verifyRefreshToken, usersController.refreshToken);
  //email verification
  router.post(
    '/email-verification-request',
    verifyUser,

    usersController.sendEmailVerification,
  );
  router.patch('/verify', verifyUser, usersController.verifiedEmail);
  //password reset
  router.post(
    '/password-reset-request',
    validateEmailUser,
    markPasswordResetAsIncomplete,
    userController.passwordResetRequest,
  );
  router.patch(
    '/reset-password',
    verifyUser,
    verifyPasswordResetStatus,
    validateNewUserPassword,
    markPasswordResetTokenAsUsed,
    userController.resetPassword,
  );
  //user profile management

  router.patch(
    '/',
    verifyUser,
    validateUserProfileUpdate,
    userController.updateUserProfile,
  );
  router.post(
    '/image',
    verifyUser,
    uploadUserImage.single('image'),
    userController.addImageCloudinary,
  );
  router.get('/stats', verifyUser, userStatsController.getUserStats);
  router.get(
    '/current-companies',
    verifyUser,
    userStatsController.getCurrentCompany,
  );
  router.get('/:slug/detail', userStatsController.getUserDetail);
  router.get('/:slug/metadata', userStatsController.getUserMetadata);
  return router;
};
