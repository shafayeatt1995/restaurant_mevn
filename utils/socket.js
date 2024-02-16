import io from "socket.io-client";

const socket = io(process.env.BASE_URL);
socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});
socket.on("connect_error", (error) => {
  console.error("Failed to connect to Socket.IO server:", error);
});

export default socket;
