const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const userRouter = require("./router/user")
const postRouter = require("./router/post")
const cors = require("cors");
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

app.listen(5000, ()=>{
    console.log("Server is running");
})