import { io } from 'socket.io-client';

// Connect to backend (your port is 5001)
const socket = io('http://localhost:5001');

export default socket;
