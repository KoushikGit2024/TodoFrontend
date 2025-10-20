// import React, { useContext, useEffect, useState } from 'react';
// import "./App.css";
// import Navbar from './component/Navbar';
// import { Routes,Route,useNavigate, Navigate, useParams } from 'react-router-dom';
// import Worklist from './pages/Worklist';
// // import { ThemeContext } from './contexts/ThemeContext';
// import axios from "axios";
// import Home from './pages/Home';
// import { DataContext } from './contexts/DataContext';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import { LoadingContext } from './contexts/LoadingContext';
// import Protected from './protectedRoute/Protected';
// import { TaskProvider } from './contexts/TaskContext';
// const App = () => {
//   // const themeNow =useContext(ThemeContext);
//   const {data,setData} = useContext(DataContext);
//   const {loading,setLoading} = useContext(LoadingContext);
//   const navigate = useNavigate();
//   function abcd(){
//     console.log(themeNow.theme)
//     themeNow.setTheme("hallo");

//   }
//   async function fetchUserData() {
//       let  authParam= "chidanand013";
//       let  password= "0.5131496766978938";
//     setTimeout(async()=>{

//       try {
//         const ab=await axios.post('/api/baseroute/login',
//                   {},
//                   {withCredentials:true});
//         // if(!ab.data?.data)
//         //   console.log(ab)
//         // else{
//           // console.log(ab)
//           setData(ab.data.data);
//         // }
//         // console.log(ab.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//       setLoading(false);
//     },0)
//   }
//   useState(()=>{
//     fetchUserData();
//   },[]);
  
//   return (
//     <main className='bg-[#ececdb] absolute h-screen w-screen m-0 p-0 flex flex-col items-center overflow-x-hidden'>
//       <TaskProvider>
//         <Navbar/>
//         <div className='w-screen h-full mt-20 bg-amber-0400 overflow-hidden'>
//           <Routes>
//             <Route path='/' element={<Home/>}/>
//             <Route path='/user' element={
//               <Protected>
//                 <Dashboard />
//               </Protected>
//               }/>
//             <Route path='/user/tasks/worklist' element={
//               <Protected>
//                 <Worklist worklist={'all'}/>  
//               </Protected>
//             }/>
//             <Route path='/user/login' element={<Login />}/>
//             <Route path='/user/signup' element={<Signup/>}/>
//             {/* Catch-all route */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </div>
//       </TaskProvider>
//     </main>
//   )
// }

// export default App

import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Worklist from "./pages/Worklist";
import axios from "axios";
import Home from "./pages/Home";
import { DataContext } from "./contexts/DataContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { LoadingContext } from "./contexts/LoadingContext";
import Protected from "./protectedRoute/Protected";
import { TaskProvider } from "./contexts/TaskContext";
import { motion } from "framer-motion";
import ProfileManager from "./pages/ProfileManager";

const App = () => {
  const { setData } = useContext(DataContext);
  const { setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  async function fetchUserData() {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/baseroute/login",
        {},
        { withCredentials: true }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <main className="fixed min-h-screen w-full overflow-hidden">
      
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          background: "linear-gradient(135deg, #E3FDFD, #FFE6FA, #E3FDFD)",
          backgroundSize: "300% 300%",
          animation: "gradientShift 15s ease infinite",
        }}
      />

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <TaskProvider>
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 10 }}
          className="w-full"
        >
          <Navbar />
        </motion.div>

        
        <motion.div
          className="w-full mt-20 flex-1 flex justify-center items-start px-4 sm:px-6 md:px-8 lg:px-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="w-full max-h-full max-w-6xl bg-white/40 backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden border border-white/30">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/user"
                element={
                  <Protected>
                    <Dashboard />
                  </Protected>
                }
              />
              <Route
                path="/user/profile"
                element={
                  <Protected>
                    <ProfileManager />
                  </Protected>
                }
              />
              <Route
                path="/user/tasks/worklist"
                element={
                  <Protected>
                    <Worklist worklist={"all"} />
                  </Protected>
                }
              />
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </motion.div>
      </TaskProvider>
    </main>
  );
};

export default App;
