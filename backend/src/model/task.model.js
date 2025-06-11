import mongoose from "mongoose";

// user can do 
//     title
//     desc
//     duedate
//     tags
//     section -- must be given by us
//     userID - background


const taskScheme = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    duedate:{
        type:Date,
        default:null,
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    isImportant:{
        type:Boolean,
        default:false
    },
    tags:{
        type:[String],
        default:[],
    },
    section: {
        type: String,
        enum: ["task", "calendar", "sticky-wall"],
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'medium'
    },
    reminderAt: Date,
    pinned: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{
    timestamps:true,
})

const Task = mongoose.model("Task",taskScheme)

export default Task;