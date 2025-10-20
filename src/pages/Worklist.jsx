// import { useContext, useEffect, useState, useRef } from 'react';
// import { ThemeContext } from '../contexts/ThemeContext';
// import { DataContext } from '../contexts/DataContext';
// import "../styles/Tasks.css";
// // import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useGSAP } from '@gsap/react';
// import TaskCard from '../component/TaskCard';
// import NewTaskForm from '../component/NewTaskForm';
// import {LoadingContext} from '../contexts/LoadingContext';
// import { TaskContext } from '../contexts/TaskContext';
// import EditTask from '../component/EditTask'
// const Worklist = () => {
//   const themeNow = useContext(ThemeContext);
//   const { data } = useContext(DataContext);
//   const [subWork,setSubWork]=useState(0);
//   const {task, setTask} = useContext(TaskContext);
//   const [filterZ,setFilterZ]=useState(false);
//   const [pageNo,setPageNo]=useState(0);
//   const [filter,setFilter]=useState('all');
//   const scrollRef = useRef(null);
//   const {loading,setLoading}=useContext(LoadingContext)
//   const [editIdx,setEditIdx]=useState(null);
//   const lazyRef=useRef(null);
//   const [lazyLoader,setLazyLoader]=useState(false);
  
//   useGSAP(()=>{
//     gsap.to('.createNote',{
//       y: -5,           
//       duration: 1,     
//       repeat: -1,      
//       yoyo: true,       
//       ease: "power1.inOut"
//     });
//   },[]);
//   async function getTask(worklist='all',pNo) {
//     try {
//       // console.log(pNo)
//       let tasks = await axios.get('/api/user/tasks/worklist', {
//         params: {
//           userName: data.userName,
//           worklist: worklist,
//           pageno:pNo,
//         },
//       });
//       let temp=tasks.data.tasks;
//       if(temp.length!==0){
//         setPageNo(pre=>pre+1);
//       }
//       // console.log(task.length,'*',temp.length)
//       if(pNo===0)
//         setTask([...temp])
//       else
//         setTask(pre=>[...pre,...temp]); // ensure array
//     } catch (error) {
//       console.log(error);
//     }
//     setLazyLoader(false)
//   }

//   useEffect(() => {
//     // console.log('jsjsksksk')
//     setLazyLoader(true);
//   }, [data.userName,loading]);
//   useEffect(()=>{
//     console.log(task)
//   },[task])
//   useEffect(()=>{
//     const observer = new IntersectionObserver(([entry])=>{
//       // console.log(entry.isIntersecting)
//     if(entry.isIntersecting){
//       setLazyLoader(true);
//     }
//     },{threshold:[0.15]})
//     observer.observe(lazyRef.current);
//     return () => {
//       if (lazyRef.current) observer.unobserve(lazyRef.current);
//       setTask([])
//       // console.log('bye')
//     };
//   },[]);
//   useEffect(()=>{
//     if(lazyLoader)
//     getTask(filter,pageNo);
//   },[lazyLoader])

//   return (
//     <div className='home-page tasks bg-cyan-500 w-screen min-h-screen flex justify-center min-w-[450px] overflow-x-hidden overflow-y-auto'>
//       <div className='mt-10 w-full bg-amber-300 flex items-center justify-center'>
//         <div className="filter fixed z-[10] bg-red-6000 left-2 top-22 p-2 bg-[#fff] h-auto" style={{opacity:(filterZ)?1:0.72}} >
//           {/* // (filterZ)?100:20}}> */}
//           <select name="" id="filterType" className='outline-none'
//             defaultValue={'all'}
//             onClick={()=>setFilterZ(true)}
//             onChange={(e)=>{
//               console.log('kkkkk')
//               setPageNo(0);
//               setFilter(e.target.value);
//               getTask(e.target.value,0);
//             }}
//             onBlur={()=>{
//               setFilterZ(false);
//             }}
//           >
//             {
//               (data.worklist).map((ele,idx)=>(
//                 <option value={`${ele}`} key={idx}>{ele}</option>  
//               ))
//             }
//           </select>
//         </div>
//         <div
//           ref={scrollRef}
//           className="taskscroll w-full bg-purple-500 flex flex-col items-start pb-16
//                     max-h-[100vh] overflow-x-hidden overflow-y-auto"
//         >

