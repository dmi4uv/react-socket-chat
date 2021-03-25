import React, {useState,useEffect,Fragment} from 'react'
import './style.scss'
import {socket} from "../../utils/socket";
import UserNameContext from "../../utils/UserNameContext";
import Menu from "../Menu/Menu";

const Chat = () =>{
    const {userName} = React.useContext(UserNameContext)
    const [myMessage, setMyMessage] = useState("")
    const [userList, setUserList] = useState([])
    const [chatData,setChatData] = useState([{name: "Dmitry", message: 213}])
    const [chatClasses,setChatClasses] = useState("chat chat_hidden")

    useEffect(()=>{
        setTimeout(()=>{
            setChatClasses("chat")
        },200)
    },[])

    useEffect(()=>{
        socket.on("get_messages_from_back",(data)=>{
            setChatData(data)
        })
        socket.on("new_message_from_server",(data)=>{
            setChatData(prevState => [...prevState, data])
        })
        socket.on("update_user_list",(users)=>{
            setUserList(users)
        })
        socket.on("new_user_connected",(userName)=>{
            setChatData(prevState => [...prevState, {type:"SYSTEM_EVENT_USER_CONNECTED", message: userName}])
        })
        socket.on("user_disconnected",(userName)=>{
            setChatData(prevState => [...prevState, {type:"SYSTEM_EVENT_USER_DISCONNECTED", message: userName}])
        })
    },[setChatData,setUserList])

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage()
        }
        return

    }

    const handleInputChange = (e) => {
        setMyMessage(e.target.value)
    }

    const sendMessage = () => {
        let data = {name: userName, message: myMessage}
        socket.emit("new_message_from_client",data)
        setMyMessage("")
    }

    return (
            <div className={chatClasses}>
                <Menu/>
                <div className="chat_container">
                    <div className="users">
                        <ul>
                            {userList.map(({userName}, index)=>{
                                return <li key={index}>{userName}</li>
                            })}
                        </ul>
                    </div>
                    <div className="chat_form">
                        <div className="messages">
                            {chatData.map((item,index)=>{
                                if (item.type==="SYSTEM_EVENT_USER_CONNECTED"){
                                    return  (
                                        <div className="message_system">
                                            Пользователь   <span>{item.message}</span> вошел в чат.
                                        </div>
                                    )
                                } else if (item.type==="SYSTEM_EVENT_USER_DISCONNECTED"){
                                    return  (
                                        <div className="message_system">
                                            Пользователь   <span>{item.message}</span> вышел из чата.
                                        </div>
                                    )
                                } else {
                                    return (<div className={item.name===userName?"message message_my":"message"}>
                                        <span>{item.name===userName?"Вы":item.name}</span>
                                        <p  key={index}> {item.message}</p>
                                    </div>)
                                }

                            })}
                        </div>
                        <div className="message_bar">
                            <input placeholder="Введите сообщение" value={myMessage} type="text"  onKeyPress={handleKeyPress} onChange={handleInputChange}/>
                            <button onClick={myMessage?sendMessage:null}>Отправить</button>
                        </div>
                    </div>
                </div>
            </div>
        )



}

export default Chat
