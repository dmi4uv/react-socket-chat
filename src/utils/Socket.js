import io from 'socket.io-client'
const socket = io('https://react-socket-server-dmi4uv.herokuapp.com/', {transports: ['websocket','io', 'polling', 'flashsocket']})
/*const socket = io('http://localhost', {transports: ['websocket','io', 'polling', 'flashsocket']})*/
export {socket}
