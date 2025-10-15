import axios from 'axios';
import React, { useRef } from 'react'

const Home = () => {
  const inpRef =useRef(null);
  
  return (
    <div className='bg-amber-5000 h-full justify-center mt-0'>
      <input type="text" ref={inpRef} className='bg-white'/>
      <button type="submit"  className='bg-pink-500'>submit</button>
    </div>
  )
}

export default Home
