const User = require("../models/userModel")
const bcrypt = require('bcrypt')

const register = async (req,res)=>{
    const {name,email,password} = req.body
    try{
        if(!name||!email||!password){
        return res.status(400).json({message:"invalid credentials"})
    }
    const duplicate = await User.findOne({email})
    if(duplicate){
         return res.status(409).json({message:"email is already registred "})
    }
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt)
        const newUser = new User({name,email,password:hashpassword})
        await newUser.save()
        return res.status(201).json({message:"success"})
    
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"something went wrong"})
    }
    
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    //removing password from the user object we dont want the password on the front end
    const { password: _, ...safeUser } = user.toObject()

    return res.status(200).json({ message: "Login successful", user: safeUser })

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" })
  }
}

module.exports={
    register,
    login
}

