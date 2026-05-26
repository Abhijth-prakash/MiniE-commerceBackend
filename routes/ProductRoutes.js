const express = require('express')
const ProductRoutes = express.Router()
const ProductController = require("../controllers/ProductController");
const upload = require('../multer/multerConfig')
const {verifyUser,verifyAdmin} = require('../middilewares/auth')



//routes
ProductRoutes.get("/",verifyUser,ProductController.HomePage)
ProductRoutes.post("/product/add",verifyAdmin,upload.single('image'),ProductController.AddProducts)
ProductRoutes.delete("/product",verifyAdmin,ProductController.deleteProduct)
ProductRoutes.patch("/product",verifyAdmin,upload.single('image'),ProductController.updateProduct)
ProductRoutes.post("/product/cart",verifyUser,ProductController.updateProduct)




module.exports = ProductRoutes;