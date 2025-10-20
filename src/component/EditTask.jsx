// import React, { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { DataContext } from "../contexts/DataContext";
// import { useNavigate } from "react-router-dom";
// import { TaskContext } from "../contexts/TaskContext";

// const EditTask = ({ subWork,setSubWork, todo,editIdx }) => {
//   const { data } = useContext(DataContext);
//   const {task,setTask}=useContext(TaskContext);
//   console.log(todo)
//   const [title, setTitle] = useState(todo.title);
//   const [description, setDescription] = useState(todo.description);
//   const [listType, setListType] = useState(todo.listType);
//   const [subTasks, setSubTasks] = useState(todo.subTask);
//   const date = new Date(`${todo.endTime}`);
//   const options = {
//     timeZone: "Asia/Kolkata",
//     weekday: "short",
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false,
//   };
//   const formatted = date.toLocaleString("en-IN", options).split(",");
//   // console.log(todo.subTask)
//   useEffect(()=>{
//     console.log('hello')
//   },[])
//   // console.log(formatted)
//   const [endDate, setEndDate] = useState(()=>{
//                     let dd,mm,yyyy;
//                     let arr=(formatted[1].trim()).split(' ')
//                     // console.log(arr)
//                     yyyy=formatted[2].trim();
//                     let monthList=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
//                     dd=arr[0];
//                     let temp=monthList.findIndex(ele=>ele===arr[1].toLowerCase())+1;
//                     mm=`${(temp/10)?'':'0'}${temp}`;
//                     return `${yyyy}-${mm}-${dd}`;
//                   });
//   const [endTime, setEndTime] = useState(()=>{
//                     let arr=(formatted[3].trim()).split(':');
//                     // console.log(arr)
//                     return `${arr[0]}:${arr[1]}`;
//                   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const navigate = useNavigate();
//   // 🔹 Add Subtask
//   const addSubTask = () => setSubTasks([...subTasks, { title: "", description: "" }]);
//   // const subWork=props.subWork;
//   // const setSubWork=props.setSubWork;
//   const removeSubTask = (idx) => setSubTasks(subTasks.filter((_, i) => i !== idx));
//   const handleSubTaskChange = (idx, field, value) => {

//     const updated = [...subTasks];
//     updated[idx][field] = value;
//     setSubTasks(updated);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('hi')
//     setMessage({ text: "", type: "" });
//     let removeEmpty=subTasks;
//     if(subTasks[subTasks.length-1].title.trim()===''){
//       removeEmpty.pop();
//     }
//     setLoading(true);
//     try {
//       if (!endDate || !endTime) {
//         setMessage({ text: "Please select End Date & Time", type: "error" });
//         setLoading(false);
//         return;
//       }

//       // Convert to Date()
//       const combinedEndTime = new Date(`${endDate}T${endTime}:00+05:30`); 
//       // appends IST offset (+05:30). If backend uses UTC, this is correct.


//       let taskData = {};
//       if(title!==todo.title)
//         taskData={title,...taskData}
//       if(description!==todo.description)
//         taskData={description,...taskData}
//       if(Date(combinedEndTime)!==Date(todo.endTime))
//         taskData={endTime:combinedEndTime,...taskData}
//       // console.log([Date(combinedEndTime),Date(todo.endTime)])
//       if(listType!==todo.listType)
//         taskData={listType,...taskData}
//       if(JSON.stringify(todo.subTask)!==JSON.stringify(subTasks))
//         taskData={subTask:subTasks,...taskData}
//       // console.log(JSON.stringify(todo.subTask),JSON.stringify(subTasks))
//       // console.log(JSON.stringify(todo.subTask)!==JSON.stringify(subTasks))
//       // setSubWork(0)
//       if(JSON.stringify(taskData)!==JSON.stringify({})){
//         let res=await axios.patch('/api/user/tasks/worklist',
//                 {updateBlock:taskData,taskId:todo._id},
//                 {withCredentials:true},
//               )
//         if(res.data.updated){
//           let newList =[...task]      
//           newList[editIdx]=res.data.task;
//           setTask(newList);
//           console.log(task[0].description);
//           console.log(newList[0].description);
//           setTimeout(() => {
//             setSubWork(0)  
//           }, 1000);
          
//         }
        
//       }

