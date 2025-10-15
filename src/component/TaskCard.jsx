// import React, { useState } from 'react'
// // import _ from 'lo';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';
// import { useGSAP } from '@gsap/react';
// const TaskCard = ({task}) => {
    
//     const [title,setTitle]=useState(task.title);
//     const [description,setDescription]=useState(task.description);
//     const [subTask,setSubTask]=useState(task.subTask||[]);
//     // Task Data
// // console.log(subTask)
//     const [expand,setExpand]=useState(false);
//     const [changes,makeChanges]=useState(false);
//     const [editObj,setEditObj]=useState({});

//     //Update Functions

//     function titleUpdate(data){

//     }

//     //-------------------------------
//     const isoString = task.createdAt;
    
//     // Convert to JS Date
//     const date = new Date(isoString);

//     // Options for IST
//     const options = {
//       timeZone: "Asia/Kolkata",   // IST
//       weekday: "short",            // Monday, Tuesday ...
//       year: "numeric",
//       month: "short",              // September
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: false
//     };
//     const formatted = date.toLocaleString("en-IN", options).replaceAll(' ',' ').split(',');
//     // let a={};
//     // console.log(Object.keys(a).length===0)
//     function handleEdit(){
//       if(changes){

//       }
//     }
//     // console.log(formatted); 
//   return (
//     <div className='relative task-container roundedd-b-2xl roundedd-tr-2xl text rounded-tl-0 block text-wrap h-full w-full'>
//       <div className=" flex flex-row items-center justify-center w-full">
//         <div className="bg-white w-full leading-5">
//           <h1>
//             Title:{" "}
//             <b>
//               <u
//                 contentEditable
//                 suppressContentEditableWarning={true}
//                 onInput={(e) => {
//                   setTitle(e.target.innerText);  
//                   makeChanges(true);
//                 }}
//                 onBlur={(e) =>{ 
//                   if(e.target.innerText.trim()===''){
//                     alert("Title can't be empty");
//                     console.log(task.title)
//                     setTitle(task.title);
//                   }
//                 }}
//                 className='outline-0'
//               >
//                 {title}
//               </u>
//             </b>
//           </h1>

