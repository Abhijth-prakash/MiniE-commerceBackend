const Products = require('../models/productModel')

const HomePage = async (req, res) => {
    try {
        const ProductData = await Products.find({})
        res.json({ "products": ProductData })  
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}




module.exports ={
    HomePage
}