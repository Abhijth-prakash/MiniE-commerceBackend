const express = require('express')
const db = require('./db/mongodb')
require('dotenv').config();
const cors = require('cors')


const app = express()
const PORT = process.env.PORT
const APPURL = process.env.APPURL
const cookieParser = require("cookie-parser")


//databaseconnection
db.connection()


//cors confirmation
app.use(cors({
    origin: `${APPURL}` ,
     credentials: true    
}))

//middilewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/public/productImages', express.static('public/productImages'))

//productRoutes
const ProductRoutes = require("./routes/ProductRoutes")
app.use("/",ProductRoutes)

//userRoutes
const UserRoutes = require("./routes/UserRoutes")
app.use("/user",UserRoutes)



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});