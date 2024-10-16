import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connection to the server
const socket = io('http://localhost:5000');

// Superincreasing sequence and public key
const privateKey = [2, 3, 6, 13, 27, 52, 105, 210];
const publicKey = [82, 123, 246, 519, 1057, 2105, 4210, 8420];
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

const knapsackEncrypt = (message) => {
  const binaryMessage = message
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0')) // Pad each byte to 8 bits
    .join('');

  console.log('Binary Message:', binaryMessage); // Debug log

  return binaryMessage
    .split('')
    .map((bit, index) => (bit === '1' ? publicKey[index % publicKey.length] : 0))
    .reduce((acc, val) => acc + val, 0);
};

const knapsackDecrypt = (cipherText) => {
    const inverseMultiplier = modInverse(multiplier, modulus);
    let decryptedSum = (cipherText * inverseMultiplier) % modulus;
  
    console.log('Decrypted Sum:', decryptedSum); // Debug log
  
    let decodedBinary = '';
  
    // Decompose the sum using the private key (superincreasing sequence)
    for (let i = privateKey.length - 1; i >= 0; i--) {
      if (decryptedSum >= privateKey[i]) {
        decodedBinary = '1' + decodedBinary;
        decryptedSum -= privateKey[i];
      } else {
        decodedBinary = '0' + decodedBinary;
      }
    }
  
    console.log('Decoded Binary:', decodedBinary); // Debug log
  
    // Pad to make sure it's a multiple of 8
    while (decodedBinary.length % 8 !== 0) {
      decodedBinary = '0' + decodedBinary; // Pad with leading zeros
    }
  
    // Convert the binary string to characters
    const chars = [];
    for (let i = 0; i < decodedBinary.length; i += 8) {
      const byte = decodedBinary.slice(i, i + 8);
      const charCode = parseInt(byte, 2);
      console.log(`Byte: ${byte}, CharCode: ${charCode}`); // Debug log
      chars.push(String.fromCharCode(charCode));
    }
  
    console.log('Decoded Characters:', chars.join('')); // Debug log
  
    return chars.join('');
  };
  

const Chat = () => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages and decrypt them
    socket.on('receive_message', (data) => {
      console.log('Received raw message:', data);
      const decryptedMessage = knapsackDecrypt(Number(data)); // Convert to number before decrypting
      console.log('Decrypted message:', decryptedMessage);
      setReceivedMessages((prevMessages) => [...prevMessages, decryptedMessage]);
    });
  }, []);

  const sendMessage = () => {
    // Encrypt the message before sending it to the server
    const encryptedMessage = knapsackEncrypt(message);
    console.log('Encrypted message:', encryptedMessage);
    socket.emit('send_message', encryptedMessage);
    setMessage('');
  };

  return (
    <div className="App">
      <h2>Knapsack Chat</h2>
      <div>
        {receivedMessages.map((msg, index) => (
          <p key={index}>Decrypted: {msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
