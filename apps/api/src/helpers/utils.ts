import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export const generateUUID = () => {
  return uuidv4();
};

export const generateHashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};
