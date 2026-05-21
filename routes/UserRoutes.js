const express = require('express')
const UserRoutes = express.Router()
const Usercontroller = require('../controllers/UserController')


UserRoutes.post('/register',Usercontroller.register)









module.exports = UserRoutes