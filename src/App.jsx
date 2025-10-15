import React, { useContext, useEffect, useState } from 'react';
import "./App.css";
import Navbar from './component/Navbar';
import { Routes,Route,useNavigate, Navigate, useParams } from 'react-router-dom';
import Worklist from './pages/Worklist';
import { ThemeContext } from './contexts/ThemeContext';
import axios from "axios";
import Home from './pages/Home';
import { DataContext } from './contexts/DataContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { LoadingContext } from './contexts/LoadingContext';
import Protected from './protectedRoute/Protected';
import { TaskProvider } from './contexts/TaskContext';
const App = () => {
  const themeNow =useContext(ThemeContext);
  const {data,setData} = useContext(DataContext);
  const {loading,setLoading} = useContext(LoadingContext);
  const navigate = useNavigate();
  function abcd(){
    console.log(themeNow.theme)
    themeNow.setTheme("hallo");

  }
  async function fetchUserData() {
      let  authParam= "chidanand013";
      let  password= "0.5131496766978938";
    setTimeout(async()=>{

      try {
        const ab=await axios.post('/api/baseroute/login',
                  {},
                  {withCredentials:true});
        setData(ab.data.data);
        
        // console.log(ab.data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },0)
  }
  useState(()=>{
    fetchUserData();
  },[]);
  
  return (
    <main className='bg-[#ececdb] absolute h-screen w-screen m-0 p-0 flex flex-col items-center overflow-x-hidden'>
      <TaskProvider>
        <Navbar/>
        <div className='w-screen h-full mt-20 bg-amber-0400 overflow-hidden'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/user' element={
              <Protected>
                <Dashboard />
              </Protected>
              }/>
            <Route path='/user/tasks/worklist' element={
              <Protected>
                <Worklist worklist={'all'}/>  
              </Protected>
            }/>
            <Route path='/user/login' element={<Login />}/>
            <Route path='/user/signup' element={<Signup/>}/>
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </TaskProvider>
    </main>
  )
}

export default App

