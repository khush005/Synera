const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const userRouter = require("./router/user")
const postRouter = require("./router/post")
const cors = require("cors");
const socket = require('socket.io');
dotenv.config();

mongoose.connect(process.env.MONGODB).then(()=>
console.log("DB connection successfull")).catch((e)=>{
    console.log(e)
})

app.use(cors());
app.use(express.json());
// Serve static files from the "Images" directory
// app.use(express.static('Images'));
app.use("/api/user", userRouter)
app.use("/api/post", postRouter)


const server = app.listen(5000, ()=>{
    console.log("Server is running");
})

const io = socket(server , {
    cors:{
        origin:'http://localhost:3000',
        credentials:true
    }
})

global.onlineUsers = new Map();
io.on("connection" , (socket)=>{
    global.chatsocket = socket;
    socket.on("addUser" , (id)=>{
        onlineUsers.set(id , socket.id);
    })

    socket.on("send-msg" , (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve" , data.message)
        }
    })
})
