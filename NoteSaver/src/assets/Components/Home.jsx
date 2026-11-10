import React, { useEffect, useState } from 'react'
import './Home.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPaste, updateToPaste } from '../../redux/pasteSlice';

const Home = () => {
  const [title,setTitle]= useState('');  //has input enter by user in title field
  const [value,setValue]=useState(''); //has input entered by user in content field
  const [searchParams,setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state)=> state.paste.pastes);
  const dispatch = useDispatch();

    useEffect(() => {
      if(pasteId){
        // const paste = allPastes.find((p)=>p._id=== pasteId);
        const paste = allPastes.find((p) => {
            return p._id === pasteId;
        });
        setTitle(paste.title);
        setValue(paste.content);
      }
    }, [pasteId])
    
  function createPaste(){
    const paste = {
        title: title,
        content : value,
        _id: pasteId || 
             Date.now().toString(36),  //date.now Returns the current time in milliseconds since January 1, 1970. and (36) make it into base 36
        createdAt : new Date().toISOString(),
    }
    if(pasteId){
        //paste exists we want to update\
        dispatch(updateToPaste(paste));

    }else{
        //paste new
        dispatch(addToPaste(paste));

    }
    //after creation/updation do cleanups:
    setTitle('');
    setValue('');
    setSearchParams({});
    
  }

    return (
    <div>
        <div className='idk'>
            <input className='input-title'
            type='text'
            placeholder='Enter Title'
            value={title}  //store entered by user into state variable title so could access anywhere from store
            onChange={(e)=> setTitle(e.target.value)}
            />
            <button onClick={createPaste} className='btn'>
            {
                pasteId ? "Update my Paste"
                : "Create my Paste"
            }
            </button>
        </div>
        <div>
            <textarea 
                className='text-area'
                value={value}  //same logic as title 
                placeholder="Enter Content Here"
                onChange={(e)=>setValue(e.target.value)}
                rows={25}
            />
        </div>
    </div>
  )
}

export default Home
