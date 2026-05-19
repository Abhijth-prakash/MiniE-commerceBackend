const express = require('express')
const db = require('./db/mongodb')
require('dotenv').config();
const Products = require('./models/productModel')
const cors = require('cors')


const app = express()
const PORT = process.env.PORT


db.connection()


//cors confirmation
app.use(cors({
    origin: 'http://localhost:5173' // your react app URL
}))

//productRoutes
const ProoductRoutes = require("./routes/ProductRoutes")
app.use("/",ProoductRoutes)

//userRoutes
const UserRoutes = require("./routes/UserRoutes")
app.use("/user",UserRoutes)



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});