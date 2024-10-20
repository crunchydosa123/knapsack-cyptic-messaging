import React from 'react'
import Navbar from '../components/Navbar'
import HomeHero from '../components/HomeHero'

const Home = () => {
  return (
    <>
    <Navbar />
    <div className='flex justify-center'>
        <HomeHero />
    </div>
    </>
  )
}

export default Home