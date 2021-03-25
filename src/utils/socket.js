import io from 'socket.io-client'
const socket = io('http://localhost', {transports: ['websocket','io', 'polling', 'flashsocket']})
export {socket}
