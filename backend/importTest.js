// app.js

// Importing functions from the knapsackCryptosystem.js file
const {
    generatePublicKey,
    encryptMessage,
    decryptMessage
  } = require('./knapsackTest');
  
  // Example usage
  const privateKey = [2, 3, 6, 13, 27, 52, 105, 210]; // Superincreasing sequence
  const multiplier = 31; // Multiplier
  const modulus = 491; // Modulus
  
  // Generate the public key
  const publicKey = generatePublicKey(privateKey, multiplier, modulus);
  
  // Encrypt and decrypt a message
  const message = "HI";
  const encryptedValues = encryptMessage(message, publicKey);
  const decryptedMessage = decryptMessage(encryptedValues, privateKey, multiplier, modulus);
  
  console.log(`Original message: ${message}`);
  console.log(`Encrypted values: ${encryptedValues}`);
  console.log(`Decrypted message: ${decryptedMessage}`);
  