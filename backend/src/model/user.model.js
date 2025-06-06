import mongoose from 'mongoose'

const userScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    dp:{
        type:String,
        default:null
    },
},{
    timestamps:true
})

const User = mongoose.model("User",userScheme);

export default User