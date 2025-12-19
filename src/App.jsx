import React from "react";
import Appointment from './appointments.jsx'
import './App.css'
import './styles.css'
import View from "./viewappointments.jsx"
import Diary from "./diary.jsx"
import ViewDiary from "./viewdiary.jsx"
import Login from "./login.jsx"
import {Link,Routes,Route} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {logout} from "./rtk/loginSlice.jsx"

function App() {
  const {isAuthenticated, user} = useSelector(state => state.login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <>
      <div className="nav-container">
        <Link to="/" className="nav-link">Add Appointment</Link>
        <Link to="/view" className="nav-link">View Appointments</Link>
        <Link to="/diary" className="nav-link">Write Diary</Link>
        <Link to="/viewdiary" className="nav-link">View Diary</Link>
        <button className="nav-link" onClick={handleLogout} style={{background: "#ff6b6b"}}>Logout ({user?.email})</button>
      </div>
      
      <Routes>
        <Route path="/" element={<Appointment/>}/>
        <Route path="/view" element={<View/>}/>
        <Route path="/diary" element={<Diary/>}/>
        <Route path="/viewdiary" element={<ViewDiary/>}/>
      </Routes>
    </>
  )
}

export default App
