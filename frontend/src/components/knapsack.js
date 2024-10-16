// knapsackCrypto.js

// Superincreasing sequence and public key
const privateKey = [2, 3, 6, 13, 27, 52, 105, 210]; // Superincreasing sequence
const publicKey = [82, 123, 246, 519, 1057, 2105, 4210, 8420]; // Modular transformation
const modulus = 8421;
const multiplier = 4913; // Coprime with modulus

// Helper function for modular inverse
const modInverse = (a, m) => {
  let m0 = m, t, q;
  let x0 = 0, x1 = 1;
  if (m === 1) return 0;
  while (a > 1) {
    q = Math.floor(a / m);
    t = m;
    m = a % m;
    a = t;
    t = x0;
    x0 = x1 - q * x0;
    x1 = t;
  }
  if (x1 < 0) x1 += m0;
  return x1;
};

// Encrypt function using the public key
const knapsackEncrypt = (message) => {
  const binaryMessage = message
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');

  return binaryMessage
    .split('')
    .map((bit, index) => (bit === '1' ? publicKey[index % publicKey.length] : 0))
    .reduce((acc, val) => acc + val, 0);
};

// Decrypt function using the private key
const knapsackDecrypt = (cipherText) => {
  const inverseMultiplier = modInverse(multiplier, modulus);
  let decryptedSum = (cipherText * inverseMultiplier) % modulus;
  let decodedBinary = '';

  for (let i = privateKey.length - 1; i >= 0; i--) {
    if (decryptedSum >= privateKey[i]) {
      decodedBinary = '1' + decodedBinary;
      decryptedSum -= privateKey[i];
    } else {
      decodedBinary = '0' + decodedBinary;
    }
  }

  const chars = decodedBinary.match(/.{1,8}/g).map((byte) => String.fromCharCode(parseInt(byte, 2)));
  return chars.join('');
};

// Export all functions and constants
module.exports = {
  privateKey,
  publicKey,
  modulus,
  multiplier,
  modInverse,
  knapsackEncrypt,
  knapsackDecrypt,
};
