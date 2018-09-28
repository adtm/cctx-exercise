const crypto = require("crypto");

function generateKey() {
  const salt = "69";
  const hash = crypto.createHash("sha256");
  hash.update(salt);

  const key = hash.digest().slice(0, 32);
  return key;
}

function encrypt(encodeText) {
  const key = generateKey();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);

  let encryptedText = cipher.update(encodeText);
  encryptedText = Buffer.concat([encryptedText, cipher.final()]);

  return `${iv.toString("hex")}:${encryptedText.toString("hex")}`;
}

function decrypt(decodeText) {
  const key = generateKey();

  const splitText = decodeText.split(":");
  const iv = Buffer.from(splitText.shift(), "hex");

  const encryptedText = Buffer.from(splitText.shift(), "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);

  let decryptedText = decipher.update(encryptedText);
  decryptedText = Buffer.concat([decryptedText, decipher.final()]);

  return decryptedText.toString();
}

console.log("apiKey: " + encrypt("484a63e83ccd"));
console.log("secret: " + encrypt("80c6c46d100a"));