//           {Array.isArray(task) && task.length > 0 ? (
//             task.map((e, idx) => (
//               <div
//                 className="task-box w-[90%] bg-red-400 my-4 ml-10 text-[24px] p-4 rounded-lg"
//                 key={e._id+idx}
//               >
//                 <TaskCard todo={e} worklist={data.worklist} setSubWork={setSubWork} setEditIdx={setEditIdx} idx={idx}/>
//               </div>
//             ))
//           ) : (
//             <p className="p-4">No tasks found</p>
//           )}
//           {
//             <div ref={lazyRef} className={`bg-blue-400 w-full self-stretch min-h-20 flex-grow`} style={{display:(task.length)?'block':'none'}}>
//               <div className={`lazyload relative bg-green-300 w-full flex items-center justify-center ${(lazyLoader)?'min-h-20':'min-h-5'}`}>
//                 {/* <SpinnerCircular size={50} thickness={100} speed={100} color="#36ad47" secondaryColor="rgba(110, 172, 57, 0.39)" /> */}
//                 {
//                   (
//                     lazyLoader && <img src="/paper.jpg" alt="" className={`${(lazyLoader)?'max-h-20':'max-h-5'}`}/>
//                   )
//                 }
                
//               </div>
//             </div>
//           }
          
//         </div>
//       </div>

//       {/* Floating button */}
//       <div
//         className="createNote fixed bottom-10 right-10 bg-[#fcf8f3] h-16 w-16 rounded-full flex items-center justify-center border-2"
//         style={{ borderColor: themeNow.theme.clr3 }}
//       >
//         <div className="icon" onClick={()=>setSubWork(1)}>
//           <svg fill="#ebe3d9" viewBox="0 0 155 155" className='h-10 w-10'>
//             <g clipPath="url(#clip0)">
//               <path d="M1.77 75.9403C1.77 61.4508 1.80893 46.959 1.74525 32.4724C1.7277 28.3545 1.36971 24.2391 1.243 20.1205C0.910304 9.24447 8.36408 1.26206 19.9368 1.03412C44.0589 0.558703 68.1786 -0.478187 92.3151 0.345657C94.8694 0.432926 97.4341 0.253818 99.9865 0.366486C101.533 0.427783 103.067 0.680246 104.553 1.11808C105.203 1.30689 105.776 1.70079 106.187 2.2414C106.597 2.78201 106.822 3.44053 106.83 4.11966C106.926 5.59347 106.397 6.90065 105.076 7.45162C103.445 8.1232 101.737 8.58846 99.9923 8.83685C98.4413 8.98416 96.8811 8.98716 95.3301 8.8459C75.2081 7.98103 55.0768 8.08262 34.9489 8.44668C29.5141 8.57276 24.0906 9.005 18.7042 9.74138C15.3331 10.1849 12.2485 11.7089 10.9424 15.2693C10.3554 16.7013 10.0373 18.2295 10.004 19.7772C10.1574 25.6738 10.5162 31.5652 10.8053 37.4584C10.9035 39.4617 11.097 41.463 11.1191 43.4663C11.3232 61.7445 11.5974 80.0231 11.6474 98.3027C11.6786 109.67 11.3003 121.037 11.2367 132.405C11.3128 135.406 11.5515 138.401 11.9515 141.377C12.1594 143.388 13.2745 144.618 15.3713 144.829C16.0341 144.894 16.6897 145.122 17.3486 145.122C23.5671 145.127 29.7875 145.199 36.0034 145.057C43.8951 144.876 51.7816 144.32 59.6732 144.265C78.9138 144.135 98.156 144.151 117.397 144.205C122.843 144.221 128.287 144.583 133.733 144.76C135.745 144.894 137.744 144.344 139.404 143.197C141.065 142.05 142.29 140.375 142.882 138.443C143.121 137.714 143.24 136.95 143.234 136.183C143.16 130.285 142.665 124.367 143.003 118.496C144.176 98.1158 144.168 77.7228 144.161 57.3257C144.161 55.2085 144.191 53.0886 144.314 50.9759C144.369 49.7514 144.563 48.5372 144.894 47.357C145.067 46.7019 145.439 46.1173 145.96 45.6846C146.48 45.2518 147.122 44.9925 147.796 44.9427C149.361 44.7603 150.803 45.1616 151.472 46.636C152.143 48.0317 152.567 49.5337 152.727 51.075C153.218 57.8514 153.559 64.6395 153.936 71.4245C155.117 92.7207 153.911 113.988 153.286 135.263C153.175 137.486 152.762 139.684 152.059 141.796C151.42 144 150.273 146.024 148.712 147.703C147.151 149.383 145.218 150.672 143.069 151.467C138.918 153.083 134.498 153.893 130.045 153.853C115.701 153.816 101.356 153.862 87.0121 153.844C81.563 153.838 76.1119 153.619 70.666 153.714C57.772 153.944 44.8809 154.334 31.9877 154.6C26.7634 154.707 21.53 154.828 16.3116 154.643C8.01703 154.349 2.75501 148.868 2.64585 140.454C2.36579 118.95 2.18056 97.4456 1.95703 75.9416L1.77 75.9403Z" fill="grey"/>
//               <path d="M61.8573 92.567C61.969 91.5947 62.1693 90.6341 62.4557 89.6982C64.1094 85.099 65.7699 80.4985 67.6218 75.9775C68.3385 74.3441 69.3008 72.8299 70.475 71.4883C89.4014 48.9894 108.635 26.7664 129.525 6.04649C130.377 5.16797 131.286 4.34584 132.245 3.58533C134.961 1.51498 137.789 1.44934 140.509 3.53207C142.165 4.84379 143.736 6.26011 145.213 7.77241C147.819 10.3573 150.337 13.0293 152.912 15.6441C155.207 17.9737 154.66 20.907 152.892 22.8478C151.469 24.4108 149.942 25.8761 148.437 27.361C130.926 44.6435 113.242 61.756 95.9987 79.3035C91.0902 84.4107 85.4565 88.7637 79.2803 92.2219C76.264 93.8806 73.1619 95.3831 70.0799 96.9194C69.2865 97.3239 68.4529 97.6436 67.5938 97.8748C63.867 98.8367 61.7364 97.1246 61.8573 92.567ZM85.7476 79.3146L131.152 32.2134L124.271 21.8865C108.69 38.6968 93.3573 55.2375 77.7968 72.0263C80.5864 74.5851 83.2498 77.0273 85.745 79.3146H85.7476ZM129.899 16.6959L138.171 25.0582L144.561 19.3706C141.804 16.1319 139.264 13.1479 136.617 10.0381L129.899 16.6959ZM73.7909 78.6704C72.9546 80.6164 72.3314 82.0668 71.7174 83.4969L74.2353 86.3143L78.0769 84.0707L73.7909 78.6704Z" fill="grey"/>
//             </g>
//             <defs>
//               <clipPath id="clip0"><rect fill="#ebe3d9" height="155" transform="translate(0.777344)" width="154"/></clipPath>
//             </defs>
//           </svg>
//         </div>
//       </div>
          
