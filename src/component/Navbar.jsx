import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import "../styles/Navbar.css"
import Img from "/RemiTempLogo.png"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import {ThemeContext} from '../contexts/ThemeContext'
import { DataContext } from '../contexts/DataContext'
import { TaskContext } from '../contexts/TaskContext'
import axios from 'axios'

const Navbar = () => {
    const {data,setData}=useContext(DataContext);
    const {task,setTask}=useContext(TaskContext);
    const loadData = useContext(DataContext)
    const themeNow=useContext(ThemeContext);
    const [dropDown,setDropDown]=useState(false);
    const [screen,setScreen]=useState(window.innerWidth);
    const profileNav =useRef(null);
    // if()
    window.addEventListener("resize",()=>{
        setScreen(window.innerWidth);
    });
    useGSAP(()=>{
        gsap.to(".bg-wheel",{
            rotation: 360,   
            duration: 20,     
            ease: "linear",  
            repeat: -1
        })
    },[]);
    useGSAP(()=>{
        if(dropDown){
            gsap.fromTo(profileNav.current,
                {},
                { height: "fit-content", opacity: 1,visibility:'visible', duration: 0.5, }
            );
        } else {
            gsap.fromTo(profileNav.current,
                {},
                { height: 0, opacity: 0,visibility:'hidden', duration: 0.5 },
            );
        }
        
    },[dropDown]);
    async function searchHandler(text){
        // console.log(text)
        let a= await axios.get(`/api/user/tasks?search=${text}`,{withCredentials:true});
        console.log(a.data.tasks)
        setTask(a.data.tasks)
    }
    // console.log(task)
  return (
    <div className="fixed w-full flex items-center justify-center bg-[rgba(235,227,217,0.34)]
            backdrop-blur-md 
            border-0 border-white/20 
            shadow-0 z-[100]" style={{background:"linear-gradient(rgba(235,227,217),rgba(235,227,217,0.934),rgba(235,227,217,0.34),transparent)"}}>
        <nav className=' w-[95%] bg-[#ebe3d9] h-16 mt-4 rounded-full overflow-hidden p-4 border-2 min-w-[540px] flex flex-row items-center justify-between shadow-xl z-2' style={{color:themeNow.theme.clr1}}>
            <div className="logo w-14 h-14 -mr-6 flex items-center justify-center">
                <img src={Img} alt=""  className='h-14 w-14'/>
            </div>
            <div className=' w-[80%] flex justify-between items-center'>
                <div className="flex items-center justify-around w-[50%] min-w-[400px]">
                    <Link to="/" className='bg-[#ffffff] border-2 border-[#b2b2b2] hover:scale-105 transition-all duration-1000 rounded-full p-1 ml-1'>
                        <div className='relative'>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" baseProfile="tiny" viewBox="0 0 24 24" xmlSpace="preserve" className="h-8">
                                <path d="M12,3c0,0-6.186,5.34-9.643,8.232C2.154,11.416,2,11.684,2,12c0,0.553,0.447,1,1,1h2v7c0,0.553,0.447,1,1,1h3  c0.553,0,1-0.448,1-1v-4h4v4c0,0.552,0.447,1,1,1h3c0.553,0,1-0.447,1-1v-7h2c0.553,0,1-0.447,1-1c0-0.316-0.154-0.584-0.383-0.768  C18.184,8.34,12,3,12,3z" fill={themeNow.theme.clr1}/>
                            </svg>
                        </div>
                    </Link>
                    <div className="search bg-[#e4e4e4] h-10 rounded-full border-[2px] p-1 flex flex-row items-center justify-around w-[80%]" style={{borderColor:themeNow.theme.clr3}}>
                        <input type="text" className='outline-none rounded-l-full pl-3 bg-transparent h-8 w-full bg-transparenut' placeholder='Search Task' style={{caret:themeNow.theme.clr1}}
                          onInput={(e)=>searchHandler(e.target.value)}
                        />
                        <span className='searchIcon border-l-2 flex items-center justify-center ml-1 h-8' style={{borderColor:themeNow.theme.clr1}}>
                            <svg enableBackground="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32" xmlSpace="preserve" className='h-6'>
                                <path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_" fill={themeNow.theme.clr1}/>
                            </svg>
                        </span>
                    </div>    
                </div>
                {
                    (screen>=830)?
                    <>
                        <Link to="/user/tasks/worklist" className='flex items-center justify-center border-r-2 px-1'>
                            <span className='relative nav'>Worklists</span>
                        </Link>
                        <Link className='flex flex-row items-center justify-center border-r-2 px-1' >
                            <svg enableBackground="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32" xmlSpace="preserve" className='h-4'>
                                <path fill='#DAA520' d="M29.895,12.52c-0.235-0.704-0.829-1.209-1.549-1.319l-7.309-1.095l-3.29-6.984C17.42,2.43,16.751,2,16,2  s-1.42,0.43-1.747,1.122l-3.242,6.959l-7.357,1.12c-0.72,0.11-1.313,0.615-1.549,1.319c-0.241,0.723-0.063,1.507,0.465,2.046  l5.321,5.446l-1.257,7.676c-0.125,0.767,0.185,1.518,0.811,1.959c0.602,0.427,1.376,0.469,2.02,0.114l6.489-3.624l6.581,3.624  c0.646,0.355,1.418,0.311,2.02-0.114c0.626-0.441,0.937-1.192,0.811-1.959l-1.259-7.686l5.323-5.436  C29.958,14.027,30.136,13.243,29.895,12.52z" id="XMLID_328_"/>
                            </svg>
                            <span className='relative nav inline'>
                                Marked
                            </span>
                        </Link>
                        <Link className='flex items-center justify-center border-r-2 px-1'>
                            <span className='relative nav'>Overview</span>
                        </Link>
                    </>
                    :
                    ""
                }
            </div>
            <div className="profile relative -mr-6 h-12 w-15 -m-2 rounded-full flex items-center justify-between ">
                <div className='relative flex items-center justify-center'>
                    <div className='bg-wheel h-12 w-12 absolute rounded-full' style={{background:`conic-gradient(${themeNow.theme.clr1} 0% 25%,${themeNow.theme.clr2} 25% 50%,${themeNow.theme.clr3} 50% 75%,${themeNow.theme.clr4} 75% 100%)`}}></div>
                    <button  className='z-10 h-10.5 w-10.5 rounded-full bg-white overflow-hidden outline-0'  onClick={()=>setDropDown(pre=>!pre)}>
                        {
                            (loadData.data?.profileImg)?
                            <img src={loadData.data.profileImg} alt=""  className='h-14 w-14 object-cover'/>:
                            <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" viewBox="0 0 24 24" xmlSpace="preserve" className='h-full w-full'>
                                <g id="info"/>
                                <g id="icons">
                                    <path d="M12,0C5.4,0,0,5.4,0,12c0,6.6,5.4,12,12,12s12-5.4,12-12C24,5.4,18.6,0,12,0z M12,4c2.2,0,4,2.2,4,5s-1.8,5-4,5   s-4-2.2-4-5S9.8,4,12,4z M18.6,19.5C16.9,21,14.5,22,12,22s-4.9-1-6.6-2.5c-0.4-0.4-0.5-1-0.1-1.4c1.1-1.3,2.6-2.2,4.2-2.7   c0.8,0.4,1.6,0.6,2.5,0.6s1.7-0.2,2.5-0.6c1.7,0.5,3.1,1.4,4.2,2.7C19.1,18.5,19.1,19.1,18.6,19.5z" id="user2"/>
                                </g>
                            </svg>    
                        }
                    </button>    
                </div> 
            </div>
            <div ref={profileNav} className=" absolute right-[2.5vw] w-50 h-fit mt-[260px] bg-[#ebe3d9] border-2 rounded-[8px] flex flex-col justify-around border-[#3396D3] drop-shadow-2xl p-5 overflow-hidden">
                {/* <div className="h-full w-full flex flex-col p-5 items-start justify-center pl-5 box-border rounded-[6px] border-[#87bee1] border-2"> */}
                    <Link className='menu-item' to='/user/signup'>Create New Account</Link>                
                    <Link className='menu-item' to=''>Manage  Profile</Link>
                    <Link className='menu-item' to=''>Analytics</Link>
                    <Link className='menu-item' to='/user/tasks/worklist'>Tasks</Link>
                    <Link className='menu-item' to=''>Themes</Link>
                    <Link className='menu-item' to='/user/login'>Add Another Account</Link>
                    <Link className='menu-item' to=''>Log Out</Link>
                    <Link className='menu-item' to=''></Link>
                {/* </div> */}
                
            </div>           

        </nav>
    </div>
    
  )
}

export default Navbar
