import React from 'react'
import Navbar from '../components/Navbar'
import ReceivedMessages from '../components/ReceivedMessages'
import Chat from '../components/Chat'
import SentMessages from '../components/SentMessages'
import { useParams } from 'react-router-dom';
import KnapsackInfo from '../components/KnapsackInfo'

const Room = () => {
    const {id} = useParams();
  return (
    <>
    <Navbar />
    <div className='grid grid-cols-3 px-4'>
        <div className='col-span-3'>
            <KnapsackInfo />
        </div>
        <ReceivedMessages />
        <Chat roomId={id}/>
        <SentMessages />
    </div>
    </>
  )
}

export default Room