//       // if (onTaskCreated) onTaskCreated(res.data);
//     } catch (err) {
//       console.log(err)
//       setMessage({ text: err.response?.data?.msg || "Failed to update task", type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   function cancelHandler(e){
//     e.preventDefault();
//     setSubWork(0);
//     // navigate('/user/tasks/worklist');
//   }
//   // useEffect(()=>{
//   //   return ()=>{
//   //     console.log('boiii')
//   //     todo=null
//   //   }
//   // },[])
//   return (
//     <div className="bg-[#ececdb] w-full h-full z-100 flex items-center justify-center p-4">
//       <div className="bg-[#ece3d9] shadow-2xl w-full max-w-2xl rounded-2xl overflow-hidden border-2 border-[#EBCB90] p-6">
//         <form className="flex flex-col w-full" onSubmit={handleSubmit}>
//           <fieldset className="border-4 border-[#d4d4d4] p-4 rounded-lg flex flex-col gap-4">
//             <legend className="text-3xl px-4 font-bold border-2 border-[#EBCB90] rounded-md">
//               Edit Task
//             </legend>

//             {/* Title */}
//             <div className="flex flex-col gap-1">
//               <label className="font-semibold">Title</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Task title"
//                 required
//                 className="p-2 border-2 border-[#EBCB90] rounded-sm bg-[#e4e4e4] 
//                   focus:bg-[#f5f1f1] outline-none transition-all duration-500"
//               />
//             </div>

//             {/* Description */}
//             <div className="flex flex-col gap-1">
//               <label className="font-semibold">Description</label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Task description"
//                 className="p-2 border-2 border-[#EBCB90] rounded-sm bg-[#e4e4e4] 
//                   focus:bg-[#f5f1f1] outline-none transition-all duration-500"
//               />
//             </div>

//             {/* End Date + Time */}
//             <div className="flex flex-col gap-1">
//               <label className="font-semibold">End Time</label>
//               <div className="flex gap-2">
//                 <input
//                   type="date"
//                   // defaultValue={}
//                   value={endDate}
//                   onChange={(e) =>{setEndDate(e.target.value)}}
//                   required
//                   className="flex-1 p-2 border-2 border-[#EBCB90] rounded-sm bg-[#e4e4e4] 
//                     focus:bg-[#f5f1f1] outline-none transition-all duration-500"
//                 />
//                 <input
//                   type="time"
//                   value={endTime}
//                   onChange={(e) =>{console.log(e.target.value)}}
//                   required
//                   className="flex-1 p-2 border-2 border-[#EBCB90] rounded-sm bg-[#e4e4e4] 
//                     focus:bg-[#f5f1f1] outline-none transition-all duration-500"
//                 />
//               </div>
//             </div>

//             {/* List Type */}
//             <div className="flex flex-col gap-1">
//               <label className="font-semibold">List Type</label>
//               <select
//                 value={listType}
//                 onChange={(e) => setListType(e.target.value)}
//                 className="p-2 border-2 border-[#EBCB90] rounded-sm bg-[#e4e4e4] 
//                   focus:bg-[#f5f1f1] transition-all duration-500"
//               >
//               {
//                 (data.worklist).map((ele,i)=>(
//                   <option value={ele} key={i}>{ele}</option>
//                 ))
//               }
//                 {/* <option value="all">All</option>
//                 <option value="work">Work</option>
//                 <option value="personal">Personal</option> */}
//               </select>
//             </div>

