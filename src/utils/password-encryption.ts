import bcrypt from "bcrypt";

export async function passwordEncryption(passWord: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(passWord, salt);
  return hash;
}

export async function passwordEncryptionValidation(
  passWord: string,
  hashDB: string
) {
  const validation = await bcrypt.compare(passWord, hashDB);
  return validation;
}
