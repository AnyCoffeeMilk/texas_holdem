import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:4000";
let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL);

    socket.on("connect", () => console.log(`${socket.id}: Connected.`));
    socket.on("disconnect", () => console.log(`${socket.id}: Disconnected.`));
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
