import React, { useContext, useEffect } from 'react'
import { DataContext } from '../contexts/DataContext'
import { useNavigate } from 'react-router-dom'
import { LoadingContext } from '../contexts/LoadingContext'

const Dashboard = () => {
    const {data,setData} = useContext(DataContext)
    const {loading}=useContext(LoadingContext)
    
  return (
    <div className='w-full h-full flex items-center justify-center'>
      Work under progress.......
    </div>
  )
}

export default Dashboard
