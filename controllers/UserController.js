const User = require("../models/userModel")
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require("jsonwebtoken")



//user registration
const register = async (req,res)=>{

    //desturcting data
    const {name,email,password} = req.body
    try{

        //checking for empty
        if(!name||!email||!password){
        return res.status(400).json({message:"invalid credentials"})
    }
    if(password.length < 4){
    return res.status(400).json({
        message:"Password must be at least 4 characters"
    })
}
    //checking duplicate email
    const duplicate = await User.findOne({email})
    if(duplicate){
         return res.status(409).json({message:"email is already registred "})
    }   
        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt)

        //saving the user
        const newUser = new User({name,email,password:hashpassword})
        await newUser.save()
        return res.status(201).json({message:"success"})
    
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"something  went wrong"})
    }
    
}



//user login
const login = async (req, res) => {
  try {
    //destructing data
    const { email, password } = req.body

    //finding user details
    const user = await User.findOne({ email })

    // if the user doesnt exists
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    //mathcing the passwords
    const match = await bcrypt.compare(password, user.password)

    // if password is wrong
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    //removing password from the user object we dont want the password on the front end
    const { password: _, ...safeUser } = user.toObject()

    //creating jwt token
    const token = jwt.sign(
    {
        id: user._id,
        name: user.name,
        admin: user.admin
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
)

        //storing jwt in cookie
       res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    })
    return res.status(200).json({ message: "Login successful", user: safeUser })

  } catch (error) {
    return res.status(500).json({ message: "Something  went wrong" })
  }
}


//user profile
const userProfile = async (req,res)=>{
    try{
        const {id} = req.user
        const safeUser =  await User.findById(id).select("-password")
        if(!safeUser){
           return res.status(400).json({message:"please login"})
        }
        return res.status(200).json({message:"user verified details",user:safeUser})

    }catch(error){
        console.log(error)
       return res.status(500).json({message:"something  went wrong"})
    }
}


//user logout
const logout = async (req,res)=>{
    try{
         res.clearCookie("token")
         return res.status(200).json({message:"logout succesfully"})
        
    }catch(error){
        return res.status(500).json({message:"something went wrong"})
    }
}

module.exports={
    register,
    login,
    userProfile,
    logout
}