//       <div className={`fixed flex top-0 z-100 overflow-y-auto bg-[#001aff] ${(subWork)?"max-h-screen w-full":'h-0 w-0'}`}>
//         {(
//           (
//           (subWork===1)&&<NewTaskForm subWork={subWork} setSubWork={setSubWork}/>
//           ||
//           (subWork===2)&&<EditTask subWork={subWork} setSubWork={setSubWork} todo={task[editIdx]} editIdx={editIdx}/>
//           )
//         )}
        
//       </div>
//     </div>
//   )
// }

// export default Worklist

// import { useContext, useEffect, useState, useRef, useCallback, useMemo } from 'react';
// // import { ThemeContext } from '../contexts/ThemeContext';
// import { DataContext } from '../contexts/DataContext';
// import { LoadingContext } from '../contexts/LoadingContext';
// import { TaskContext } from '../contexts/TaskContext';
// import "../styles/Tasks.css";
// import axios from 'axios';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import TaskCard from '../component/TaskCard';
// import NewTaskForm from '../component/NewTaskForm';
// import EditTask from '../component/EditTask';

// const Worklist = () => {
//   // const themeNow = useContext(ThemeContext);
//   const { data } = useContext(DataContext);
//   const { loading, setLoading } = useContext(LoadingContext);
//   const { task, setTask } = useContext(TaskContext);

//   const [subWork, setSubWork] = useState(0);
//   const [filterZ, setFilterZ] = useState(false);
//   const [pageNo, setPageNo] = useState(0);
//   const [filter, setFilter] = useState('all');
//   const [lazyLoader, setLazyLoader] = useState(false);
//   const [editIdx, setEditIdx] = useState(-1);
//   const [refresh,setRefresh]=useState(0)

//   const lazyRef = useRef(null);
//   const scrollRef = useRef(null);

//   // Floating button subtle animation
//   useGSAP(() => {
//     gsap.to('.createNote', {
//       y: -5,
//       duration: 1,
//       repeat: -1,
//       yoyo: true,
//       ease: "power1.inOut"
//     });
//   }, []);
//   // useEffect(() => {
//   //   console.log("Updated task:");
//   //   // setRefresh(pre=>!pre)
//   // }, [task]);

