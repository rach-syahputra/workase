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
