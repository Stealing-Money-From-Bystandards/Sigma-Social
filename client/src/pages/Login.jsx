import React, {useState, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext';

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext)
    
    let navigate = useNavigate();
    
    const login = () => {
        const data = {username, password};
        axios.post('http://localhost:3001/users/login', data).then((response)=>{
            console.log(response.data);
            if(response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("username", response.data.username)
                setAuthState(true);
                navigate("/");
            }
        })
    }
    
    return (
        <div>
            <input 
            type = "text" 
            placeholder = "username"
            onChange = {(event) => { 
                setUsername(event.target.value)
                }}
            />
            <input type = "password" 
            placeholder = "password"
            onChange = {(event) => { 
                setPassword(event.target.value)
                }}
            />
            <button onClick = {login}>Login</button>
        </div>
    )
}