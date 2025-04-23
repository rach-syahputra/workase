import * as Yup from 'yup';
const userAndCompanyResetPasswordSchema = () => {
  return Yup.object().shape({
    password: Yup.string()
      .required()
      .min(8, 'Password must be at least 8 characters'),
  });
};

export default userAndCompanyResetPasswordSchema;
