import {generateMessages} from "../generator";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

socket.io.on("error", (error) => {
  console.error('Client connection error: ', error)
})

setInterval(async () => {
  const messages = generateMessages();
  socket.emit("messages", messages);
}, 2000)



