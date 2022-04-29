// hash password
const bcrypt = require('bcryptjs')

// passing route excepion to error handler middleware
const asycnHandler = require('express-async-handler')
const generateToken = require('../helpers/generateToken')

// get User Schema
const User = require('../models/userModel')


// @desc Register new user
// @route POST /api/users
// @acess PUBLIC
const registerUser =  asycnHandler(async (req,res) => {
    const {name,email,password} = req.body
    if(!name || !email ||!password){
        res.status(400)
        throw new Error("Please complete all fields")
    }

    // check if user exists 
    const user =  await User.findOne({email})
    if(user){
        res.status(400)
        throw new Error("User exists")
    }

    //hash password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const createdUser = await User.create({
        name,
        email,
        password:hashedPassword,
    }) 

    if(createdUser){
        res.status(201).json({
            _id:createdUser._id,
            name:createdUser.name,
            email:createdUser.email,
            token : generateToken(createdUser._id)
        })
    } else {
        res.status(400)
        throw new Error("User not created")
    }

    
})

// @desc Authenticate a user
// @route POST /api/users/login
// @acess PUBLIC
const loginUser = asycnHandler(async (req,res) => {
    const {email, password}= req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token : generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Wrong credentials")
    }

    res.json({message:"login"})
  
}  )

// @desc Get actual user data
// @route GET /api/users/me
// @acess PRIVATE
const getMe = asycnHandler(async (req,res) => {

    res.status(200).json(req.user)
    
}
)
module.exports = {
    registerUser,
    loginUser,
    getMe
}