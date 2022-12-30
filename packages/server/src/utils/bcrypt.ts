import * as bcrypt from 'bcrypt';

export async function encryptPassword(password: string): Promise<string> {
  const salt = 10;
  return await bcrypt.hash(password, salt);
}

export async function checkPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
