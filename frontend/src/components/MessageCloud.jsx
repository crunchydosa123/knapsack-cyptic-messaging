import React from 'react';

const MessageCloud = ({ message, sender }) => {
  console.log('Rendering message:', message); 
  console.log('sender:', sender);// Log the message for debugging
  return (
    <div className='flex justify-start'>
      <div className='rounded-full bg-black text-white font-bold text-left p-2 self-start mr-2'>{sender.initials}</div>
      <div className='p-2 rounded-lg max-w-xs bg-white text-black self-start text-left'>
        {message} {/* Display the message prop */}
      </div>
    </div>
  );
};

export default MessageCloud;
