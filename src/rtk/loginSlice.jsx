import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"
export const loginuser=createAsyncThunk(
    "login/uselogin",async(payload)=>{
      const res=  await axios.post("https://appointment-tracker-backend-3.onrender.com/login",payload,{withCredentials:true})
       return res.data;
    }
)
const loginSlice=createSlice({
    name:"login",
    initialState:{user:null,isAuthenticated:false,status:"idle",error:null},
    reducers:{
        logout:(state)=>{
            state.user=null;
            state.isAuthenticated=false;
            state.status="idle";
        },
        clearError:(state)=>{
            state.error=null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginuser.pending,(state)=>{
            state.status="loading"
            state.error=null
        })
        builder.addCase(loginuser.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.user=action.payload;
            state.isAuthenticated=true;
            state.error=null;
        })
        builder.addCase(loginuser.rejected,(state,action)=>{
            state.status="failed";
            state.error=action.error.message;
            state.isAuthenticated=false;
            state.user=null;
        })
    }

    
})

export const {logout, clearError} = loginSlice.actions;
export default loginSlice.reducer