//   // 📦 Fetch tasks (memoized for stable reference)
//   const getTask = useCallback(async (worklist = 'all', pNo = 0) => {
//     try {
//       const res = await axios.get('/api/user/tasks/worklist', {
//         params: {
//           userName: data.userName,
//           worklist,
//           pageno: pNo,
//         },
//       });
//       const fetchedTasks = res.data.tasks;

//       if (fetchedTasks.length > 0) setPageNo(prev => prev + 1);

//       setTask(prev => (pNo === 0 ? [...fetchedTasks] : [...prev, ...fetchedTasks]));
//     } catch (error) {
//       console.error("Task fetch error:", error);
//     } finally {
//       setLazyLoader(false);
//     }
//   }, [data.userName, setTask]);

//   // 🌀 Observe bottom element for lazy loading
//   useEffect(() => {
//     if (!lazyRef.current) return;

//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) setLazyLoader(true);
//     }, { threshold: 0.2 });

//     observer.observe(lazyRef.current);
//     return () => {
//       observer.disconnect();
//       setTask([]);
//     };
//   }, [setTask]);

//   // 🧭 Lazy load trigger
//   useEffect(() => {
//     if (lazyLoader) getTask(filter, pageNo);
//   }, [lazyLoader, filter, pageNo, getTask]);

//   // 🔁 Initial fetch
//   useEffect(() => {
//     if (data.userName && !loading) {
//       setPageNo(0);
//       setLazyLoader(true);
//     }
//   }, [data.userName, loading]);

//   // const themeStyles = useMemo(() => ({
//   //   primary: themeNow.theme.clr3,
//   // }), [themeNow]);

//   return (
//     <div className='home-page w-screen min-h-screen flex justify-center bg-gradient-to-br from-cyan-400 to-blue-500 text-gray-900 overflow-x-hidden overflow-y-auto'>
//       {/* Header + Filter */}
//       <div className='mt-12 w-full flex flex-col items-center'>
//         <div className={`filter fixed top-20 left-4 bg-white shadow-md rounded-xl px-3 py-2 transition-all ${filterZ ? 'opacity-100 scale-105' : 'opacity-75 scale-100'} z-[100]`}>
//           <select
//             id="filterType"
//             className='outline-none text-gray-700 font-medium bg-transparent cursor-pointer'
//             defaultValue='all'
//             onClick={() => setFilterZ(true)}
//             onChange={(e) => {
//               setPageNo(0);
//               setFilter(e.target.value);
//               getTask((e.target.value).toLowerCase(), 0);
//             }}
//             onBlur={() => setFilterZ(false)}
//           >
//             {data.worklist.map((ele, idx) => (
//               <option value={ele} key={idx}>{ele[0].toUpperCase()+ele.slice(1)}</option>
//             ))}
//           </select>
//         </div>

//         {/* Task List */}
//         <div
//           ref={scrollRef}
//           className='taskscroll w-full flex flex-col items-center pb-20 max-h-[100vh] overflow-x-hidden overflow-y-auto mt-6 z-[5]'
//           key={refresh}
//         >
//           {Array.isArray(task) && task.length > 0 ? (
//             task.map((e, idx) => (
//               <div
//                 className='task-box w-[90%] sm:w-[80%] md:w-[60%] bg-white/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all my-3 rounded-xl border border-gray-200 p-4 hover:scale-103'
//                 key={e._id + idx}
//               >
//                 <TaskCard
//                   todo={e}
//                   worklist={data.worklist}
//                   setSubWork={setSubWork}
//                   setEditIdx={setEditIdx}
//                   idx={idx}
//                   setRefresh={setRefresh}
//                 />
//               </div>
//             ))
//           ) : (
//             <p className='text-white/90 mt-10 text-lg font-semibold'>No tasks found</p>
//           )}

