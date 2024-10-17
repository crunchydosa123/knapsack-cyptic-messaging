// Helper function to convert characters to binary (8-bit representation)
function charToBinary(char) {
    return char
      .charCodeAt(0)
      .toString(2)
      .padStart(8, '0'); // Ensure 8-bit binary representation
  }
  
  // Helper function to convert binary to character
  function binaryToChar(binary) {
    return String.fromCharCode(parseInt(binary, 2));
  }
  
  // Function to generate a public key from the private key, multiplier, and modulus
  function generatePublicKey(privateKey, multiplier, modulus) {
    return privateKey.map(value => (value * multiplier) % modulus);
  }
  
  // Function to encrypt a single character using the public key
  function encryptCharacter(char, publicKey) {
    const binaryChar = charToBinary(char);
    let encryptedValue = 0;
  
    for (let i = 0; i < binaryChar.length; i++) {
      if (binaryChar[i] === '1') {
        encryptedValue += publicKey[i];
      }
    }
  
    return encryptedValue;
  }
  
  // Function to encrypt a message using the public key
  function encryptMessage(message, publicKey) {
    return message
      .split('')
      .map(char => encryptCharacter(char, publicKey));
  }
  
  // Function to decrypt a single character's encrypted value using the private key, multiplier, and modulus
  function decryptCharacter(encryptedValue, privateKey, multiplier, modulus) {
    const inverseMultiplier = modInverse(multiplier, modulus);
    let scaledValue = (encryptedValue * inverseMultiplier) % modulus;
  
    const binaryChar = [];
    for (let i = privateKey.length - 1; i >= 0; i--) {
      if (scaledValue >= privateKey[i]) {
        binaryChar[i] = '1';
        scaledValue -= privateKey[i];
      } else {
        binaryChar[i] = '0';
      }
    }
  
    return binaryToChar(binaryChar.join(''));
  }
  
  // Function to decrypt the entire message using the private key, multiplier, and modulus
  function decryptMessage(encryptedValues, privateKey, multiplier, modulus) {
    return encryptedValues
      .map(encryptedValue => decryptCharacter(encryptedValue, privateKey, multiplier, modulus))
      .join('');
  }
  
  // Helper function to find the modular inverse using the Extended Euclidean Algorithm
  function modInverse(a, m) {
    let m0 = m;
    let x0 = 0;
    let x1 = 1;
  
    if (m === 1) return 0;
  
    while (a > 1) {
      const q = Math.floor(a / m);
      let temp = m;
  
      m = a % m;
      a = temp;
      temp = x0;
  
      x0 = x1 - q * x0;
      x1 = temp;
    }
  
    if (x1 < 0) x1 += m0;
  
    return x1;
  }
  
  // Example usage
  const privateKey = [2, 3, 6, 13, 27, 52, 105, 210]; // Superincreasing sequence
  const multiplier = 31; // Multiplier
  const modulus = 491; // Modulus
  
  // Generate the public key
  const publicKey = generatePublicKey(privateKey, multiplier, modulus);
  
  // Encrypt and decrypt a message
  const message = "Hello how are you";
  const encryptedValues = encryptMessage(message, publicKey);
  const decryptedMessage = decryptMessage(encryptedValues, privateKey, multiplier, modulus);
  
  console.log(`Original message: ${message}`);
  console.log(`Encrypted values: ${encryptedValues}`);
  console.log(`Decrypted message: ${decryptedMessage}`);

  export {
    generatePublicKey,
    encryptMessage,
    decryptMessage,
    modInverse
  };
  