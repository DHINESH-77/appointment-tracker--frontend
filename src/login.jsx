import React,{useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import { loginuser, clearError } from "./rtk/loginSlice"
import { useNavigate } from "react-router-dom"

function Login(){
    const [email,setmail]=useState("")
    const [password,setpass]=useState("")
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const {status, error, isAuthenticated} = useSelector(state => state.login)

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && password) {
            dispatch(loginuser({email,password}))
        }
    }

    const handleClearError = () => {
        dispatch(clearError())
    }

return(
    <div>
        <h1>Login</h1>
        
        {error && (
            <div onClick={handleClearError}>
                {error} (Click to dismiss)
            </div>
        )}
        
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email}
                    required 
                    onChange={(e)=>setmail(e.target.value)}
                />
            </div>
            
            <div>
                <label>Password:</label>
                <input  
                    type="password" 
                    value={password}
                    required 
                    onChange={(e)=>setpass(e.target.value)}
                />
            </div>
            
            <button 
                type="submit" 
                disabled={status === "loading"}
            >
                {status === "loading" ? "Logging in..." : "Login"}
            </button>
        </form>
        
        <p>
            Demo credentials: sample@gmail.com / 123
        </p>
    </div>
)

}
export default Login;