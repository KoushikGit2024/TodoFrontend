// import axios from 'axios';
// import React, { useRef } from 'react'

// const Home = () => {
//   const inpRef =useRef(null);
  
//   return (
//     <div className='bg-amber-5000 h-full justify-center mt-0'>
//       <input type="text" ref={inpRef} className='bg-white'/>
//       <button type="submit"  className='bg-pink-500'>submit</button>
//     </div>
//   )
// }

// export default Home
import React from "react";
import { motion } from "framer-motion";
import Img from "/RemiTempLogo.png"; // your logo

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f0f4f8] via-[#ece3d9] to-[#f7f7f7] p-6 overflow-hidden">
      {/* Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-[#004f58] mb-4 text-center"
      >
        Welcome to Remidos!
      </motion.h1>

      {/* Intro text */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-lg text-[#5a4a3f] text-center max-w-xl mb-6"
      >
        Organize your tasks efficiently and effortlessly. Create worklists, manage subtasks, set deadlines, 
        and keep track of your productivity — all in one place!
      </motion.p>

      {/* Features list */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex flex-col gap-3"
      >
        <div className="bg-white rounded-xl shadow-lg p-4 text-[#004f58]">
          • Create and edit tasks with subtasks
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-[#004f58]">
          • Track deadlines and reminders
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-[#004f58]">
          • Organize tasks into worklists and categories
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-[#004f58]">
          • Search tasks instantly
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
