import { useState } from 'react'
import ReceivedMessages from './components/ReceivedMessages'
import Chat from './components/Chat'
import SentMessages from './components/SentMessages'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='text-2xl m-5'>Project</div>
    <div className='grid grid-cols-3'>
      <ReceivedMessages />
      <Chat />
      <SentMessages />
    </div>
    </>
  )
}

export default App
