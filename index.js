const express = require('express')
const db = require('./db/mongodb')
require('dotenv').config();
const Products = require('./models/productModel')


const app = express()
const PORT = process.env.PORT

db.connection()


const ProoductRoutes = require("./routes/ProductRoutes")
app.use("/",ProoductRoutes)



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});