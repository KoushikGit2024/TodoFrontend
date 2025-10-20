// import axios from "axios";
// import React, { useContext, useState } from "react";
// import { TaskContext } from "../contexts/TaskContext";

// const TaskCard = ({todo,setRefresh,worklist,setSubWork,setEditIdx,idx }) => {
//   const {task,setTask} =useContext(TaskContext);
//   const [title, setTitle] = useState(todo.title);
//   const [description, setDescription] = useState(todo.description);
//   const [listType,setListType]=useState(todo.listType)
//   const [subTask, setSubTask] = useState(todo.subTask || []);
//   const [subFlag,setSubFlag]=useState({});
//   const [expand, setExpand] = useState(false);
//   const [changes, makeChanges] = useState(false);
//   const [scale,setScale]=useState(false);

//   const [update,setUpdate]=useState({});
//   // console.log(todo.done.flag)
//   const isoString =todo.createdAt;
//   const date = new Date(isoString);
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

//   function handleSubTaskFlag() {
//     if (changes) {
//       console.log("Save changes here...");
//       makeChanges(false);
//     }
//   }
//   // console.log(!description)
//   const [popUp,setPopUp]=useState(false);
//   // function showPopup(){
//   async function deleteTask(){
//     setPopUp(false);
//     let delItem = await axios.delete(`/api/user/tasks/worklist?taskId=${todo._id}`, {
//       withCredentials: true
//     });
//     if(delItem.data.code===200){
//       let newList = (task).filter((e)=>(e._id!==todo._id))
//       console.log(delItem.data)
//       // alert('Task Deleted');
//       setTask(newList);
//     }
//   }
//   // }
//   return (
//     <div className="relative bg-white shadow-lg rounded-xl border-[#edcb34] border-[3px] p-4 mb-4 transition hover:shadow-x"
//       style={{opacity:(todo.done.flag)?0.5:1}}
//     >
//       {/* Title + Description */}
//       <div className="w-full">
//         <h1 className="text-lg font-semibold text-gray-800">
//           Title:{" "}
//             {title}
//           {/* </input> */}
//         </h1>

//         <p className="text-gray-600 mt-2">
//           <span className="font-medium mr-1">Description: </span>
//           {(description)?description:'________________________'}
//         </p>
//         <p>
//           WorkList : 
//           {
//             (todo.listType) ? ( todo.listType[0].toUpperCase() +todo.listType.slice(1).toLowerCase() ): ""
//           }
//         </p>
//       </div>

//       {/* Action Buttons */}
//       <div className="absolute top-3 right-3 flex gap-3">
//         {/* Save/Edit */}
//         <button
//           className="p-1 rounded hover:bg-gray-100"
//           onClick={async ()=>{
//               // setExpand(true);
//               if(changes){
//                 let res =await axios.patch(
//                   "/api/user/tasks/worklist",
//                   { updateBlock: subFlag, taskId: todo._id },
//                   { withCredentials: true }
//                 )
//                 console.log(res.data.task)
//                 let newList;
//                 // console.log(res.data.task.done)
//                 if(res.data.task.done.flag!=todo.done.flag){
//                   newList = [...task]
//                   newList.splice(idx,1);
//                   console.log(newList)
//                 } else{
//                   newList=[...task];
//                   newList[idx] = structuredClone(res.data.task);  
//                   console.log('hi')
//                 }
//                 console.log(idx)
//                 setTask(newList);
//                 makeChanges(false);
//                 setRefresh(pre=>!pre)
//               } else {
//                 setEditIdx(idx);
//                 setSubWork(2);  
//               }
              
//             }}
//           title={changes ? "Save" : "Edit"}
//         >
//           {changes ? "💾" : "✏️"}
//         </button>

//         {/* Delete */}
//         <button
//           className="p-1 rounded hover:bg-red-100 text-red-500"
//           title="Delete"
//           onClick={()=>{setPopUp(pre=>!pre); console.log(todo)}}
//         >
//           🗑️
//         </button>
//         {
//           popUp &&(
//           <div className="fixed left-0 top-0 z-[15] bg-green-600 w-full h-full flex items-center justify-center">
//             <div className="h-50 w-100 bg-[red] flex flex-col items-center justify-between">
//               <div className=" flex items-center justify-center h-[70%]">
//                 Do you really want to delete it?
//               </div>
//               <div className="bg-yellow-300 h-[30%] w-full flex px-10 items-center justify-between">
//                 <button
//                   onClick={deleteTask}
//                 >
//                   Yes
//                 </button>
//                 <button
//                   onClick={()=>setPopUp(pre=>!pre)}
//                 >
//                   No
//                 </button>
//               </div>  
//             </div>
//           </div>
//           )
//         }
        
