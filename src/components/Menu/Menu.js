import React from 'react'
import './style.scss'
import {Link} from "react-router-dom"
import UserNameContext from "../../utils/UserNameContext";
import {socket} from "../../utils/socket";
const Menu = () =>{
    const setUserName = React.useContext(UserNameContext)
    return <div className="menu">
        <div className="container">
            <div className="logo"><Link to="#">LOGO</Link></div>
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
