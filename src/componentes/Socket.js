import io from 'socket.io-client';

let socket = io("//localhost:5000") // este seria la manera de contactar el socket con react

export default socket;