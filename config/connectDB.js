const mongoose = require("mongoose")
require("dotenv").config({path:'./config/.env'})

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true , useUnifiedTopology:true})
        console.log('mongo DB connected')
    } catch (error) {
        console.log(`database failed to conneced ${error}`)
    }
}

module.exports= connectDB