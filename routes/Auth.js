const Router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config({path:"../config/.env"})
const isAuth =require("../middleware/isAuth")


const {validator, registerRules , loginRules} =require('../middleware/validator')

Router.post("/register",registerRules(),validator,async(req,res)=>{
    const {name, lastName, email , password}= req.body
    try {
        //simple validation
        // if(!name || !lastName || !email || !password ){
        //     return res.status(400).json({msg:"please enter all fields"})
        // }
        //check if email exist
        let user = await User.findOne({email})
        if(user){
            return res.status(400).send({msg:"User already exist"})
        }
        //create new User
        user = new User({name,lastName,email,password})
        
        //create salt and hash with bcrypt
        const salt = 10 ;
        const hashedPassword = await bcrypt.hash(password,salt)
        user.password = hashedPassword

        //save User
        await user.save()
        
        //payload token
        const payload = {
            id: user._id
        }
        const token = await jwt.sign(payload,process.env.secretOrKey,{expiresIn:60 * 60})

        res.status(200).send({msg:"User register with success",user,token})

    } catch (error) {
        res.status(500).send({msg:"register server errors"})
    }
})

Router.post('/login',loginRules(),validator,async(req,res)=>{
    const {email,password}= req.body
    try {
             //simple validation
            //  if(!email || !password ){
            //     return res.status(400).json({msg:"please enter all fields"})
            // }
            //if not exist
            let user = await User.findOne({email})
            if(!user){
                return res.status(400).send({msg:"User does not exist"})
            }
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(400).send({msg:"Bad Credentials Password"})
            }
                    //payload token
            const payload = {
               id: user._id
            }
            const token = await jwt.sign(payload,process.env.secretOrKey,{expiresIn:60 * 60})
             res.status(200).send({msg:'logged with success',user,token})
    } catch (error) {
        res.status(500).send({msg:'login server errors'})
    }
})
Router.get("/user",isAuth,(req,res)=>{
    res.status(200).send({user:req.user})
})

module.exports = Router