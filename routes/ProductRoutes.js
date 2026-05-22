const express = require('express')
const ProductRoutes = express.Router()
const ProductController = require("../controllers/ProductController");
const upload = require('../multer/multerConfig')
const {verifyUser,verifyAdmin} = require('../middilewares/auth')



//routes
ProductRoutes.get("/",verifyUser,ProductController.HomePage)
ProductRoutes.post("/add",verifyAdmin,upload.single('image'),ProductController.AddProducts)




module.exports = ProductRoutes;