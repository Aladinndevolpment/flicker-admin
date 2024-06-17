import NextCrypto from "next-crypto";

const keyString = process.env.ENCRYPTION_KEY;
if (!keyString || keyString.length !== 32) {
  throw new Error("ENCRYPTION_KEY must be defined and 32 characters long");
}

const crypto = new NextCrypto(keyString);

export const encrypt = async (jsonData: any) => {
  return await crypto.encrypt(JSON.stringify(jsonData));
};
export const decrypt = async (encryptedData?: string) => {
  if (!encryptedData) return null;
  const decrypted_data: any = await crypto.decrypt(encryptedData);
  return JSON.parse(decrypted_data);
};
