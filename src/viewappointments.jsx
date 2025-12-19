
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {useDispatch} from "react-redux";
import { fetchapp } from "./rtk/appointmentSlice";
import { deletebyid } from "./rtk/appointmentSlice";
function View(){
   
    const [appfilter,setfilter]=useState("")
    const dispatch=useDispatch();
    // const currapp=useSelector(state=>state.appointment.appointment)
    
    useEffect(()=>{
        dispatch(fetchapp())
    },[])
    
    //filter the appointments
    const handlefilter=(e)=>{
          setfilter(e.target.value)
    }
  const currapp = useSelector(state => state.appointment.appointment) || [];

let target = currapp
  .filter(ele => ele.datetime && ele.datetime.split("T")[0] === appfilter);

return(
    <div className="container">
        <h1>Current Appointments</h1>
        
        <div className="filter-section">
            <h3>Filter by Date</h3>
            <div className="filter-row">
                <div className="filter-group">
                    <label className="form-label">Select Date:</label>
                    <input className="form-input" type="date" onChange={handlefilter}/>
                </div>
            </div>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Appointment</th>
              <th>Description</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              (appfilter ? target : currapp).map((ele,i)=>(
                  <tr key={i}>
                      <td>{ele.appointment}</td>
                      <td>{ele.description}</td>
                      <td>{new Date(ele.datetime).toLocaleString()}</td>
                      <td><input type="checkbox"/></td>
                      <td><button className="btn btn-danger" onClick={()=>dispatch(deletebyid(ele._id))}>Delete</button></td>
                  </tr>
              ))
            }
          </tbody>
        </table>
    </div>
)
}
export default View;