//           {/* Lazy Loader */}
//           <div ref={lazyRef} className='w-full flex justify-center items-center my-6'>
//             {lazyLoader && (
//               <div className='animate-pulse text-white text-lg font-medium'>
//                 Loading more tasks...
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 🪶 Floating Add Button */}
//       <button
//         className='createNote fixed bottom-10 right-10 bg-white border-2 rounded-full h-16 w-16 flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10'
//         style={{ borderColor: "#EBCB90" }}
//         onClick={() => setSubWork(1)}
//       >
//         {/* <svg fill={"#EBCB90"} viewBox="0 0 155 155" className='h-8 w-8'>
//           <path d="M61.8573 92.567C61.969 91.5947 62.1693 90.6341 62.4557 89.6982C64.1094 85.099 65.7699 80.4985 67.6218 75.9775C68.3385 74.3441 69.3008 72.8299 70.475 71.4883C89.4014 48.9894 108.635 26.7664 129.525 6.04649C130.377 5.16797 131.286 4.34584 132.245 3.58533C134.961 1.51498 137.789 1.44934 140.509 3.53207C142.165 4.84379 143.736 6.26011 145.213 7.77241C147.819 10.3573 150.337 13.0293 152.912 15.6441C155.207 17.9737 154.66 20.907 152.892 22.8478C151.469 24.4108 149.942 25.8761 148.437 27.361C130.926 44.6435 113.242 61.756 95.9987 79.3035C91.0902 84.4107 85.4565 88.7637 79.2803 92.2219C76.264 93.8806 73.1619 95.3831 70.0799 96.9194C69.2865 97.3239 68.4529 97.6436 67.5938 97.8748C63.867 98.8367 61.7364 97.1246 61.8573 92.567Z" />
//         </svg> */}
        // <svg fill="#ebe3d9" viewBox="0 0 155 155" className='h-10 w-10'>
        //   <g clipPath="url(#clip0)">
        //     <path d="M1.77 75.9403C1.77 61.4508 1.80893 46.959 1.74525 32.4724C1.7277 28.3545 1.36971 24.2391 1.243 20.1205C0.910304 9.24447 8.36408 1.26206 19.9368 1.03412C44.0589 0.558703 68.1786 -0.478187 92.3151 0.345657C94.8694 0.432926 97.4341 0.253818 99.9865 0.366486C101.533 0.427783 103.067 0.680246 104.553 1.11808C105.203 1.30689 105.776 1.70079 106.187 2.2414C106.597 2.78201 106.822 3.44053 106.83 4.11966C106.926 5.59347 106.397 6.90065 105.076 7.45162C103.445 8.1232 101.737 8.58846 99.9923 8.83685C98.4413 8.98416 96.8811 8.98716 95.3301 8.8459C75.2081 7.98103 55.0768 8.08262 34.9489 8.44668C29.5141 8.57276 24.0906 9.005 18.7042 9.74138C15.3331 10.1849 12.2485 11.7089 10.9424 15.2693C10.3554 16.7013 10.0373 18.2295 10.004 19.7772C10.1574 25.6738 10.5162 31.5652 10.8053 37.4584C10.9035 39.4617 11.097 41.463 11.1191 43.4663C11.3232 61.7445 11.5974 80.0231 11.6474 98.3027C11.6786 109.67 11.3003 121.037 11.2367 132.405C11.3128 135.406 11.5515 138.401 11.9515 141.377C12.1594 143.388 13.2745 144.618 15.3713 144.829C16.0341 144.894 16.6897 145.122 17.3486 145.122C23.5671 145.127 29.7875 145.199 36.0034 145.057C43.8951 144.876 51.7816 144.32 59.6732 144.265C78.9138 144.135 98.156 144.151 117.397 144.205C122.843 144.221 128.287 144.583 133.733 144.76C135.745 144.894 137.744 144.344 139.404 143.197C141.065 142.05 142.29 140.375 142.882 138.443C143.121 137.714 143.24 136.95 143.234 136.183C143.16 130.285 142.665 124.367 143.003 118.496C144.176 98.1158 144.168 77.7228 144.161 57.3257C144.161 55.2085 144.191 53.0886 144.314 50.9759C144.369 49.7514 144.563 48.5372 144.894 47.357C145.067 46.7019 145.439 46.1173 145.96 45.6846C146.48 45.2518 147.122 44.9925 147.796 44.9427C149.361 44.7603 150.803 45.1616 151.472 46.636C152.143 48.0317 152.567 49.5337 152.727 51.075C153.218 57.8514 153.559 64.6395 153.936 71.4245C155.117 92.7207 153.911 113.988 153.286 135.263C153.175 137.486 152.762 139.684 152.059 141.796C151.42 144 150.273 146.024 148.712 147.703C147.151 149.383 145.218 150.672 143.069 151.467C138.918 153.083 134.498 153.893 130.045 153.853C115.701 153.816 101.356 153.862 87.0121 153.844C81.563 153.838 76.1119 153.619 70.666 153.714C57.772 153.944 44.8809 154.334 31.9877 154.6C26.7634 154.707 21.53 154.828 16.3116 154.643C8.01703 154.349 2.75501 148.868 2.64585 140.454C2.36579 118.95 2.18056 97.4456 1.95703 75.9416L1.77 75.9403Z" fill="grey"/>
        //     <path d="M61.8573 92.567C61.969 91.5947 62.1693 90.6341 62.4557 89.6982C64.1094 85.099 65.7699 80.4985 67.6218 75.9775C68.3385 74.3441 69.3008 72.8299 70.475 71.4883C89.4014 48.9894 108.635 26.7664 129.525 6.04649C130.377 5.16797 131.286 4.34584 132.245 3.58533C134.961 1.51498 137.789 1.44934 140.509 3.53207C142.165 4.84379 143.736 6.26011 145.213 7.77241C147.819 10.3573 150.337 13.0293 152.912 15.6441C155.207 17.9737 154.66 20.907 152.892 22.8478C151.469 24.4108 149.942 25.8761 148.437 27.361C130.926 44.6435 113.242 61.756 95.9987 79.3035C91.0902 84.4107 85.4565 88.7637 79.2803 92.2219C76.264 93.8806 73.1619 95.3831 70.0799 96.9194C69.2865 97.3239 68.4529 97.6436 67.5938 97.8748C63.867 98.8367 61.7364 97.1246 61.8573 92.567ZM85.7476 79.3146L131.152 32.2134L124.271 21.8865C108.69 38.6968 93.3573 55.2375 77.7968 72.0263C80.5864 74.5851 83.2498 77.0273 85.745 79.3146H85.7476ZM129.899 16.6959L138.171 25.0582L144.561 19.3706C141.804 16.1319 139.264 13.1479 136.617 10.0381L129.899 16.6959ZM73.7909 78.6704C72.9546 80.6164 72.3314 82.0668 71.7174 83.4969L74.2353 86.3143L78.0769 84.0707L73.7909 78.6704Z" fill="grey"/>
        //   </g>
        //   <defs>
        //     <clipPath id="clip0"><rect fill="#ebe3d9" height="155" transform="translate(0.777344)" width="154"/></clipPath>
        //   </defs>
        // </svg>
