import CryptoJS from 'crypto-js';

export function encryptFile(fileData, key) {
  const ciphertext = CryptoJS.AES.encrypt(fileData, key).toString();
  return ciphertext;
}

export function decryptFile(ciphertext, key) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Derive key from user's wallet address + passphrase (user inputs passphrase for extra security)
export function deriveKey(walletAddress, passphrase) {
  return CryptoJS.PBKDF2(walletAddress + passphrase, 'salt', { keySize: 256/32 }).toString();
}