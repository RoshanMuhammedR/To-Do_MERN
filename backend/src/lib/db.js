import mongoose from 'mongoose'

export const connectDB = async ()=>{
    try {
        const conn =  await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Successfully connected to the database :${conn.connection.host}`);
    } catch (error) {
        console.log(`DB connection error: ${error}`);
    }
}