//             {/* Subtasks */}
//             <div className="flex flex-col gap-2">
//               <label className="font-semibold">Subtasks</label>
//               {subTasks.map((sub, i) => (
//                 <div key={i*i} className="flex gap-2 items-center">
//                   <input
//                     type="text"
//                     value={sub.title}
//                     onChange={(e) => handleSubTaskChange(i, "title", e.target.value)}
//                     placeholder="Subtask title"
//                     className="flex-1 p-2 border-2 border-[#EBCB90] rounded-sm bg-[#e4e4e4] 
//                       focus:bg-[#f5f1f1] outline-none transition-all duration-500"
//                   />
//                   <input
//                     type="text"
//                     value={sub.description}
//                     onChange={(e) => handleSubTaskChange(i, "description", e.target.value)}
//                     placeholder="Subtask description"
//                     className="flex-1 p-2 border-2 border-[#EBCB90] rounded-sm bg-[#e4e4e4] 
//                       focus:bg-[#f5f1f1] outline-none transition-all duration-500"
//                   />
//                   {subTasks.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeSubTask(i)}
//                       className="text-red-500 font-bold px-2"
//                     >
//                       X
//                     </button>
//                   )}
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={()=>{
//                   if(subTasks[subTasks.length-1].title!=="")
//                     setSubTasks([...subTasks,{title:"",description:"",done:{flag:false}}]);
//                 }}
//                 className="text-blue-500 font-semibold mt-2"
//               >
//                 + Add Subtask
//               </button>
//             </div>

//             {/* Messages */}
//             {message.text && (
//               <div
//                 className={`p-2 rounded ${
//                   message.type === "success" ? "bg-green-300" : "bg-red-300"
//                 }`}
//               >
//                 {message.text}
//               </div>
//             )}

//             {/* Submit */}
//             <div className="flex justify-between gap-2 mt-2">
//               <button
                
//                 onClick={()=>setSubWork(0)}
//               >
//                 Cancel {subWork}
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-[#2eeaff] text-white px-4 py-2 rounded-md 
//                   hover:bg-[#28bfd0] transition-all duration-500"
//               >
//                 {loading ? "Applying Changes..." : "Update Task"}
//               </button>
//             </div>
//           </fieldset>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditTask;

// import React, { useState, useContext, useMemo, useCallback } from "react";
// import axios from "axios";
// import { DataContext } from "../contexts/DataContext";
// import { TaskContext } from "../contexts/TaskContext";
// import { useNavigate } from "react-router-dom";

// // 🧩 SubTaskEditor Component — isolated & memoized
// const SubTaskEditor = React.memo(({ sub, onChange, onRemove, disableRemove }) => (
//   <div className="flex gap-3 items-center bg-[#f7f5f0] border border-[#EBCB90] rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-300">
//     <input
//       type="text"
//       value={sub.title}
//       onChange={(e) => onChange("title", e.target.value)}
//       placeholder="Subtask title"
//       className="flex-1 p-2 border-2 border-[#EBCB90] rounded-md bg-[#faf9f6] 
//         focus:bg-white outline-none transition-all duration-300"
//     />
//     <input
//       type="text"
//       value={sub.description}
//       onChange={(e) => onChange("description", e.target.value)}
//       placeholder="Subtask description"
//       className="flex-1 p-2 border-2 border-[#EBCB90] rounded-md bg-[#faf9f6] 
//         focus:bg-white outline-none transition-all duration-300"
//     />
//     {!disableRemove && (
//       <button
//         type="button"
//         onClick={onRemove}
//         className="text-red-500 font-bold px-3 text-lg hover:text-red-600"
//       >
//         ✕
//       </button>
//     )}
//   </div>
// ));

// const EditTask = ({ setRefresh,setSubWork, todo, editIdx }) => {
//   const { data } = useContext(DataContext);
//   const { task, setTask } = useContext(TaskContext);
//   const navigate = useNavigate();
//   // console.log(todo.subTask[1].title)
//   // 🧠 Extract initial date/time only once
//   const formatted = useMemo(() => {
//     const date = new Date(todo.endTime);
//     const options = {
//       timeZone: "Asia/Kolkata",
//       weekday: "short",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: false,
//     };
//     return date.toLocaleString("en-IN", options).split(",");
//   }, [todo.endTime]);

//   const [title, setTitle] = useState(todo.title);
//   const [description, setDescription] = useState(todo.description);
//   const [listType, setListType] = useState(todo.listType);
//   const [subTasks, setSubTasks] = useState(
//     () => (todo.subTask ? todo.subTask.map((s) => ({ ...s })) : [])
//   );

//   const [endDate, setEndDate] = useState(() => {
//     const arr = formatted[1].trim().split(" ");
//     const yyyy = formatted[2].trim();
//     const monthList = [
//       "jan", "feb", "mar", "apr", "may", "jun",
//       "jul", "aug", "sep", "oct", "nov", "dec",
//     ];
//     const dd = arr[0];
//     const temp = monthList.findIndex((ele) => ele === arr[1].toLowerCase()) + 1;
//     const mm = `${temp < 10 ? "0" : ""}${temp}`;
//     return `${yyyy}-${mm}-${dd}`;
//   });

//   const [endTime, setEndTime] = useState(() => {
//     const arr = formatted[3].trim().split(":");
//     return `${arr[0]}:${arr[1]}`;
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });

//   // 📦 Handlers (memoized)
//   const handleSubTaskChange = useCallback((idx, field, value) => {
//     setSubTasks((prev) => {
//       const updated = [...prev];
//       updated[idx][field] = value;
//       return updated;
//     });
//   }, []);

//   const removeSubTask = useCallback((idx) => {
//     setSubTasks((prev) => prev.filter((_, i) => i !== idx));
//   }, []);

//   const addSubTask = useCallback(() => {
//     setSubTasks((prev) => {
//       if (prev.length === 0 || prev[prev.length - 1].title.trim() !== "") {
//         return [...prev, { title: "", description: "", done: { flag: false } }];
//       }
//       return prev;
//     });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage({ text: "", type: "" });

//     let filteredSubtasks = [...subTasks];
//     if (filteredSubtasks.at(-1)?.title.trim() === "") filteredSubtasks.pop();

//     setLoading(true);
//     try {
//       const combinedEndTime = new Date(`${endDate}T${endTime}:00+05:30`);
//       let taskData = {};

//       if (title !== todo.title) taskData.title = title;
//       if (description !== todo.description) taskData.description = description;
//       if (listType.toLowerCase() !== todo.listType) taskData.listType = listType.toLowerCase();
//       if (combinedEndTime.toISOString() !== new Date(todo.endTime).toISOString())
//         taskData.endTime = combinedEndTime;
//       if (JSON.stringify(filteredSubtasks) !== JSON.stringify(todo.subTask))
//         taskData.subTask = filteredSubtasks;

//       if (Object.keys(taskData).length > 0) {
//         const res = await axios.patch(
//           "/api/user/tasks/worklist",
//           { updateBlock: taskData, taskId: todo._id },
//           { withCredentials: true }
//         );

//         if (res.data.updated) {
//           const newList = [...task];
//           // console.log(task[0])
//           newList[editIdx] = structuredClone(res.data.task);
//           setTask(newList);
//           setMessage({ text: "Task updated successfully!", type: "success" });
//           // setTimeout(() => setSubWork(0), 1200);
//           setRefresh(pre=>!pre);
//           setSubWork(0);
//         }
//       } else {
//         setMessage({ text: "No changes detected.", type: "error" });
//       }
//     } catch (err) {
//       setMessage({
//         text: err.response?.data?.msg || "Failed to update task",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#ececdb] w-full h-full flex items-center justify-center p-4 mt-0">
//       <div className="bg-[#ece3d9] shadow-2xl w-full max-w-2xl rounded-2xl overflow-hidden border-2 border-[#0edbff] p-6">
//         <form className="flex flex-col w-full" onSubmit={handleSubmit}>
//           <fieldset className="border-4 border-[#d4d4d4] p-4 rounded-lg flex flex-col gap-4">
//             <legend className="text-3xl px-4 font-bold border-2 border-[#EBCB90] rounded-md">
//               Edit Task
//             </legend>
//           {/* Title */}
//           <div className="flex flex-col gap-1">
//             <label className="font-semibold">Title</label>
//             <input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Task title"
//               required
//               className="p-2 border-2 border-[#EBCB90] rounded-md bg-[#faf9f6] 
//                 focus:bg-white outline-none transition-all duration-300"
//             />
//           </div>

//           {/* Description */}
//           <div className="flex flex-col gap-1">
//             <label className="font-semibold">Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Task description"
//               className="p-2 border-2 border-[#EBCB90] rounded-md bg-[#faf9f6] 
//                 focus:bg-white outline-none transition-all duration-300 min-h-[80px]"
//             />
//           </div>

//           {/* End Time */}
//           <div className="flex flex-col gap-1">
//             <label className="font-semibold">End Time</label>
//             <div className="flex gap-2">
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 required
//                 className="flex-1 p-2 border-2 border-[#EBCB90] rounded-md bg-[#faf9f6] 
//                   focus:bg-white outline-none transition-all duration-300"
//               />
//               <input
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 required
//                 className="flex-1 p-2 border-2 border-[#EBCB90] rounded-md bg-[#faf9f6] 
//                   focus:bg-white outline-none transition-all duration-300"
//               />
//             </div>
//           </div>

//           {/* List Type */}
//           <div className="flex flex-col gap-1">
//             <label className="font-semibold">List Type</label>
//             <select
//               value={listType}
//               onChange={(e) => setListType(e.target.value)}
//               className="p-2 border-2 border-[#EBCB90] rounded-md bg-[#faf9f6] 
//                 focus:bg-white transition-all duration-300"
//             >
//               {data.worklist.map((ele, i) => (
//                 <option value={ele} key={i}>
//                   {ele.charAt(0).toUpperCase() + ele.slice(1).toLowerCase()}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Subtasks */}
//           <div className="flex flex-col gap-3">
//             <label className="font-semibold">Subtasks</label>
//             {subTasks.map((sub, i) => (
//               <SubTaskEditor
//                 key={i}
//                 sub={sub}
//                 onChange={(field, value) => handleSubTaskChange(i, field, value)}
//                 onRemove={() => removeSubTask(i)}
//                 disableRemove={subTasks.length === 1}
//               />
//             ))}
//             <button
//               type="button"
//               onClick={addSubTask}
//               className="text-[#0088cc] font-semibold mt-1 hover:underline self-start"
//             >
//               + Add Subtask
//             </button>
//           </div>

//           {/* Message */}
//           {message.text && (
//             <div
//               className={`p-3 rounded-md text-center text-white font-medium ${
//                 message.type === "success"
//                   ? "bg-green-500"
//                   : "bg-red-500"
//               }`}
//             >
//               {message.text}
//             </div>
//           )}

//           {/* Buttons */}
//           <div className="flex justify-end gap-3 mt-4">
//             <button
//               type="button"
//               onClick={() => setSubWork(0)}
//               className="px-4 py-2 rounded-md border border-[#EBCB90] bg-white text-[#5a4a3f] 
//                 hover:bg-[#f7f0e6] transition-all duration-300"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 rounded-md bg-[#2eeaff] text-[#004f58] font-semibold
//                 hover:bg-[#22bfd0] transition-all duration-300 disabled:opacity-60"
//             >
//               {loading ? "Applying Changes..." : "Update Task"}
//             </button>
//           </div>
//           </fieldset>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default React.memo(EditTask);
import React, { useState, useContext, useMemo, useCallback } from "react";
import axios from "axios";
import { DataContext } from "../contexts/DataContext";
import { TaskContext } from "../contexts/TaskContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// 🧩 SubTaskEditor Component — memoized & animated
const SubTaskEditor = React.memo(({ sub, onChange, onRemove, disableRemove }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.3 }}
    className="flex gap-3 items-center bg-gradient-to-r from-[#f0f4f8] to-[#e2ebf0] border border-[#c4d7e0] rounded-lg p-2 shadow hover:shadow-lg transition-all duration-300"
  >
    <input
      type="text"
      value={sub.title}
      onChange={(e) => onChange("title", e.target.value)}
      placeholder="Subtask title"
      className="flex-1 p-2 border-2 border-[#c4d7e0] rounded-md bg-white focus:bg-[#e6f2ff] outline-none transition-all duration-300"
    />
    <input
      type="text"
      value={sub.description}
      onChange={(e) => onChange("description", e.target.value)}
      placeholder="Subtask description"
      className="flex-1 p-2 border-2 border-[#c4d7e0] rounded-md bg-white focus:bg-[#e6f2ff] outline-none transition-all duration-300"
    />
    {!disableRemove && (
      <button
        type="button"
        onClick={onRemove}
        className="text-red-500 font-bold px-3 text-lg hover:text-red-600 transition-colors duration-300"
      >
        ✕
      </button>
    )}
  </motion.div>
));

