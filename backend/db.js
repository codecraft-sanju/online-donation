import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error(" MONGO_URI is missing in .env file!");
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI); 
        console.log(' MongoDB connected successfully');
    } catch (error) {
        console.error(' MongoDB connection failed:', error.message);
    }
};

export default connectDB;
