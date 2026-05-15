const Products = require('../models/productModel')


//this is the home page
const HomePage = async (req, res) => {
    try {
        const ProductData = await Products.find({})
        res.json({ "products": ProductData })  
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//this is the add products page

const AddProducts = async (req,res)=>{
    try{
        const Product = new Products({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        image: req.file.filename
    });

    const ProductData =  await Product.save()
    res.status(201).json({message:"success"})
    } catch(error){
        res.status(500).json({message:error.message})
    }

}


module.exports ={
    HomePage,
    AddProducts
}