import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { LoadingContext } from '../contexts/LoadingContext';
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const {data} = useContext(DataContext);
    const {loading,setLoading} = useContext(LoadingContext);
    const [fetched,fetchState]=useState(false);
    // console.log(loading)
    const navigate=useNavigate();
    useEffect(()=>{
      if(!data) return;

      if(Object.keys(data)?.length!==0){
        fetchState(true);
      }
      if(!loading&&Object.keys(data).length===0)
        navigate('/user/login');
    },[data,loading])
  return (
    <div className='w-full h-full flex items-center justify-center'>
      {(loading)&&(
        <div className=' bg-[green] flex flex-col items-center justify-center'>
            <img src="/Loader.gif" className='w-50 h-50'/>
            <p className='text-3xl mt-[-20px]'>Loading.....</p>
        </div>
        
      )}
      {(!loading)&&(fetched)&&(props.children)}
    </div>
  )
}

export default Protected;
