const express = require('express')
const UserRoutes = express.Router()
const Usercontroller = require('../controllers/UserController')

//user routes
UserRoutes.post('/register',Usercontroller.register)
UserRoutes.post('/login',Usercontroller.login)






module.exports = UserRoutes