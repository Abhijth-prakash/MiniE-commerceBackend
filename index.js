const express = require('express')
const db = require('./db/mongodb')
require('dotenv').config();
const cors = require('cors')


const app = express()
const PORT = process.env.PORT
const APPURL = process.env.APPURL

//databaseconnection
db.connection()


//cors confirmation
app.use(cors({
    origin: `${APPURL}` 
}))

//middilewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//productRoutes
const ProductRoutes = require("./routes/ProductRoutes")
app.use("/",ProductRoutes)

//userRoutes
const UserRoutes = require("./routes/UserRoutes")
app.use("/user",UserRoutes)



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});