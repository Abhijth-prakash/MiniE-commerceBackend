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

ProductRoutes.get("/product/cart",verifyUser,ProductController.getCartitems)
ProductRoutes.post("/product/cart",verifyUser,ProductController.AddtoCart)
ProductRoutes.delete("/product/cart",verifyUser,ProductController.deleteCart)
ProductRoutes.patch("/product/cart",verifyUser,ProductController.changequanity)

ProductRoutes.delete("/product/cart/dispatch",verifyUser,ProductController.dispatchProducts)





module.exports = ProductRoutes;