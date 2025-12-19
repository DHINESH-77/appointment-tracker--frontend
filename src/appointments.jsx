import { useDispatch } from "react-redux";
import {useState} from "react"
import {useSelector} from "react-redux"
import {postapp} from "./rtk/appointmentSlice.jsx"
function Appointment(){
    const dispatch=useDispatch();
    

    const [appointment,setappointment]=useState("");
    const [description,setdescription]=useState("")
    const [datetime,setdt]=useState("");

    let status=useSelector(state=>state.appointment.status)
    //current appointments
   let currentapp=useSelector(state=>state.appointment.appointment)
    //appointment 
    const handleappointment=(e)=>{
      setappointment(e.target.value)
    }
    //description
    const handledescription=(e)=>{
     setdescription(e.target.value)
    }
    //dt
    const handledt=(e)=>{
     setdt(e.target.value);
    }
    
    const handlesubmit=(e)=>{
     e.preventDefault();
     dispatch(postapp({appointment,description,datetime}))

     setappointment("")
     setdescription("")
     setdt("")
    }
   
    return(
    <div className="container">
        <h1>Add Appointment</h1>
       
        <form onSubmit={handlesubmit}>
            <div className="form-group">
                <label className="form-label">Appointment:</label>
                <input className="form-input" type="text" value={appointment} onChange={handleappointment} required/>
            </div>
            
            <div className="form-group">
                <label className="form-label">Description:</label>
                <input className="form-input" type="text" value={description} onChange={handledescription} required/>
            </div>
            
            <div className="form-group">
                <label className="form-label">Date & Time:</label>
                <input className="form-input" type="datetime-local" value={datetime} onChange={handledt} required/>
            </div>
            
            <button className="btn btn-primary" type="submit" disabled={status==="loading"}>
                {status==="loading"?"Saving...":"Add Appointment"}
            </button>
        </form>
    </div>)
}
export default Appointment