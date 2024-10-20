import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const HomeHero = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    const takeToRoom = (roomId) =>{
        navigate(`/room/${id}`);
    }

    const getInitials = (name) =>{
      const words = name.trim().split(' ');
      const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
    
      return initials;
    }

  return (
    <div className='flex flex-col border border-gray-500 p-5 w-1/3 rounded-md'>
        <div className='text-center text-2xl font-bold m-3'>Create or join a room</div>
        <div className='text-center text-3xl font-bold m-5 bg-black p-6 rounded-full text-white max-w-xs self-center'>{getInitials(name)}</div>
        <div className='text-left mb-2 mt-4'>Enter your name</div>
        <input type='text' className='border border-gray-300 p-2 rounded-md' value={name} onChange={(e) => setName(e.target.value)}></input>
        <div className='text-left mb-2 mt-4'>Enter room id</div>
        <input type='text' className='border border-gray-300 p-2 rounded-md' value={id} onChange={(e => setId(e.target.value))}></input>
        <button className='my-4 bg-black text-white p-2' onClick={() => {
          setUser({name: name, initials: getInitials(name)});
          takeToRoom(id);
        }}>Join</button>
    </div>
  )
}

export default HomeHero