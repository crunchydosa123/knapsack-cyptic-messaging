import React from 'react';

const MessageCloud = ({ message }) => {
  return (
    <div className='px-2 py-2 bg-white rounded-md text-left inline-block max-w-max'>
      {message}
    </div>
  );
};

export default MessageCloud;
