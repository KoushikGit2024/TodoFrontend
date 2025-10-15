import React, { useContext, useEffect } from 'react'
import { DataContext } from '../contexts/DataContext'
import { useNavigate } from 'react-router-dom'
import { LoadingContext } from '../contexts/LoadingContext'

const Dashboard = () => {
    const {data,setData} = useContext(DataContext)
    const {loading}=useContext(LoadingContext)
    // console.log(loading)
    const navigate = useNavigate();
    // useEffect(()=>{
    //     console.log(loading,data);
    //     if(loading)
    //         if(Object.keys(data).length===0)
    //         navigate('/user/login')
    // },[navigate,loading,data]);
  return (
    <div className=''>
      ffffffff
    </div>
  )
}

export default Dashboard
