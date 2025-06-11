import cloudinary from "../lib/cloudinary.js"
import fs from 'fs';
import User from "../model/user.model.js";

export const uploadDP = async (req,res) => {
    if(!req.file){
        return  res.status(400).json({message:"No file uploaded"});
    }
    try {
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:'profile-pictures',
        })

        const user = await User.findByIdAndUpdate(req.user._id, {
            dp: result.secure_url
        }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
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

export const removeDP = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {
            dp: null
        }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error removing DP:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}