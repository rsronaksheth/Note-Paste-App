import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Paste.css'
import { removeFromPastes } from '../../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {
    const pastes= useSelector((state)=>state.paste.pastes);
    const [searchTerm,setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const [shareURL,setShareURL] = useState('');
    const filteredData = pastes.filter(
        (pastes)=> pastes.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId){
        dispatch(removeFromPastes(pasteId));
    }

  return (
    <div>
      <input 
        className='search-bar'
        type='search'
        placeholder='Search Here'
        value={searchTerm}
        onChange={(e)=> setSearchTerm(e.target.value)}
      />
      <div className="search-result">
        {
            filteredData.length> 0 &&
            filteredData.map(
                (pastes)=>{
                    return(
                        <div className='search-card'>
                                <div >
                                    {pastes.title}
                                </div>
                                    <div className='btns'>
                                    <button>
                                        <Link to={`/pastes/${pastes._id}`}>View</Link>
                                    </button>
                                    <button>
                                        <Link to={`/?pasteId=${pastes._id}`}>
                                            Edit
                                        </Link>
                                    </button>
                                    <button onClick={()=>handleDelete(pastes._id)}>Delete</button>
                                    <button 
                                    onClick={() => 
                                        {   navigator.clipboard.writeText(pastes.content)
                                            toast.success("Copied to Clipboard");
                                        }}
                                    >Copy</button>
                                    {/* <button

                                    >Share</button> */}
                                </div>
                                <div>
                                    {pastes.createdAt}
                                </div>
                        </div>  
                    )
                }
            )
        }
      </div>
    </div>
  )
}

export default Paste