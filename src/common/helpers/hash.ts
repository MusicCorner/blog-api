import * as bcrypt from 'bcryptjs';

export const generateHash = async (text: string) => {
  const salt = await bcrypt.genSalt();

  return bcrypt.hash(text, salt);
};

export const compareHashWithText = (text: string, hash: string) =>
  bcrypt.compare(text, hash);
