import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL);

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
