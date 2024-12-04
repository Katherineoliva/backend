import mongoose from "mongoose";
import 'dotenv/config';

export const dbConnection = async () => {
    const DB_URI = process.env.MONGODB_URI;
    if(!DB_URI){
        throw new Error('URI is not defined');
    }
    try{
        await mongoose.connect(DB_URI);
        console.log('Connected to MongoDB');
    }catch(err){
        console.error(err);
    }
}