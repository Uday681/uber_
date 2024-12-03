import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    const uri = process.env.MONGODB_URI; 
    if (!uri) {
        throw new Error("MongoDB connection string is not defined in .env file");
    }
    mongoose.connect(uri)
        .then(() => {
            console.log("Database Connected");
        })
        .catch((err) => {
            console.log(err);
        });
};

export default connectDB;