import { generateToken } from "../lib/utlis.js";
import User from "../model/user.model.js";
import bcrypt from 'bcryptjs'

export const signup = async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be atleast 6 charecters"})
        }
        const user = await User.findOne({email});

        if (user) return res.status(400).json({message:"Email alreasy exist"});

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            name,
            email,
            password:hashedPassword
        })

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
            });
        }else{
            return res.status(400).json({message:"Invalid user"});
        }
        
    } catch (error) {
        console.log(`Error in signup controller: ${error.message}`);
        return res.status(501).json({message:"Internal Server Error"})
    }
}


export const login = async (req,res) => {
    const {email,password} = req.body;
    try {
        if(!email || !password){
            res.status(400).json({message:"All Fields Are Required"})
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const isPasswordCorrect = bcrypt.compare(password,user.password)

        if(!isPasswordCorrect){
            res.status(400).json({message:"Invalid credentials"})
        }

        generateToken(user._id,res)

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })

    } catch (error) {
        console.log(`Error in login controller: ${error.message}`);
        return res.status(501).json({message:"Internal Server Error"})
    }
}



export const checkAuth = (req,res)=>{
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in check authentication controller");
        return res.status(500).json({message:"Internal server error"});
    }
}