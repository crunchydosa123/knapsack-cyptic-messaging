import React, { useContext } from 'react'
import MessageContext from '../contexts/MessageContext.jsx'

const SentMessages = () => {
  const { sentMessage, setSentMessage } = useContext(MessageContext);
  return (
    <div className='p-3 flex flex-col border border-gray-400 mx-2 h-screen rounded-md'>
      <div className='text-2xl text-medium'>Sent Messages</div>
      <div className='text-2xl text-medium'>{sentMessage}</div>
    </div>
  )
}

export default SentMessages