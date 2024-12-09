import {generateMessages} from "../generator";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

setInterval(async () => {
  const messages = generateMessages();
  socket.emit("messages", messages);
}, 2000)



