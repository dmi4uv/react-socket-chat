import React from 'react'
import './Menu.scss'
import {Link} from "react-router-dom"
import UserNameContext from "../../utils/UserNameContext";
import {socket} from "../../utils/Socket";
const Menu = () =>{
    const setUserName = React.useContext(UserNameContext)
    return <div className="menu">
        <div className="container">
            <div className="logo"><Link to="#">React socket.io chat</Link></div>
            <nav>
                <Link to="
                #">Settings</Link>

                <a href="#" onClick={()=>{
                   /* setUserName(null)
                    socket.disconnect()*/
                }}>Logout</a>
            </nav>
        </div>
    </div>
}

export default Menu
