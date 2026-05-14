const express = require('express')
const ProductRoutes = express()
const ProductController = require("../controllers/ProductController");


ProductRoutes.get("/",ProductController.HomePage)




module.exports = ProductRoutes;