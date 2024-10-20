import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { generatePublicKey, encryptMessage, decryptMessage } from '../../../backend/knapsackTest';
import MessageCloud from './MessageCloud';
import MessageContext from '../contexts/MessageContext.jsx';
import ReceivedMessageContext from '../contexts/ReceivedMessageContext.jsx';
import UserContext from '../contexts/UserContext.jsx';

// Connection to the server
const socket = io('http://localhost:5000');

// Superincreasing sequence and public key setup
const privateKey = [2, 3, 6, 13, 27, 52, 105, 210]; // Superincreasing sequence
const multiplier = 31; // Multiplier
const modulus = 491; // Modulus

// Generate the public key
const publicKey = generatePublicKey(privateKey, multiplier, modulus);

const Chat = ({ roomId }) => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const { setSentMessage } = useContext(MessageContext);
  const { setIncomingMessage } = useContext(ReceivedMessageContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Join the specified room when the component mounts
    if (roomId) {
      socket.emit('join_room', roomId);
      console.log(`Joined room: ${roomId}`);
    }

    // Listen for incoming messages and decrypt them
    socket.on('receive_message', (data) => {
      setIncomingMessage(data.messageObject.text);
      console.log('Received message object:', data);
    
      // Check if data and messageObject are defined
      if (data && data.messageObject) {
        // Decrypt the incoming message
        const decryptedMessage = decryptMessage(data.messageObject.text, privateKey, multiplier, modulus);
        console.log('Decrypted message:', decryptedMessage);
        
        // Create a message string from the decrypted data
        const messageString = Array.isArray(decryptedMessage) ? decryptedMessage.join(' ') : decryptedMessage;
        console.log('message string:', decryptedMessage);
        // Add the message to the receivedMessages array
        const messageWithSender = { text: messageString, sender: data.messageObject.sender };
        console.log('messageWithSender:', messageWithSender);
        setReceivedMessages((prevMessages) => [...prevMessages, messageWithSender]);
        console.log('messages updated')
      } else {
        console.error('Received null or malformed data:', data);
      }
    });

    // Clean up the event listener on unmount
    return () => {
      socket.off('receive_message');
    };
  }, [roomId]);

  const sendMessage = () => {
    // Encrypt the message before sending it to the server
    const encryptedValues = encryptMessage(message, publicKey);
    setSentMessage(encryptedValues);
    console.log('Encrypted message:', encryptedValues);
    
    const messageObject = {
      text: encryptedValues,
      sender: user,
    };

    // Emit the encrypted message to the server for the specific room
    socket.emit('send_message', { room: roomId, messageObject });
    console.log('message sent');
    // Clear the message input
    setMessage('');
  };

  return (
    <div className='bg-gray-200 p-3 flex flex-col border border-gray-400 mx-2 h-screen rounded-md'>
      <div className='text-2xl font-medium mb-4'>Chat</div>
      <div className='flex flex-col space-y-2'>
      {receivedMessages.map((msg, index) => (
        <MessageCloud key={index} message={msg.text} sender={msg.sender} />
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