//       </button>

//       {/* Modal (New/Edit Task) */}
//       {subWork !== 0 && (
//         <div className='absolute inset-0 w-full h-full backdrop-blur-sm flex justify-center items-center z-50 mt-20'>
//           {subWork === 1 && <NewTaskForm subWork={subWork} setSubWork={setSubWork} setRefresh={setRefresh}/>}
//           {subWork === 2 && <EditTask setSubWork={setSubWork} todo={task[editIdx]} editIdx={editIdx} setRefresh={setRefresh}/>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Worklist;
import {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { DataContext } from "../contexts/DataContext";
import { LoadingContext } from "../contexts/LoadingContext";
import { TaskContext } from "../contexts/TaskContext";
import "../styles/Tasks.css";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TaskCard from "../component/TaskCard";
import NewTaskForm from "../component/NewTaskForm";
import EditTask from "../component/EditTask";
import { motion, AnimatePresence } from "framer-motion";

const Worklist = () => {
  const { data } = useContext(DataContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const { task, setTask } = useContext(TaskContext);

  const [subWork, setSubWork] = useState(0);
  const [filterZ, setFilterZ] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [filter, setFilter] = useState("all");
  const [lazyLoader, setLazyLoader] = useState(false);
  const [editIdx, setEditIdx] = useState(-1);
  const [refresh, setRefresh] = useState(0);

  const lazyRef = useRef(null);
  const scrollRef = useRef(null);

  // Floating button subtle animation
  useGSAP(() => {
    gsap.to(".createNote", {
      y: -5,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  // 📦 Fetch tasks (memoized for stable reference)
  const getTask = useCallback(
    async (worklist = "all", pNo = 0) => {
      try {
        const res = await axios.get("/api/user/tasks/worklist", {
          params: {
            userName: data.userName,
            worklist,
            pageno: pNo,
          },
        });
        const fetchedTasks = res.data.tasks;

        if (fetchedTasks.length > 0) setPageNo((prev) => prev + 1);
        setTask((prev) =>
          pNo === 0 ? [...fetchedTasks] : [...prev, ...fetchedTasks]
        );
      } catch (error) {
        console.error("Task fetch error:", error);
      } finally {
        setLazyLoader(false);
      }
    },
    [data.userName, setTask]
  );

  // 🌀 Observe bottom element for lazy loading
  useEffect(() => {
    if (!lazyRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLazyLoader(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(lazyRef.current);
    return () => observer.disconnect();
  }, []);

  // 🧭 Lazy load trigger
  useEffect(() => {
    if (lazyLoader) getTask(filter, pageNo);
  }, [lazyLoader, filter, pageNo, getTask]);

  // 🔁 Initial fetch
  useEffect(() => {
    if (data.userName && !loading) {
      setPageNo(0);
      setLazyLoader(true);
    }
  }, [data.userName, loading]);

  return (
    <main className="relative w-screen min-h-screen overflow-x-hidden overflow-y-auto flex justify-center items-start">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          background:
            "linear-gradient(135deg, #D7E3FC, #FFF5E4, #E2F0CB, #FFD1DC)",
          backgroundSize: "300% 300%",
          animation: "gradientFlow 18s ease infinite",
        }}
      />
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Header + Filter */}
      <motion.div
        className="mt-0 w-full flex flex-col items-center px-2 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Filter Dropdown */}
        <div
          className={`filter fixed top-2 left-4 bg-white/80 backdrop-blur-lg border border-gray-200 shadow-md rounded-xl px-3 py-2 transition-all ${
            filterZ ? "opacity-100 scale-105" : "opacity-90 scale-100"
          } z-[100]`}
        >
          <select
            id="filterType"
            className="outline-none text-gray-700 font-medium bg-transparent cursor-pointer"
            defaultValue="all"
            onClick={() => setFilterZ(true)}
            onChange={(e) => {
              setPageNo(0);
              setFilter(e.target.value);
              getTask(e.target.value.toLowerCase(), 0);
            }}
            onBlur={() => setFilterZ(false)}
          >
            {data.worklist.map((ele, idx) => (
              <option value={ele} key={idx}>
                {ele[0].toUpperCase() + ele.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Task List */}
        <div
          ref={scrollRef}
          className="w-full flex flex-col items-center pb-24 max-h-[100vh] overflow-y-auto mt-6 z-[5]"
          key={refresh}
          style={{ height: 'calc(100vh - 80px)' }}
        >
          <AnimatePresence>
            {Array.isArray(task) && task.length > 0 ? (
              task.map((e, idx) => (
                <motion.div
                  className="task-box w-[90%] sm:w-[80%] md:w-[60%] bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all my-3 rounded-xl border border-gray-200 p-4"
                  key={e._id + idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <TaskCard
                    todo={e}
                    worklist={data.worklist}
                    setSubWork={setSubWork}
                    setEditIdx={setEditIdx}
                    idx={idx}
                    setRefresh={setRefresh}
                  />
                </motion.div>
              ))
            ) : (
              <motion.p
                className="text-gray-700 mt-10 text-lg font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                No tasks found
              </motion.p>
            )}
          </AnimatePresence>

          {/* Lazy Loader */}
          <div
            ref={lazyRef}
            className="w-full flex justify-center items-center mb-6 text-gray-600"
          >
            {lazyLoader && (
              <motion.div
                className="animate-pulse text-lg font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
              >
                Loading more tasks...
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Floating Add Button */}
      <motion.button
        className="createNote fixed bottom-26 right-10 bg-[#fff8ec] border-2 border-[#e7d2b0] rounded-full h-16 w-16 flex items-center justify-center shadow-lg z-10"
        whileHover={{ scale: 1.15, rotate: 8 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSubWork(1)}
      >
        <svg fill="#ebe3d9" viewBox="0 0 155 155" className='h-10 w-10'>
          <g clipPath="url(#clip0)">
            <path d="M1.77 75.9403C1.77 61.4508 1.80893 46.959 1.74525 32.4724C1.7277 28.3545 1.36971 24.2391 1.243 20.1205C0.910304 9.24447 8.36408 1.26206 19.9368 1.03412C44.0589 0.558703 68.1786 -0.478187 92.3151 0.345657C94.8694 0.432926 97.4341 0.253818 99.9865 0.366486C101.533 0.427783 103.067 0.680246 104.553 1.11808C105.203 1.30689 105.776 1.70079 106.187 2.2414C106.597 2.78201 106.822 3.44053 106.83 4.11966C106.926 5.59347 106.397 6.90065 105.076 7.45162C103.445 8.1232 101.737 8.58846 99.9923 8.83685C98.4413 8.98416 96.8811 8.98716 95.3301 8.8459C75.2081 7.98103 55.0768 8.08262 34.9489 8.44668C29.5141 8.57276 24.0906 9.005 18.7042 9.74138C15.3331 10.1849 12.2485 11.7089 10.9424 15.2693C10.3554 16.7013 10.0373 18.2295 10.004 19.7772C10.1574 25.6738 10.5162 31.5652 10.8053 37.4584C10.9035 39.4617 11.097 41.463 11.1191 43.4663C11.3232 61.7445 11.5974 80.0231 11.6474 98.3027C11.6786 109.67 11.3003 121.037 11.2367 132.405C11.3128 135.406 11.5515 138.401 11.9515 141.377C12.1594 143.388 13.2745 144.618 15.3713 144.829C16.0341 144.894 16.6897 145.122 17.3486 145.122C23.5671 145.127 29.7875 145.199 36.0034 145.057C43.8951 144.876 51.7816 144.32 59.6732 144.265C78.9138 144.135 98.156 144.151 117.397 144.205C122.843 144.221 128.287 144.583 133.733 144.76C135.745 144.894 137.744 144.344 139.404 143.197C141.065 142.05 142.29 140.375 142.882 138.443C143.121 137.714 143.24 136.95 143.234 136.183C143.16 130.285 142.665 124.367 143.003 118.496C144.176 98.1158 144.168 77.7228 144.161 57.3257C144.161 55.2085 144.191 53.0886 144.314 50.9759C144.369 49.7514 144.563 48.5372 144.894 47.357C145.067 46.7019 145.439 46.1173 145.96 45.6846C146.48 45.2518 147.122 44.9925 147.796 44.9427C149.361 44.7603 150.803 45.1616 151.472 46.636C152.143 48.0317 152.567 49.5337 152.727 51.075C153.218 57.8514 153.559 64.6395 153.936 71.4245C155.117 92.7207 153.911 113.988 153.286 135.263C153.175 137.486 152.762 139.684 152.059 141.796C151.42 144 150.273 146.024 148.712 147.703C147.151 149.383 145.218 150.672 143.069 151.467C138.918 153.083 134.498 153.893 130.045 153.853C115.701 153.816 101.356 153.862 87.0121 153.844C81.563 153.838 76.1119 153.619 70.666 153.714C57.772 153.944 44.8809 154.334 31.9877 154.6C26.7634 154.707 21.53 154.828 16.3116 154.643C8.01703 154.349 2.75501 148.868 2.64585 140.454C2.36579 118.95 2.18056 97.4456 1.95703 75.9416L1.77 75.9403Z" fill="grey"/>
            <path d="M61.8573 92.567C61.969 91.5947 62.1693 90.6341 62.4557 89.6982C64.1094 85.099 65.7699 80.4985 67.6218 75.9775C68.3385 74.3441 69.3008 72.8299 70.475 71.4883C89.4014 48.9894 108.635 26.7664 129.525 6.04649C130.377 5.16797 131.286 4.34584 132.245 3.58533C134.961 1.51498 137.789 1.44934 140.509 3.53207C142.165 4.84379 143.736 6.26011 145.213 7.77241C147.819 10.3573 150.337 13.0293 152.912 15.6441C155.207 17.9737 154.66 20.907 152.892 22.8478C151.469 24.4108 149.942 25.8761 148.437 27.361C130.926 44.6435 113.242 61.756 95.9987 79.3035C91.0902 84.4107 85.4565 88.7637 79.2803 92.2219C76.264 93.8806 73.1619 95.3831 70.0799 96.9194C69.2865 97.3239 68.4529 97.6436 67.5938 97.8748C63.867 98.8367 61.7364 97.1246 61.8573 92.567ZM85.7476 79.3146L131.152 32.2134L124.271 21.8865C108.69 38.6968 93.3573 55.2375 77.7968 72.0263C80.5864 74.5851 83.2498 77.0273 85.745 79.3146H85.7476ZM129.899 16.6959L138.171 25.0582L144.561 19.3706C141.804 16.1319 139.264 13.1479 136.617 10.0381L129.899 16.6959ZM73.7909 78.6704C72.9546 80.6164 72.3314 82.0668 71.7174 83.4969L74.2353 86.3143L78.0769 84.0707L73.7909 78.6704Z" fill="grey"/>
          </g>
          <defs>
            <clipPath id="clip0"><rect fill="#ebe3d9" height="155" transform="translate(0.777344)" width="154"/></clipPath>
          </defs>
        </svg>
      </motion.button>

      {/* Modal (New/Edit Task) */}
      <AnimatePresence>
        {subWork !== 0 && (
          <motion.div
            className="absolute inset-0 w-full h-full backdrop-blur-md flex justify-center items-center z-[500]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {subWork === 1 && (
              <NewTaskForm
                subWork={subWork}
                setSubWork={setSubWork}
                setRefresh={setRefresh}
              />
            )}
            {subWork === 2 && (
              <EditTask
                setSubWork={setSubWork}
                todo={task[editIdx]}
                editIdx={editIdx}
                setRefresh={setRefresh}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Worklist;
