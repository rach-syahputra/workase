import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { IGenerateSlugOption } from '@/interfaces/util.interface';

export const generateUUID = () => {
  return uuidv4();
};

export const generateHashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const convertDateToUTC7 = (date: Date): string => {
  const utc7Date = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  return utc7Date.toISOString();
};

export const generateRandomString = (length?: number) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
  const randomStringLength = length || 4;
  let randomString = '';

  for (let i = 0; i < randomStringLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
};

export const generateSlug = (str: string, opt?: IGenerateSlugOption) => {
  let updatedStr = str.split(' ').join('-').toLowerCase();

  if (opt?.suffix) {
    const randomString = generateRandomString(4);
    updatedStr += `-${randomString}`;
  }

  return updatedStr;
};

export const generateCertificateSlug = (length: number = 12) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let slug = '';
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return slug;
};
