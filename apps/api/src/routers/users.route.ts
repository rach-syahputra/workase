import {
  verifyCompany,
  verifyRefreshToken,
  verifyUser,
} from '@/middlewares/auth.middleware';
import userController from '@/controllers/user.controller';

import { Router } from 'express';
import usersController from '@/controllers/user.controller';
import {
  validateNewUserPassword,
  validateEmailUser,
  validateUserProfileUpdate,
  markPasswordResetAsIncomplete,
  verifyPasswordResetStatus,
  markPasswordResetTokenAsUsed,
} from '@/middlewares/user.middleware';
import { uploadUserImage } from '@/helpers/multer';
import userStatsController from '@/controllers/user-stats.controller';
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
  router.get('/', verifyUser, userController.getUserProfile); //yang ini perlu dikaji ulang, soalnya data profile user udah di up lewat access token
  router.patch(
    '/',
    verifyUser,
    validateUserProfileUpdate,
    userController.updateUserProfile,
  ); // yang ini juga ngga` perlu ngembalikan data profile user, soalnya sudah di up lewat access token
  router.post(
    '/image',
    verifyUser,
    uploadUserImage.single('image'),
    userController.addImageCloudinary,
  );
  router.get('/stats', verifyUser, userStatsController.getUserStats);
  return router;
};
