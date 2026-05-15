const express = require('express')
const ProductRoutes = express()
const ProductController = require("../controllers/ProductController");
const upload = require('../multer/multerConfig')


//setting static folder for images
ProductRoutes.use('/public/productImages', express.static('public/productImages'))

ProductRoutes.get("/",ProductController.HomePage)
ProductRoutes.post("/add",upload.single('image'),ProductController.AddProducts)




module.exports = ProductRoutes;