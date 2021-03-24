import React, {useState} from 'react'
import {useHistory } from 'react-router-dom'
import {socket} from "../../utils/socket";
import './Login.scss'
import UserNameContext from "../../utils/UserNameContext";
const Login = () =>{
    const {setIsAuthenticated, setUserName} = React.useContext(UserNameContext)
    const history = useHistory()
    const [userName, setUsername] = useState("default")
    const sendButtonClick = () =>{
        setUserName(userName)
        setIsAuthenticated(true)
        socket.emit("new_user_connected",userName)
        history.push('/chat')
        socket.emit("get_messages_from_back")
    }
    return <div className="login">
        <div className="login_box">
            <input value={userName} type="text" onChange={(e)=>setUsername(e.target.value)} />
            <button onClick={sendButtonClick}>Go</button>
        </div>

    </div>
}
export default Login
