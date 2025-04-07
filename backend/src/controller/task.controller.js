import Task from "../model/task.model.js";



export const newTask = async (req,res)=>{
    const data = req.body;
    console.log(data);
    
    try {
        if(!data.title){
            return res.status(400).json({message:"Bad Request: Don't have the necessery data"})
        }

        const newTask = new Task({
            title:data.title,
            description:data.description,
            duedate:data.ddate,
            isCompleted:false,
            isImportant:false,
            tags:data.tags,
            section:data.section,
        })

    } catch (error) {
        
    }
}