//           <span className='text-[20px] line pl-4 pb-2 mt-1 inline-block'>Description: 
//             <p
//               contentEditable
//               suppressContentEditableWarning={true}
//               onInput={(e) => {
//                 setDescription(e.target.innerText);  
//                 makeChanges(true);
//               }}
//               onBlur={(e) =>{ 
//                 if(e.target.innerText.trim()===''){
//                   // alert("Title can't be empty");
//                   // console.log(task.title)
//                   setDescription('________________________');
//                 }
//               }}
//               className='outline-0 inline pl-2'
//             >
//               {description}
//             </p>
//           </span>
//         </div>
//         <div className="right-0 top-0 flex flex-col items-start justify-center self-start p-0">
//           {/* q {task._id} */} 
//           <div className="h-10 w-30 flex flex-row items-center justify-center">
//             <button className="edit" onClick={handleEdit}>
//               {
//                 (changes)?
//               <svg height="24" width='24' version="1.1" viewBox="0 0 18 18">
//                 <desc/><defs/>
//                 <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
//                   <g fill="#000000" id="Core" transform="translate(-255.000000, -381.000000)">
//                     <g id="save" transform="translate(255.000000, 381.000000)">
//                       <path d="M14,0 L2,0 C0.9,0 0,0.9 0,2 L0,16 C0,17.1 0.9,18 2,18 L16,18 C17.1,18 18,17.1 18,16 L18,4 L14,0 L14,0 Z M9,16 C7.3,16 6,14.7 6,13 C6,11.3 7.3,10 9,10 C10.7,10 12,11.3 12,13 C12,14.7 10.7,16 9,16 L9,16 Z M12,6 L2,6 L2,2 L12,2 L12,6 L12,6 Z" id="Shape"/>
//                     </g>
//                   </g>
//                 </g>
//               </svg>
//                 :
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
//                 <path d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M8 10H16M8 6H12M8 14H11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               }
//             </button>
//             <button className="delete">
//               <svg xmlns="http://www.w3.org/2000/svg" className='h-8' viewBox="0 0 48 48" width="48"><path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-24h-24v24zm26-30h-7l-2-2h-10l-2 2h-7v4h28v-4z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
//             </button>
//             <button className="flag">
//               {
//                 (task.done.flag)?
//                 <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-flag-fill" fill="currentColor" height="24" viewBox="0 0 16 16" width="24">
//                   <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
//                 </svg>
//                 :<svg className="bi bi-flag" fill="currentColor" height="24" viewBox="0 0 16 16" width="24" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/>
//                 </svg>
//               }
//             </button>
//           </div>
//           <div className="expand w-full flex items-center justify-center" onClick={()=>setExpand(pre=>!pre)}>
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" className='h-6' viewBox="0 0 15 15">
//               <path clipRule="evenodd" d="M7.49999 3.09998C7.27907 3.09998 7.09999 3.27906 7.09999 3.49998C7.09999 3.72089 7.27907 3.89998 7.49999 3.89998H14.5C14.7209 3.89998 14.9 3.72089 14.9 3.49998C14.9 3.27906 14.7209 3.09998 14.5 3.09998H7.49999ZM7.49998 5.1C7.27907 5.1 7.09998 5.27908 7.09998 5.5C7.09998 5.72091 7.27907 5.9 7.49998 5.9H14.5C14.7209 5.9 14.9 5.72091 14.9 5.5C14.9 5.27908 14.7209 5.1 14.5 5.1H7.49998ZM7.1 7.5C7.1 7.27908 7.27909 7.1 7.5 7.1H14.5C14.7209 7.1 14.9 7.27908 14.9 7.5C14.9 7.72091 14.7209 7.9 14.5 7.9H7.5C7.27909 7.9 7.1 7.72091 7.1 7.5ZM7.49998 9.1C7.27907 9.1 7.09998 9.27908 7.09998 9.5C7.09998 9.72091 7.27907 9.9 7.49998 9.9H14.5C14.7209 9.9 14.9 9.72091 14.9 9.5C14.9 9.27908 14.7209 9.1 14.5 9.1H7.49998ZM7.09998 11.5C7.09998 11.2791 7.27907 11.1 7.49998 11.1H14.5C14.7209 11.1 14.9 11.2791 14.9 11.5C14.9 11.7209 14.7209 11.9 14.5 11.9H7.49998C7.27907 11.9 7.09998 11.7209 7.09998 11.5ZM2.5 9.25003L5 6.00003H0L2.5 9.25003Z"
//                fill={`${(!expand)?'#fff':'red'}`} fillRule="evenodd"/>
//             </svg>
//           </div>
//         </div>
//       </div>
//       <div className={`text-[16px] p-2`} style={{display:(expand)?'block':'none'}} >
//           {
//             (subTask).map((item,idx)=>{
//               // console.log(idx)
//               return (
//               <div className="flex flex-row items-center justify-between" key={idx}>
//                 <div className="">
//                   <input type="checkbox" className=' mr-2' defaultChecked={item?.done?.flag} onClick={(e)=>console.log(item?.done?.flag)}/>
//                   {item.title}: {item.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, natus repudiandae magnam voluptatum quisquam consectetur explicabo molestias ut, amet vel enim nisi earum, quos cupiditate. Suscipit officia laboriosam libero dolor?
//                 </div>
//                 <div className="w-20 flex flex-row items-start justify-start self-start">
//                   <div className="edit ">
//                     <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"/></svg>
//                   </div>
//                   <div className="delete ml-2" >
//                     <svg viewBox="0 0 96 96" height={24} width={24}>
//                       <g>
//                         <path d="M48,0A48,48,0,1,0,96,48,48.0512,48.0512,0,0,0,48,0Zm0,84A36,36,0,1,1,84,48,36.0393,36.0393,0,0,1,48,84Z"/>
//                         <path d="M64.2422,31.7578a5.9979,5.9979,0,0,0-8.4844,0L48,39.5156l-7.7578-7.7578a5.9994,5.9994,0,0,0-8.4844,8.4844L39.5156,48l-7.7578,7.7578a5.9994,5.9994,0,1,0,8.4844,8.4844L48,56.4844l7.7578,7.7578a5.9994,5.9994,0,0,0,8.4844-8.4844L56.4844,48l7.7578-7.7578A5.9979,5.9979,0,0,0,64.2422,31.7578Z"/>
//                       </g>
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//               )
//             })
//           }
//       </div>
//       <div className="text-[14px] flex flex-row justify-between">
//         <span className="">
//           Created On: {formatted[0]+', '+formatted[1]+', '+formatted[2]}  
//         </span>
//         <span className="">
//           Created At: {formatted[3]}
//         </span>
//       </div>
//     </div>
//   )
// }

// export default TaskCard;

import axios from "axios";
import React, { useContext, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";

const TaskCard = ({todo,worklist,setSubWork,setEditIdx }) => {
  // console.log(worklist)
  const {task,setTask} =useContext(TaskContext);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [listType,setListType]=useState(todo.listType)
  const [subTask, setSubTask] = useState(todo.subTask || []);
  const [newSub,setNewSub]=useState({});
  const [expand, setExpand] = useState(false);
  const [changes, makeChanges] = useState(false);

  const [update,setUpdate]=useState({});
  
  const isoString =todo.createdAt;
  const date = new Date(isoString);
  const options = {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const formatted = date.toLocaleString("en-IN", options).split(",");

  // function handleEdit() {
  //   if (changes) {
  //     console.log("Save changes here...");
  //     makeChanges(false);
  //   }
  // }
  // console.log(!description)
  const [popUp,setPopUp]=useState(false);
  // function showPopup(){
  async function deleteTask(){
    setPopUp(false);
    let delItem = await axios.delete(`/api/user/tasks/worklist?taskId=${todo._id}`, {
      withCredentials: true
    });
    if(delItem.data.code===200){
      let newList = (task).filter((e)=>(e._id!==todo._id))
      console.log(delItem.data)
      // alert('Task Deleted');
      setTask(newList);
    }
  }
  // }
  return (
    <div className="relative bg-white shadow-lg rounded-xl border-[#edcb34] border-[3px] p-4 mb-4 transition hover:shadow-x" style={{opacity: ((todo.done.flag)?80:100)}}>
      {/* Title + Description */}
      <div className="w-full">
        <h1 className="text-lg font-semibold text-gray-800">
          Title:{" "}
          <input
            contentEditable
            suppressContentEditableWarning={true}
            placeholder="________________________"
            onInput={(e) => {
              setTitle(e.target.value);
              makeChanges(true);
            }}
            value={title}
            onBlur={(e) => {
              if (e.target.value.trim() === "") {
                // alert("Title can't be empty");
                setTitle(todo.title);
              }
            }}
            className="outline-0 ml-2 px-1 rounded hover:bg-gray-100"
          />
            {/* {title} */}
          {/* </input> */}
        </h1>

        <p className="text-gray-600 mt-2">
          <span className="font-medium">Description:</span>
          <input
            contentEditable
            suppressContentEditableWarning={true}
            placeholder="________________________"
            onInput={(e) => {
              setDescription(e.target.value);
              console.log(e.target.value)
              makeChanges(true);
            }}
            onBlur={(e) => {
              if (e.target.value.trim() === "") {
                setDescription("");
              }
            }}
            className="outline-0 ml-2 px-1 rounded hover:bg-gray-100"
            value={description}
          />
        </p>
        <p>
          WorkList : 
          <select name="" id="filterType" className='outline-none bg-red-500 w-auto ml-2 pl-1' defaultValue={listType}
            onChange={(e)=>{
              if(e.target.value!==todo.listType){
                setListType(e.target.value);
                alert(e.target.value);
              }
            }}  
          >
            {
              worklist.map((ele,idx)=>(
                <option value={`${ele}`} key={idx}>{ele}</option>  
              ))
            }
          </select>
          {/* {
            (todo.listType) ?todo.listType[0].toUpperCase() +todo.listType.slice(1).toLowerCase() : ""
          } */}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 flex gap-3">
        {/* Save/Edit */}
        <button
          className="p-1 rounded hover:bg-gray-100"
          onClick={()=>{
              // setExpand(true);
              setSubWork(2);
            }}
          title={changes ? "Save" : "Edit"}
        >
          {changes ? "💾" : "✏️"}
        </button>

        {/* Delete */}
        <button
          className="p-1 rounded hover:bg-red-100 text-red-500"
          title="Delete"
          onClick={()=>{setPopUp(pre=>!pre); console.log(todo)}}
        >
          🗑️
        </button>
        {
          popUp &&(
          <div className="fixed left-0 top-0 z-[15] bg-green-600 w-full h-full flex items-center justify-center">
            <div className="h-50 w-100 bg-[red] flex flex-col items-center justify-between">
              <div className=" flex items-center justify-center h-[70%]">
                Do you really want to delete it?
              </div>
              <div className="bg-yellow-300 h-[30%] w-full flex px-10 items-center justify-between">
                <button
                  onClick={deleteTask}
                >
                  Yes
                </button>
                <button
                  onClick={()=>setPopUp(pre=>!pre)}
                >
                  No
                </button>
              </div>  
            </div>
          </div>
          )
        }
        
        {/* Flag */}
        <button
          className={`p-1 bg-amber-400 rounded ${
           todo.done.flag ? "text-green-600" : "text-gray-400"
          }`}
          title="Mark as done"
          onClick={async ()=>{
            let done={
              done:{
                flag:true,
                finishTime: new Date(),
              }
            }
            let abcd=await axios.patch('/api/user/tasks/worklist',
              {updateBlock:done,taskId:todo._id},
              {withCredentials:true},
            )
            console.log(abcd.data)
          }}
        >
          {
            (todo.done.flag)?
            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-flag-fill" fill="currentColor" height="24" viewBox="0 0 16 16" width="24">
              <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
            </svg>
            :<svg className="bi bi-flag" fill="currentColor" height="24" viewBox="0 0 16 16" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/>
            </svg>
          }         
        </button>
      </div>

      {/* Expand Subtasks */}
      <div className="w-full flex items-center justify-between">
        <div
          className="mt-4 cursor-pointer text-blue-600 hover:underline"
          onClick={() => setExpand((prev) => !prev)}
        >
          {expand ? "Hide Subtasks ▲" : "Show Subtasks ▼"}
        </div>
        {
          // (expand||1) && (
          //   <button className="" >
          //     ➕
          //   </button>    
          // )
        }
      </div>
      

      {/* Subtasks */}
      {expand && (
        <div className="mt-3 space-y-2 pl-3">
          {subTask.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between bg-gray-50 p-2 rounded-md"
            >
              <div className="flex items-start ">
                <input
                  type="checkbox"
                  className="mr-2 mt-1 self-center"
                  defaultChecked={item?.done?.flag}
                  onClick={() => console.log(item?.done?.flag)}
                />
                <p className="text-gray-700 bg-pink-400 w-full"
                  onMouseLeave={()=>{
                    // alert('hello')
                    console.log('hii3t')
                  }}
                >
                  <input
                    contentEditable
                    suppressContentEditableWarning={true}
                    placeholder="________________________"
                    onInput={(e) => {
                      setNewSub(pre =>{return {...pre,title:e.target.value}});
                      console.log({...newSub,title:(e.target.value).trim()})
                      makeChanges(true);
                    }}
                    // onBlur={(e) => {
                    //   if (e.target.value.trim() === "") {
                    //     setDescription("");
                    //   }
                    // }}
                    className="outline-0 inline ml-2 px-1 max-w-1/2 rounded hover:bg-gray-100"
                    defaultValue={item.title}
                  />{'=>'}
                  <input
                    contentEditable
                    suppressContentEditableWarning={true}
                    placeholder="________________________"
                    onInput={(e) => {
                      setNewSub(pre =>{return {...pre,description:(e.target.value).trim()}});
                      console.log({...newSub,description:(e.target.value).trim()})
                      makeChanges(true);
                    }}
                    // onBlur={(e) => {
                    //   if (e.target.value.trim() === "") {
                    //     setDescription("");
                    //   }
                    // }}
                    // onMouseLeave={}
                    className="outline-0 max-w-1/2 inline ml-2 px-1 rounded hover:bg-gray-100"
                    defaultValue={item.description}
                  />
                  {/* {item.description} */}
                </p>
              </div>
              <div className="flex gap-2">
                {/* <button className="text-blue-500 hover:text-blue-700">✏️</button> */}
                <button className="text-red-500 hover:text-red-700" 
                  onClick={(e)=>{
                    let newArr=subTask.filter((_,i)=>i!==idx)
                    setSubTask(newArr);
                  }}
                >❌</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex justify-between text-sm text-gray-500 border-t pt-2">
        <span>Created On: {formatted[0] + ", " + formatted[1]}</span>
        <span>At: {formatted[3]}</span>
      </div>
    </div>
  );
};

export default TaskCard;
