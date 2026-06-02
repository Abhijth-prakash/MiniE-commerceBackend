const Products = require('../models/productModel')
const Cart = require('../models/cartModel')
const { uploadFile } = require('../config/cloudinary');

//this is the home page
const HomePage = async (req, res) => {
    try {

        //number of pages && limiting && search
        let page = Number(req.query.page) || 1
        let limit = Number(req.query.limit) || 6
        let search = req.query.search
        let filter = req.query.filter
        let sort = req.query.sort
        let skip = (page -1) * limit

        
        const query = {}
        if(search) query.name = { $regex: search, $options: 'i' }
        if(filter) query.category = filter

        //sorting
        const sortQuery ={}
        if(sort){
            if(sort ==="low"){
                sortQuery.price = 1
            }else if(sort === "high"){
                sortQuery.price = -1
            }
        }
        //counting total data for frontend
        const total = await Products.countDocuments(query)

        //query for search && skiping && limiting
       const ProductData = await Products.find(query).skip(skip).limit(limit).sort(sortQuery)
        
        res.json({ "products": ProductData,  pagination: {
        page,
        pages: Math.ceil(total / limit),
        total
    } })  
    } catch (error) {
       return res.status(500).json({ message: "server error" })
    }
}

//this is the add products page

const AddProducts = async (req, res) => {
    try {
        const { name, price, category, description, rating } = req.body

        if (!name || name.trim() === "") {
            return res.status(400).json({ message: "name is required" })
        }

        if (!price || isNaN(price) || Number(price) <= 0) {
            return res.status(400).json({ message: "valid price is required" })
        }

        if (!category || typeof category !== "string") {
            return res.status(400).json({ message: "category is required" })
        }

        if (!description || typeof description !== "string") {
            return res.status(400).json({ message: "description is required" })
        }

        if (!rating || isNaN(rating)) {
            return res.status(400).json({ message: "valid rating is required" })
        }

        if (Number(rating) < 1 || Number(rating) > 5) {
            return res.status(400).json({ message: "rating must be between 1 and 5" })
        }

        if (!req.file) {
            return res.status(400).json({ message: "image is required" })
        }   
        
        const uploadResult = await uploadFile(req.file.path);
        const existName = await Products.findOne({ name })

        if (existName) {
            return res.status(400).json({ message: "name already exists" })
        }

        const Product = new Products({
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
        rating: Number(rating),
        price,
        image: uploadResult.secure_url
       })

        const ProductData = await Product.save()

        return res.status(201).json({
            message: "success",
            product: ProductData
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "server error"
        })
    }
}


//deleting product
const deleteProduct = async (req,res)=>{
    try{
        const {id} = req.query
        const product = await Products.findById(id)
        if(!product){
            return res.status(400).json({message:"product doesnt exist"})
        }
        await Products.findByIdAndDelete(id)
        const productdata = await Products.find({})
        return res.status(200).json({message:"product deleted succesfully",product:productdata})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"server error"})
    }
}


//upadting product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.query
        const { name, price, category, description, rating } = req.body

        if (!name || name.trim() === "") {
            return res.status(400).json({ message: "name is required" })
        }

        if (!price || isNaN(price) || Number(price) <= 0) {
            return res.status(400).json({ message: "valid price is required" })
        }

        if (!category || typeof category !== "string") {
            return res.status(400).json({ message: "category is required" })
        }

        if (!description || typeof description !== "string") {
            return res.status(400).json({ message: "description is required" })
        }

        if (!rating || isNaN(rating)) {
            return res.status(400).json({ message: "valid rating is required" })
        }

        if (Number(rating) < 1 || Number(rating) > 5) {
            return res.status(400).json({ message: "rating must be between 1 and 5" })
        }

        await Products.findByIdAndUpdate(id, {
             $set: {
                 name,
                 price,
                 category,
                 description,
                 rating: Number(rating),
        ...(req.file && { image: req.file.filename })
                 }
        })

        const productdata = await Products.find({})
        return res.status(200).json({ message: "product successfully updated", product: productdata })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "server error" })
    }
}

//adding to cart
const AddtoCart = async (req,res)=>{
    try{
        const {id} = req.user
        const {productId} = req.body

        const existUser = await Cart.findOne({ user: id })

        if(existUser){
            const existProduct = await existUser.products.find(
                item => item.product.toString() === productId
            )

            if(existProduct){
                existProduct.quantity += 1
            } else {
                existUser.products.push({ product: productId })
            }

            await existUser.save()
        }else{
            const newItem = new Cart({
                user: id,
                products: [{ product: productId }]
            })

            await newItem.save()
        }

        return res.status(201).json({message:"item added to cart"})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"server error"})
    }
}

// get cart items
const getCartitems = async (req,res)=>{
    try{
        const {id} = req.user
      const cartData = await Cart.findOne({ user: id }).populate("products.product")

if (!cartData) {
    return res.status(200).json({
        message: "Cart is empty",
        products: []
    })
}

const products = cartData.products

return res.status(200).json({
    message: "fetched items",
    products
})
    }catch(error){
        return res.status(500).json({message:"server error"})
    }
}


//delete from cart
const deleteCart = async (req,res) =>{
    try{
        const {id} = req.user
        const {productId} = req.query
        
        const deleteProduct = await Cart.updateOne({ user: id },
        { $pull: { products: { product: productId } } })
        const cartData = await Cart.findOne({ user: id }).populate("products.product")
        const products = cartData.products
        return res.status(200).json({message:"deleted successfully",products})

    }catch(error){
        console.log(error)
        return res.status(500).json({message:"server error"})
    }
}

//changingqt
const changequanity = async (req, res) => {
    try {
        const { id } = req.user
        const { productId, quantity } = req.body

        const existUser = await Cart.findOne({ user: id })

        if (!existUser) {
            return res.status(404).json({ message: "Cart not found" })
        }

        const existProduct = await existUser.products.find(
            item => item.product.toString() === productId
        )

        if (!existProduct) {
            return res.status(404).json({ message: "Product not found" })
        }

        existProduct.quantity = quantity

        await existUser.save()
        await existUser.populate("products.product")

        return res.status(200).json({
            message: "Quantity updated", product: existUser.products
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "server error" })
    }
}


//dispatch
const dispatchProducts = async (req,res)=>{
    try{
        const {id} = req.user
        const userCart = await  Cart.findOne({ user: id })

        if(!userCart){
            return res.status(404).json({message:"user cart not found"})
        }

        userCart.products = []
        await userCart.save()
        return res.status(200).json({message:"all products deleted"})


    }catch(error){
        return res.status(500).json({message:"server error"})
    }
}


//getproductdetails

const getProduct = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Products.findById(id)

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        return res.status(200).json({
            message: "Product fetched",
            product
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server error"
        })
    }
}

module.exports ={
    HomePage,
    AddProducts,
    deleteProduct,
    updateProduct,
    AddtoCart,
    getCartitems,
    deleteCart,
    changequanity,
    dispatchProducts,
    getProduct
}