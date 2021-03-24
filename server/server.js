const express = require('express')
const app = express()
const socketIo = require('socket.io')
const PORT = process.env.PORT || 80

const expressServer =  app.listen(PORT,()=>{
    console.log("Server....  OK", PORT)
})

const io = socketIo(expressServer)
const onlineUsers = []
const message_history = []

io.on('connection',(socket)=>{

    console.log("new user connected")

    socket.on("disconnect",()=>{
        console.log("Socket.... Disconnected")
        const id = socket.id
        const item = onlineUsers.find((item)=>(item.id === id))

        const index = onlineUsers.indexOf(item)
        onlineUsers.splice(index,1)
        io.emit("update_user_list", onlineUsers)
        io.emit('online')

            //без проверки сервер падает
        if (item) {
            const userName = item.userName
            message_history.push({name:"system", type:"SYSTEM_EVENT_USER_DISCONNECTED", message: userName })
            io.emit("user_disconnected", userName)
        }

    })

    socket.on("get_messages_from_back", ()=>{
        io.emit("get_messages_from_back",message_history)
     /*   console.log(message_history)*/
    })

    socket.on("new_message_from_client", (data)=>{
        /*console.log(data)*/
        message_history.push(data)

        io.emit("new_message_from_server",data)
    })

    socket.on('new_user_connected',(data)=>{
        const id = socket.id
        onlineUsers.push({id: id,userName : data})
        io.emit("update_user_list", onlineUsers)
        message_history.push({name:"system", type:"SYSTEM_EVENT_USER_CONNECTED", message: data })
        io.emit("new_user_connected", data)
     /*   console.log(onlineUsers)*/
    })
})
