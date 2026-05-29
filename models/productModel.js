const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String,  
        required: true,
        enum: ["Electronics", "Clothing", "Shoes", "Books", "Furniture", "Toys"]  
    },
    description:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    image: { 
        type: String,
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);