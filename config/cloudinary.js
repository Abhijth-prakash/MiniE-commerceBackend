require('dotenv').config();
const cloudinary = require('cloudinary').v2;


//
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async(filePath) =>{
    try{
        const result = await cloudinary.uploader.upload(filePath)
        return result;
    }catch(error){
        console.log(error.message)
    }
}

module.exports={
    uploadFile
}