import React, { useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";

const NewTaskForm = ({ subWork,setSubWork, onTaskCreated }) => {
  const { data } = useContext(DataContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [listType, setListType] = useState("all");
  const [subTasks, setSubTasks] = useState([{ title: "", description: "" }]);
  const [endDate, setEndDate] = useState(()=>{
                    let currentDate=Date(),dd,mm,yyyy;
                    let monthList=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
                    let arr=currentDate.split(' ');
                    let temp=monthList.findIndex(ele=>ele===arr[1].toLowerCase())+1;
                    mm=`${(temp/10)?'':'0'}${temp}`;
                    dd=arr[2];
                    yyyy=arr[3];
                    return `${yyyy}-${dd}-${mm}`;
                  }); // YYYY-MM-DD
  const [endTime, setEndTime] = useState(()=>{
                    let arr=Date().split(' ');
                    arr=arr[4].split(':');
                    return `${arr[0]}:${arr[1]}`;
                  }); // HH:MM
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();
  // 🔹 Add Subtask
  const addSubTask = () => setSubTasks([...subTasks, { title: "", description: "" }]);
  // const subWork=props.subWork;
  // const setSubWork=props.setSubWork;
  const removeSubTask = (idx) => setSubTasks(subTasks.filter((_, i) => i !== idx));
  const handleSubTaskChange = (idx, field, value) => {

    const updated = [...subTasks];
    updated[idx][field] = value;
    setSubTasks(updated);
  };

  // 🔹 Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setMessage({ text: "", type: "" });
    let removeEmpty=subTasks;
    if(subTasks[subTasks.length-1].title.trim()===''){
      // alert('hello')
      // removeEmpty=subTasks;
      removeEmpty.pop();
      // console.log(removeEmpty)
      // return
    }
    setLoading(true);
    try {
      if (!endDate || !endTime) {
        setMessage({ text: "Please select End Date & Time", type: "error" });
        setLoading(false);
        return;
      }

      // Convert to Date()
      const combinedEndTime = new Date(`${endDate}T${endTime}:00+05:30`); 
      // appends IST offset (+05:30). If backend uses UTC, this is correct.

      const taskData = {
        createdById: data.userId,
        createdByName: data.userName,
        title,
        description,
        listType,
        subTask: removeEmpty,
        endTime: combinedEndTime,
      };

      const res = await axios.post("/api/user/tasks/worklist", taskData);
      console.log(res.data);
      setMessage({ text: "Task created successfully!", type: "success" });

      // Reset form
      setTitle("");
      setDescription("");
      setListType("all");
      setSubTasks([{ title: "", description: "" }]);
      setEndDate("");
      setEndTime("");

      if (onTaskCreated) onTaskCreated(res.data);
    } catch (err) {
      setMessage({ text: err.response?.data?.msg || "Failed to create task", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // function cancelHandler(e){
  //   e.preventDefault();
  //   setSubWork(0);
  //   // navigate('/user/tasks/worklist');
  // }

  return (
    <div className="bg-[#ececdb] w-full min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#ece3d9] shadow-2xl w-full max-w-2xl rounded-2xl overflow-hidden border-2 border-[#EBCB90] p-6">
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <fieldset className="border-4 border-[#d4d4d4] p-4 rounded-lg flex flex-col gap-4">
            <legend className="text-3xl px-4 font-bold border-2 border-[#EBCB90] rounded-md">
              New Task
            </legend>

            {/* Title */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                required
                className="p-2 border-2 border-[#EBCB90] rounded-sm bg-[#e4e4e4] 
                  focus:bg-[#f5f1f1] outline-none transition-all duration-500"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
                className="p-2 border-2 border-[#EBCB90] rounded-sm bg-[#e4e4e4] 
                  focus:bg-[#f5f1f1] outline-none transition-all duration-500"
              />
            </div>

            {/* End Date + Time */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold">End Time</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  // defaultValue={}
                  value={endDate}
                  onChange={(e) =>{setEndDate(e.target.value)}}
                  required
                  className="flex-1 p-2 border-2 border-[#EBCB90] rounded-sm bg-[#e4e4e4] 
                    focus:bg-[#f5f1f1] outline-none transition-all duration-500"
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) =>{console.log(e.target.value); setEndTime(e.target.value)}}
                  required
                  className="flex-1 p-2 border-2 border-[#EBCB90] rounded-sm bg-[#e4e4e4] 
                    focus:bg-[#f5f1f1] outline-none transition-all duration-500"
                />
              </div>
            </div>

            {/* List Type */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold">List Type</label>
              <select
                value={listType}
                onChange={(e) => setListType(e.target.value)}
                className="p-2 border-2 border-[#EBCB90] rounded-sm bg-[#e4e4e4] 
                  focus:bg-[#f5f1f1] transition-all duration-500"
              >
              {
                (data.worklist).map((ele,i)=>(
                  <option value={ele} key={i}>{ele}</option>
                ))
              }
                {/* <option value="all">All</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option> */}
              </select>
            </div>

            {/* Subtasks */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Subtasks</label>
              {subTasks.map((sub, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={sub.title}
                    onChange={(e) => handleSubTaskChange(idx, "title", e.target.value)}
                    placeholder="Subtask title"
                    className="flex-1 p-2 border-2 border-[#EBCB90] rounded-sm bg-[#e4e4e4] 
                      focus:bg-[#f5f1f1] outline-none transition-all duration-500"
                  />
                  <input
                    type="text"
                    value={sub.description}
                    onChange={(e) => handleSubTaskChange(idx, "description", e.target.value)}
                    placeholder="Subtask description"
                    className="flex-1 p-2 border-2 border-[#EBCB90] rounded-sm bg-[#e4e4e4] 
                      focus:bg-[#f5f1f1] outline-none transition-all duration-500"
                  />
                  {subTasks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSubTask(idx)}
                      className="text-red-500 font-bold px-2"
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={()=>{
                  if(subTasks[subTasks.length-1].title!=="")
                    setSubTasks([...subTasks,{title:"",description:""}]);
                }}
                className="text-blue-500 font-semibold mt-2"
              >
                + Add Subtask
              </button>
            </div>

            {/* Messages */}
            {message.text && (
              <div
                className={`p-2 rounded ${
                  message.type === "success" ? "bg-green-300" : "bg-red-300"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-between gap-2 mt-2">
              <button
                
                onClick={(e)=>setSubWork(0)}
              >
                Cancel {subWork}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#2eeaff] text-white px-4 py-2 rounded-md 
                  hover:bg-[#28bfd0] transition-all duration-500"
              >
                {loading ? "Creating..." : "Create Task"}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default NewTaskForm;
