import Task from "../model/task.model.js";



export const newTask = async (req,res)=>{
    const data = req.body;
    try {
        
        if(!data.title){
            return res.status(400).json({message:"Bad Request: Don't have the necessery data"})
        }

        const newTask = new Task({
            title:data.title,
            description:data.description,
            duedate:data.ddate,
            tags:data.tags,
            section:data.section,
            user:data.user,
        })

        if(newTask){
            await newTask.save();
            res.status(201).json({
                _id:newTask._id,
                title:newTask.title,
            });
        }else{
            return res.status(400).json({message:"Invalid Note"});
        }


    } catch (error) {
        console.log(`Error in new task controller: ${error.message}`);
    }   
}