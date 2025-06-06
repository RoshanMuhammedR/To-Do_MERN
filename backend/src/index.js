import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './lib/db.js'
import authUser from './routes/auth.routes.js'
import userTask from './routes/task.routes.js'
import uploadImg from './routes/image.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()

const app = express()

const PORT = process.env.PORT


app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));
  

app.use('/api/auth',authUser)
app.use('/api/task',userTask);
app.use('/api/upload',uploadImg);

app.get('/api/quote',async (req,res) => {
    try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.status(500).json({ error: 'Failed to fetch quote' });
    }
}) 


app.listen(PORT,()=>{
    console.log(`Server is fired up: ${PORT}`);
    connectDB()
})
