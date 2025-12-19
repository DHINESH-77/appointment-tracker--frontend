import {createSlice} from "@reduxjs/toolkit"
import {createAsyncThunk }from "@reduxjs/toolkit"
import axios from "axios"

export const postapp=createAsyncThunk(
   "appointment/addappointment",async(payload)=>{
      const res=await axios.post("http://localhost:5000/app",payload);
      return res.data
   }
)
export const fetchapp=createAsyncThunk(
   "appointment/getappointment",
   async()=>{
      const res=await axios.get("http://localhost:5000/app");
      return res.data;
   }
)

export const deletebyid=createAsyncThunk(
   "appointment/deleteapointment",
   async(id)=>{
   await axios.delete(`http://localhost:5000/app/${id}`)
   return {id}
   }
)

const appointmentSlice=createSlice({
   name:"appointment",
   initialState:{appointment:[],status:"idle",error:null},
   reducers:{},
   extraReducers:(builder)=>{
       builder.addCase(postapp.pending,(state)=>{
         state.status="loading"
       })
       builder.addCase(postapp.fulfilled,(state,action)=>{
         state.status="fulfilled"
         state.appointment.push(action.payload)
       })
       builder.addCase(postapp.rejected,(state,action)=>{
           state.error=action.error.message
           state.status="failed"
           alert("failed")
       })



       //fetching the data 
       builder.addCase(fetchapp.pending,(state)=>{
           state.status="loading"
       })
       builder.addCase(fetchapp.fulfilled,(state,action)=>{
         state.appointment=action.payload
         state.status="succeded"
       })
       builder.addCase(fetchapp.rejected,(state,action)=>{
         state.error=action.error.message;
         alert("failed to fetch data")
       })


       //delete by id 
        builder.addCase(deletebyid.pending,(state)=>{
        state.status="loading";
       })
       builder.addCase(deletebyid.fulfilled,(state,action)=>{
         state.appointment=state.appointment.filter(ele=>ele._id!=action.payload.id)
       })
      builder.addCase(deletebyid.rejected,(state,action)=>{
        state.error=action.error.message;
        alert("failed")
      })
   }
})
export default appointmentSlice.reducer