const EditTask = ({ setRefresh, setSubWork, todo, editIdx }) => {
  const { data } = useContext(DataContext);
  const { task, setTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const formatted = useMemo(() => {
    const date = new Date(todo.endTime);
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
    return date.toLocaleString("en-IN", options).split(",");
  }, [todo.endTime]);

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [listType, setListType] = useState(todo.listType);
  const [subTasks, setSubTasks] = useState(
    () => (todo.subTask ? todo.subTask.map((s) => ({ ...s })) : [])
  );

  const [endDate, setEndDate] = useState(() => {
    const arr = formatted[1].trim().split(" ");
    const yyyy = formatted[2].trim();
    const monthList = [
      "jan", "feb", "mar", "apr", "may", "jun",
      "jul", "aug", "sep", "oct", "nov", "dec",
    ];
    const dd = arr[0];
    const temp = monthList.findIndex((ele) => ele === arr[1].toLowerCase()) + 1;
    const mm = `${temp < 10 ? "0" : ""}${temp}`;
    return `${yyyy}-${mm}-${dd}`;
  });

  const [endTime, setEndTime] = useState(() => {
    const arr = formatted[3].trim().split(":");
    return `${arr[0]}:${arr[1]}`;
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubTaskChange = useCallback((idx, field, value) => {
    setSubTasks((prev) => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  }, []);

  const removeSubTask = useCallback((idx) => {
    setSubTasks((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const addSubTask = useCallback(() => {
    setSubTasks((prev) => {
      if (prev.length === 0 || prev[prev.length - 1].title.trim() !== "") {
        return [...prev, { title: "", description: "", done: { flag: false } }];
      }
      return prev;
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    let filteredSubtasks = [...subTasks];
    if (filteredSubtasks.at(-1)?.title.trim() === "") filteredSubtasks.pop();

    setLoading(true);
    try {
      const combinedEndTime = new Date(`${endDate}T${endTime}:00+05:30`);
      let taskData = {};

      if (title !== todo.title) taskData.title = title;
      if (description !== todo.description) taskData.description = description;
      if (listType.toLowerCase() !== todo.listType) taskData.listType = listType.toLowerCase();
      if (combinedEndTime.toISOString() !== new Date(todo.endTime).toISOString())
        taskData.endTime = combinedEndTime;
      if (JSON.stringify(filteredSubtasks) !== JSON.stringify(todo.subTask))
        taskData.subTask = filteredSubtasks;

      if (Object.keys(taskData).length > 0) {
        const res = await axios.patch(
          "/api/user/tasks/worklist",
          { updateBlock: taskData, taskId: todo._id },
          { withCredentials: true }
        );

        if (res.data.updated) {
          const newList = [...task];
          newList[editIdx] = structuredClone(res.data.task);
          setTask(newList);
          setMessage({ text: "Task updated successfully!", type: "success" });
          setRefresh(pre => !pre);
          setSubWork(0);
        }
      } else {
        setMessage({ text: "No changes detected.", type: "error" });
      }
    } catch (err) {
      setMessage({
        text: err.response?.data?.msg || "Failed to update task",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#f2f7fa] to-[#dbe9f7] w-full h-full min-h-[1000px] flex items-center justify-center p-4 pt-20 "
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-2xl w-full max-w-2xl rounded-2xl overflow-hidden border-2 border-[#00b4ff] p-6"
      >
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <fieldset className="border-4 border-[#d4d4d4] p-4 rounded-lg flex flex-col gap-4">
            <legend className="text-3xl px-4 font-bold border-2 border-[#00b4ff] rounded-md">
              Edit Task
            </legend>

            {/* Title */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                required
                className="p-2 border-2 border-[#c4d7e0] rounded-md bg-white focus:bg-[#e6f2ff] outline-none transition-all duration-300"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
                className="p-2 border-2 border-[#c4d7e0] rounded-md bg-white focus:bg-[#e6f2ff] outline-none transition-all duration-300 min-h-[80px]"
              />
            </div>

            {/* End Time */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold">End Time</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="flex-1 p-2 border-2 border-[#c4d7e0] rounded-md bg-white focus:bg-[#e6f2ff] outline-none transition-all duration-300"
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="flex-1 p-2 border-2 border-[#c4d7e0] rounded-md bg-white focus:bg-[#e6f2ff] outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* List Type */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold">List Type</label>
              <select
                value={listType}
                onChange={(e) => setListType(e.target.value)}
                className="p-2 border-2 border-[#c4d7e0] rounded-md bg-white focus:bg-[#e6f2ff] transition-all duration-300"
              >
                {data.worklist.map((ele, i) => (
                  <option value={ele} key={i}>
                    {ele.charAt(0).toUpperCase() + ele.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Subtasks */}
            <div className="flex flex-col gap-3">
              <label className="font-semibold">Subtasks</label>
              <AnimatePresence>
                {subTasks.map((sub, i) => (
                  <SubTaskEditor
                    key={i}
                    sub={sub}
                    onChange={(field, value) => handleSubTaskChange(i, field, value)}
                    onRemove={() => removeSubTask(i)}
                    disableRemove={subTasks.length === 1}
                  />
                ))}
              </AnimatePresence>
              <button
                type="button"
                onClick={addSubTask}
                className="text-[#0077cc] font-semibold mt-1 hover:underline self-start"
              >
                + Add Subtask
              </button>
            </div>

            {/* Message */}
            <AnimatePresence>
              {message.text && (
                <motion.div
                  key={message.text}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-md text-center text-white font-medium ${
                    message.type === "success"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {message.text}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setSubWork(0)}
                className="px-4 py-2 rounded-md border border-[#c4d7e0] bg-white text-[#5a4a3f] hover:bg-[#f0f4f8] transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-md bg-[#00b4ff] text-white font-semibold hover:bg-[#009ad6] transition-all duration-300 disabled:opacity-60"
              >
                {loading ? "Applying Changes..." : "Update Task"}
              </button>
            </div>
          </fieldset>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(EditTask);
