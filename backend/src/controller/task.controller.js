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

export const getTasks = async (req,res) => {
    try {
        const user_id = req.user._id;

        if(!user_id){
            return res.status(400).json({message:"Bad Request: user is not authenticated"})
        }

        const task = await Task.find({user:user_id});

        return res.status(200).json(task)
    } catch (error) {
        console.log("Internal server error");
        return res.status(500).json({message:"Internal server error: task controller"});
    }
}


export const toggleTaskCompletion = async (req,res) => {
    
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if(!task){
            return res.status(404).json({message:"Task Not Found"});
        }

        task.isCompleted = !task.isCompleted;

        const updatedTask = await task.save();

        if(updatedTask){
            return res.status(200).json(updatedTask);
        }

    } catch (error) {
        console.log("Error in update toggleTaskCompletion:",error);
        return res.status(500).json({message:"Internal Server Error"});        
    }
}


export const updateTask = async (req,res) => {
    const {_id,...task} = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            _id,
            {...task,updatedAt: new Date() },
            {new:true}
        )

        if(!updatedTask){
            return res.status(400).json({message:"Task Not Found"});
        }
        res.json(updatedTask)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update task' });
    }
}

export const deleteTask = async (req, res) => {
    const id = req.body?._id || req.body?.task?._id;
    if (!id) {
        return res.status(400).json({ message: "Task ID required" });
    }
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(400).json({ message: "Task Not Found" });
        }
        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
};