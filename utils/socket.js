import io from "socket.io-client";

const socket = io(process.env.BASE_URL); // Update the URL with your server URL

export default socket;
