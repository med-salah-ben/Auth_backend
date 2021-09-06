const express = require('express');
const connectDB = require("./config/connectDB")
const app = express();
const authRouter = require('./routes/Auth')
connectDB()

//middleware
app.use(express.json())
//use Routes
app.use("/api/auth",authRouter)

const PORT = process.env.PORT || 6000;

app.listen(PORT,(err)=>{
    err ? console.log(err)
    :console.log(`server is running on port ${PORT}`)
})