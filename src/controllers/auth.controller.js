const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")


async function registerUserController(req,res){
 
    const {username,email,password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    const isUserAlreadyRegistered = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyRegistered){
        return res.status(400).json({message:"User already exists with this username or email address"})
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })
 
    const token = jwt.sign(
        {id:user._id, username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    
    res.cookie("token",token)

    res.status(201).json({

        message:"User registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        },
    })  


}


async function loginUserController(req,res){

    const {email,password} = req.body

    if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({message:"Invalid email or password"})
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password)

    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid email or password"})
    }

    const token = jwt.sign(
        {id:user._id, username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        },
    })  
}

async function logoutUserController(req,res){

}

module.exports = { registerUserController, loginUserController }    