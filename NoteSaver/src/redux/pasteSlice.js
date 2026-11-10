import { createSlice } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast';

export const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
    pastes:localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    :[]
  },
  reducers: {
    addToPaste : (state,action) => { //data taken from user is in action payload
        const paste= action.payload;
        state.pastes.push(paste); //save in current redux state variable array which initiLLay have values from local storage or empty
        localStorage.setItem("pastes",JSON.stringify(state.pastes)); //save actually in local storage
        toast("Created Sucessfully!!")
    },
    updateToPaste : (state,action) => {
        const paste= action.payload;
        const index = state.pastes.findIndex((item)=>item._id===paste._id);

        if(index >= 0){
            state.pastes[index]=paste;
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            toast.success("Paste Updated"); //.sucess for green tick only

        }
    },
    resetAllPastes : (state,action) => {
        state.pastes=[];
        localStorage.removeItem("pastes");
    },
    removeFromPastes : (state,action) => {
        const pasteId=action.payload;
        const index = state.pastes.findIndex((item)=> item._id===pasteId);
        if(index>=0){
            state.pastes.splice(index,1);
            localStorage.setItem("pastes",JSON.stringify(state.pastes));  //dont confuse its like write mode of filehandling
            toast.success("Paste Deleted");
        }
    },
  }
})

export const { addToPaste, updateToPaste, resetAllPastes,removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer