import { useState } from 'react'
import ReceivedMessages from './components/ReceivedMessages'
import Chat from './components/Chat'
import SentMessages from './components/SentMessages'
import Navbar from './components/Navbar'
import { MessageProvider } from './contexts/MessageContext'


function App() {

  return (
    <MessageProvider >
      <Navbar />
      <div className='grid grid-cols-3 px-4'>
        <ReceivedMessages />
        <Chat />
        <SentMessages />
      </div>
    </MessageProvider>
  )
}

export default App
