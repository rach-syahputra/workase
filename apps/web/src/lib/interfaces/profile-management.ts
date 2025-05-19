import * as Yup from 'yup';
export const UpdateSchema = Yup.object().shape({
  name: Yup.string().optional(),
  phoneNumber: Yup.string()
    .optional()
    .min(8, 'Telp must be at least 8 characters')
    .max(15, 'Telp must be at most 15 characters')
    .matches(
      /^[\d\s()+-]+$/,
      'Nomor telepon hanya boleh berisi angka, spasi, (), +, dan -',
    ),
  category: Yup.string().optional(),
  location: Yup.string().optional(),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  placeOfBirth: Yup.string().optional(),
  dateOfBirth: Yup.date().optional(),
  gender: Yup.string()
    .oneOf(['MALE', 'FEMALE'], 'Gender must be either "MALE" or "feMALE"')
    .optional(),
  lastEducation: Yup.string().optional(),
  address: Yup.string().optional(),
});
export interface IUpdateForm {
  name: string;
  phoneNumber: string;
  category: string;
  location: string;
  description: string;
  email: string;
  placeOfBirth: string;
  dateOfBirth: Date;
  gender: 'MALE' | 'FEMALE';
  lastEducation: string;
  address: string;
}
export const roleUrl = {
  ADMIN: 'companies',
  USER: 'users',
};
