import { genSalt, hash } from 'bcrypt';
export const hashedPassword = async (
  password: string,
  numberSalt: number = 10,
) => {
  const salt = await genSalt(numberSalt);
  return await hash(password, salt);
};
