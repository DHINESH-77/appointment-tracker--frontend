

import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./appointmentSlice.jsx";
import diaryReducer from "./diarySlice.jsx";
import loginReducer from "./loginSlice.jsx";

 const store=configureStore({
    reducer:{
    appointment:appointmentReducer,
    diary: diaryReducer,
    login: loginReducer
}})
export default store
