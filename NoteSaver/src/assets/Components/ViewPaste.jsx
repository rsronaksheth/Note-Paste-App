import React, { useEffect, useState } from 'react'
import './Home.css'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPaste, updateToPaste } from '../../redux/pasteSlice';

const ViewPaste = () => {
    const {id} = useParams();
    const allPastes = useSelector((state)=>state.paste.pastes);
    const paste = allPastes.filter((p)=> p._id === id)[0]; //[0] as you want id of it

  return (
    <div>
        <div className='idk'>
            <input className='input-title'
            type='text'
            placeholder='Enter Title'
            value={paste.title}  //store entered by user into state variable title so could access anywhere from store
            disabled
            // onChange={(e)=> setTitle(e.target.value)}
            />
            {/* <button onClick={createPaste} className='btn'>
            {
                pasteId ? "Update my Paste"
                : "Create my Paste"
            }
            </button> */}
        </div>
        <div>
            <textarea 
                className='text-area'
                value={paste.content}  //same logic as title 
                placeholder="Enter Content Here"
                disabled
                // onChange={(e)=>setValue(e.target.value)}
                rows={25}
            />
        </div>
    </div>
  )
}

export default ViewPaste
