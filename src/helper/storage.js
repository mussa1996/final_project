import dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'
dotenv.config()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API,
    api_secret:process.env.CLOUDINARY_SECRET
})
export default async (file)=>{
    const image=await cloudinary.uploader.upload(file,(result)=>result)
    return image;
}