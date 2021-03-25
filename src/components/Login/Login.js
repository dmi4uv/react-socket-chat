import React, {useState} from 'react'
import {useHistory } from 'react-router-dom'
import {socket} from "../../utils/Socket";
import './Login.scss'
import UserNameContext from "../../utils/UserNameContext";
const Login = () =>{
    const {setIsAuthenticated, setUserName} = React.useContext(UserNameContext)
    const history = useHistory()
    const [userName, setUsername] = useState("")
    const [loginClasses, setLoginClasses] = useState("login")

    const auth = () => {
        if (userName){
            setLoginClasses("login hidden")
            setTimeout(()=>{
                setUserName(userName)
                setIsAuthenticated(true)
                socket.emit("new_user_connected",userName)
                history.push('/chat')
                socket.emit("get_messages_from_back")
            }, 100)

        }
        else {
            alert("Введите имя")
        }
    }

    const sendButtonClick = () =>{
        auth()
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            auth()
        }
    }

    return <div className={loginClasses}>

        <div className="area">
            <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <div className="login_box">
            <h1>react socket.io chat</h1>
            <input required placeholder="Введите имя" value={userName} type="text" onKeyPress={handleKeyPress} onChange={(e)=>setUsername(e.target.value)} />
            <button className={userName?"button_visible":""} onClick={sendButtonClick}>Войти</button>
        </div>

    </div>
}
export default Login
