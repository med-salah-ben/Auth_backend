const jwt = require('jsonwebtoken')

const User =require('../models/User')

require("dotenv").config({path:"./config/.env"})

const isAuth = async(req,res,next)=>{
    try {
        const token = req.headers['x-auth-token']
        //check Token
        if(!token){
            return res.status(400).send({msg:'token unauthorized'})
        }
        const decoded = await jwt.verify(token,process.env.secretOrkey)
        const user = await User.findById(decoded.id)
        //check user
        if(!user){
            return res.status(400).send({msg:"unauthorized"})
        }
        //get User 
        req.user =user
        next()
    } catch (error) {
        return res.status(400).send({msg:'token not valid'})
    }
}

module.exports = isAuth
