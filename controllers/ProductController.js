const Products = require('../models/productModel')


//this is the home page
const HomePage = async (req, res) => {
    try {

        //number of pages && limiting && search
        let page = Number(req.query.page) || 1
        let limit = Number(req.query.limit) || 6
        let search = req.query.search
        let skip = (page -1) * limit

        const query = {}
        if(search) query.name = { $regex: search, $options: 'i' }

        //counting total data for frontend
        const total = await Products.countDocuments(query)

        //query for search && skiping && limiting
       const ProductData = await Products.find(query).skip(skip).limit(limit)
        
        res.json({ "products": ProductData,  pagination: {
        page,
        pages: Math.ceil(total / limit),
        total
    } })  
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
    res.status(201).json({message:"success",product:ProductData})
    } catch(error){
        res.status(500).json({message:error.message,})
    }

}


module.exports ={
    HomePage,
    AddProducts
}