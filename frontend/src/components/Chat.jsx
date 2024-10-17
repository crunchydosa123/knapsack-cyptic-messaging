import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { generatePublicKey, encryptMessage, decryptMessage } from '../../../backend/knapsackTest';
import MessageCloud from './MessageCloud';
import MessageContext from '../contexts/MessageContext.jsx'

// Connection to the server
const socket = io('http://localhost:5000');

// Superincreasing sequence and public key setup
const privateKey = [2, 3, 6, 13, 27, 52, 105, 210]; // Superincreasing sequence
const multiplier = 31; // Multiplier
const modulus = 491; // Modulus

// Generate the public key
const publicKey = generatePublicKey(privateKey, multiplier, modulus);

const Chat = () => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const { globalMessage, setGlobalMessage } = useContext(MessageContext);

  useEffect(() => {
    // Listen for incoming messages and decrypt them
    socket.on('receive_message', (data) => {
      console.log('Received encrypted message:', data);

      // Decrypt the incoming message
      const decryptedMessage = decryptMessage(data, privateKey, multiplier, modulus);
      console.log('Decrypted message:', decryptedMessage);
      setReceivedMessages((prevMessages) => [...prevMessages, decryptedMessage]);
    });

    // Clean up the event listener on unmount
    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    setGlobalMessage(message);
    // Encrypt the message before sending it to the server
    const encryptedValues = encryptMessage(message, publicKey);
    console.log('Encrypted message:', encryptedValues);

    // Emit the encrypted message to the server
    socket.emit('send_message', encryptedValues);

    // Clear the message input
    setMessage('');
  };

  return (
    <div className='bg-gray-200 p-3 flex flex-col border border-gray-400 mx-2 h-screen rounded-md'>
      <div className='text-2xl font-medium mb-4'>Chat</div>
      <div className='flex flex-col space-y-2'>
        {receivedMessages.map((msg, index) => (
          <MessageCloud key={index} message={msg} />
        ))}
      </div>
      <div className='mt-4 flex'>
        <input
          type="text"
          className='flex-grow p-2 border border-gray-300 rounded-md mr-2'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded-md'
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
