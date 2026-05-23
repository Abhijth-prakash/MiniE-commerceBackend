const express = require('express')
const UserRoutes = express.Router()
const Usercontroller = require('../controllers/UserController')
const {verifyUser,verifyAdmin} = require('../middilewares/auth')

//user routes
UserRoutes.post('/register',Usercontroller.register)
UserRoutes.post('/login',Usercontroller.login)
UserRoutes.post('/logout',verifyUser,Usercontroller.logout)
UserRoutes.get('/profile',verifyUser,Usercontroller.userProfile)







module.exports = UserRoutes