import React, { useContext } from 'react'
import ReceivedMessageContext from '../contexts/ReceivedMessageContext'

const ReceivedMessages = () => {
  const {incomingMessage, setIncomingMessage} = useContext(ReceivedMessageContext);
  return (
    <div className='p-3 flex flex-col border border-gray-400 mx-2 h-screen rounded-md'>
      <div className='text-2xl text-medium'>Received Messages</div>
      <div className='text-2xl text-medium'>{incomingMessage}</div>
    </div>
  )
}

export default ReceivedMessages