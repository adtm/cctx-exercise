import * as crypto from "crypto";

function generateKey(): Buffer {
  const salt: string = process.env.SALT;
  const hash: crypto.Hash = crypto.createHash(process.env.HASH_ALGORITHM);
  hash.update(salt);

  const key = hash.digest().slice(0, 32);
  return key;
}

function encrypt(encodeText: string): string {
  const key: Buffer = generateKey();
  const iv: Buffer = crypto.randomBytes(parseInt(process.env.IV_COUNT, 10));

  const cipher: crypto.Cipher = crypto.createCipheriv(
    process.env.ENCRYPT_ALGORITHM,
    Buffer.from(key),
    iv,
  );

  let encryptedText: Buffer = cipher.update(encodeText);
  encryptedText = Buffer.concat([encryptedText, cipher.final()]);

  return `${iv.toString("hex")}:${encryptedText.toString("hex")}`;
}

function decrypt(decodeText: string): string {
  const key: Buffer = generateKey();

  const splitText: string[] = decodeText.split(":");
  const iv: Buffer = Buffer.from(splitText.shift(), "hex");

  const encryptedText: Buffer = Buffer.from(splitText.shift(), "hex");
  const decipher: crypto.Decipher = crypto.createDecipheriv(
    process.env.ENCRYPT_ALGORITHM,
    Buffer.from(key),
    iv,
  );

  let decryptedText: Buffer = decipher.update(encryptedText);
  decryptedText = Buffer.concat([decryptedText, decipher.final()]);

  return decryptedText.toString();
}

function decryptQueryParams(credentials): { [x: string]: string } {
  const decrypted = {};
  Object.entries(credentials).map(([key, value]: [string, string]) => {
    decrypted[key] = decrypt(value);
  });
  return decrypted;
}

// WARN: for testing purposes
function encryptQueryParams(credentials): { [x: string]: string } {
  const encrypted = {};
  Object.entries(credentials).map(([key, value]: [string, string]) => {
    encrypted[key] = encrypt(value);
  });
  return encrypted;
}

export {
  encrypt,
  decrypt,
  decryptQueryParams,
  encryptQueryParams,
  generateKey,
};
