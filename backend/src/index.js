import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './lib/db.js'
import authUser from './routes/auth.routes.js'
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


app.listen(PORT,()=>{
    console.log(`Server is fired up: ${PORT}`);
    connectDB()
})
