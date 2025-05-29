import cloudinary from "../lib/cloudinary.js"
import fs from 'fs';

export const uploadDP = async (req,res) => {
    if(!req.file){
        return  res.status(400).json({message:"No file uploaded"});
    }
    try {
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:'profile-pictures',
        })
        fs.unlinkSync(req.file.path);
        res.status(200).json({
            message:"Dp has been successfull uploaded",
            url:result.secure_url,
            public_id: result.public_id
        })
    } catch (error) {
        res.status(500).json({message:"uploadController: Internal server error \n->"+ error});
        console.log(error);
        
    }
}