//         {/* Flag */}
//         <button
//           className={`p-1 rounded ${
//           "text-gray-400"
//           }`}
//           title="Mark as done"
//           onClick={async ()=>{
//             // console.log(task)
//             let done={
//               done:{
//                 flag:!todo.done.flag,
//                 finishTime: (!todo.done.flag)?(new Date()):null,
//               }
//             }
//             let abcd=await axios.patch('/api/user/tasks/worklist',
//               {updateBlock:done,taskId:todo._id},
//               {withCredentials:true},
//             )
//             if(abcd.data?.task.done.flag!=todo.done.flag){
//               let newList=[...task]
//               newList.splice(idx,1)
//               // newList[idx]=abcd.data.task
//               setTask(newList)
//               // console.log(abcd.data.task.done)  
//               setRefresh(pre=>!pre)
//             }
            
//           }}
//         >
//           {
//             (todo.done.flag)?
//             <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-flag-fill" fill="currentColor" height="24" viewBox="0 0 16 16" width="24">
//               <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
//             </svg>
//             :<svg className="bi bi-flag" fill="currentColor" height="24" viewBox="0 0 16 16" width="24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/>
//             </svg>
//           }         
//         </button>
//       </div>

//       {/* Expand Subtasks */}
//       <div className="w-full flex items-center justify-between">
//         <div
//           className="mt-4 cursor-pointer text-blue-600 hover:underline"
//           onClick={() => setExpand((prev) => !prev)}
//         >
//           {expand ? "Hide Subtasks ▲" : "Show Subtasks ▼"}
//         </div>
//       </div>
      

//       {/* Subtasks */}
//       {expand && (
//         <div className="mt-3 space-y-2 pl-3">
//           {subTask.map((item, idx) => (
//             <div
//               key={idx}
//               className="flex items-start justify-between bg-gray-50 p-2 rounded-md"
//             >
//               <div className="flex items-start ">
//                 <input
//                   type="checkbox"
//                   className="mr-2 mt-1 self-center"
//                   defaultChecked={item?.done?.flag}
//                   value={item?.done.flag}
//                   onChange={(e) =>{
//                       if(e.target.checked!=item.done.flag){
//                         let temp={
//                           [`subTask.${idx}.done`]:{
//                             flag:!item.done.flag,
//                             finishTime: (item.done.flag)?null:new Date(),
//                           }
//                         };
//                         setSubFlag({...subFlag,...temp})

//                         makeChanges(true);
//                       } else {
//                         let {[`subTask.${idx}.done`]:value,...rest}=subFlag;
//                         setSubFlag(rest);
//                         if(JSON.stringify(rest)===JSON.stringify({}))
//                           makeChanges(false)
//                       }
//                     } 
//                   }
//                 />
//                 <p className="text-gray-700 bg-pink-400 w-full"
                  
//                 >
//                   {item.title}
//                   {(item.description)?'=>':''}
                  
