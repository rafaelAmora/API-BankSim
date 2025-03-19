import bcrypt from "bcrypt";

export async function passwordEncryption(passWord: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(passWord, salt);
  return hash;
}
