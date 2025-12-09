import CryptoJS from "crypto-js";

const SECRET = "atmosphere_ghost";

export function encrypt(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET).toString();
}

export function decrypt(cipher) {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