//                   {item.description}
//                 </p>
//               </div>
//               {/* <div className="flex gap-2">
//                 <button className="text-blue-500 hover:text-blue-700">✏️</button>
//                 <button className="text-red-500 hover:text-red-700" 
//                   onClick={(e)=>{
//                     let newArr=subTask.filter((_,i)=>i!==idx)
//                     setSubTask(newArr);
//                   }}
//                 >❌</button>
//               </div> */}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Footer */}
//       <div className="mt-4 flex justify-between text-sm text-gray-500 border-t pt-2">
//         <span>Created On: {formatted[0] + ", " + formatted[1]}</span>
//         <span>At: {formatted[3]}</span>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;
import axios from "axios";
import React, { useContext, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { motion, AnimatePresence } from "framer-motion";

const TaskCard = ({ todo, setRefresh, worklist, setSubWork, setEditIdx, idx }) => {
  const { task, setTask } = useContext(TaskContext);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [listType, setListType] = useState(todo.listType);
  const [subTask, setSubTask] = useState(todo.subTask || []);
  const [subFlag, setSubFlag] = useState({});
  const [expand, setExpand] = useState(false);
  const [changes, makeChanges] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const isoString = todo.createdAt;
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

  async function deleteTask() {
    setPopUp(false);
    let delItem = await axios.delete(`/api/user/tasks/worklist?taskId=${todo._id}`, {
      withCredentials: true,
    });
    if (delItem.data.code === 200) {
      let newList = task.filter((e) => e._id !== todo._id);
      setTask(newList);
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`relative bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl border-[2.5px] border-[#EBCB90] p-4 mb-4 transition-all cursor-pointer ${
        todo.done.flag ? "opacity-60" : "opacity-100"
      }`}
    >
      {/* Title & Description */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <p className="text-gray-600 mt-2">
          <span className="font-medium mr-1">Description:</span>
          {description || "________________________"}
        </p>
        <p className="text-gray-500 mt-1">
          Worklist:{" "}
          <span className="font-medium text-gray-700">
            {listType ? listType[0].toUpperCase() + listType.slice(1).toLowerCase() : ""}
          </span>
        </p>
      </div>

      {/* Buttons */}
      <div className="absolute top-3 right-3 flex gap-2">
        {/* Edit / Save */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="p-2 rounded-md hover:bg-gray-100"
          title={changes ? "Save" : "Edit"}
          onClick={async () => {
            if (changes) {
              let res = await axios.patch(
                "/api/user/tasks/worklist",
                { updateBlock: subFlag, taskId: todo._id },
                { withCredentials: true }
              );
              let newList;
              if (res.data.task.done.flag !== todo.done.flag) {
                newList = [...task];
                newList.splice(idx, 1);
              } else {
                newList = [...task];
                newList[idx] = structuredClone(res.data.task);
              }
              setTask(newList);
              makeChanges(false);
              setRefresh((pre) => !pre);
            } else {
              setEditIdx(idx);
              setSubWork(2);
            }
          }}
        >
          {changes ? "💾" : "✏️"}
        </motion.button>

        {/* Delete */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="p-2 rounded-md text-red-500 hover:bg-red-100"
          onClick={() => setPopUp(true)}
        >
          🗑️
        </motion.button>

        {/* Flag */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={async () => {
            let done = {
              done: {
                flag: !todo.done.flag,
                finishTime: !todo.done.flag ? new Date() : null,
              },
            };
            let res = await axios.patch(
              "/api/user/tasks/worklist",
              { updateBlock: done, taskId: todo._id },
              { withCredentials: true }
            );
            if (res.data?.task.done.flag !== todo.done.flag) {
              let newList = [...task];
              newList.splice(idx, 1);
              setTask(newList);
              setRefresh((pre) => !pre);
            }
          }}
        >
          {todo.done.flag ? "🏁" : "🚩"}
        </motion.button>
      </div>

      {/* Expand Button */}
      <div className="mt-4">
        <motion.p
          whileHover={{ scale: 1.05 }}
          className="text-blue-600 font-medium cursor-pointer"
          onClick={() => setExpand((prev) => !prev)}
        >
          {expand ? "Hide Subtasks ▲" : "Show Subtasks ▼"}
        </motion.p>
      </div>

      {/* Subtasks */}
      <AnimatePresence>
        {expand && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-3 space-y-2 pl-3"
          >
            {subTask.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start justify-between bg-[#f9fafb] p-2 rounded-md border border-[#EBCB90]/40"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={item?.done?.flag}
                    className="mr-2 accent-[#3396D3]"
                    onChange={(e) => {
                      if (e.target.checked !== item.done.flag) {
                        let temp = {
                          [`subTask.${i}.done`]: {
                            flag: !item.done.flag,
                            finishTime: item.done.flag ? null : new Date(),
                          },
                        };
                        setSubFlag({ ...subFlag, ...temp });
                        makeChanges(true);
                      } else {
                        let { [`subTask.${i}.done`]: _, ...rest } = subFlag;
                        setSubFlag(rest);
                        if (JSON.stringify(rest) === "{}") makeChanges(false);
                      }
                    }}
                  />
                  <p className="text-gray-700">
                    {item.title}
                    {item.description ? ` → ${item.description}` : ""}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="mt-4 flex flex-wrap justify-between text-xs text-gray-500 border-t pt-2">
        <span>Created: {formatted[0] + ", " + formatted[1]}</span>
        <span>At: {formatted[3]}</span>
      </div>

      {/* Delete Popup */}
      <AnimatePresence>
        {popUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-[50]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-4 w-[90%] max-w-sm"
            >
              <p className="text-gray-800 text-center font-medium">
                Do you really want to delete this task?
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={deleteTask}
                  className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Yes
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPopUp(false)}
                  className="px-5 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  No
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskCard;
