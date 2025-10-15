import React, { createContext, useState } from 'react'

export const TaskContext = createContext()
export const TaskProvider = (props) => {
  const [task,setTask]=useState([]);
  return (
    <TaskContext.Provider value={{task,setTask}}>
      {props.children}  
    </TaskContext.Provider>
  )
}


