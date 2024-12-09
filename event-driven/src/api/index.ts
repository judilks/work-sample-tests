import express, {Request, Response} from 'express';
import handler from "./handler";
import {generateFields} from "../generator"
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import {getAll} from "./service/db.ts";
import cors from 'cors'

const app = express()
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3001',
    }
});
const port = 3000

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3001',
}))

io.on('connection', (socket) => {
    console.log("New connection connected");
    socket.on('messages', (messages) => handler(messages, io))
})

app.get('/fields', (req, res) => {
    res.status(200).send(getAll());
})

server.listen(port, () => {
    generateFields();
    console.log(`Consumer listening on port ${port}`)
})
