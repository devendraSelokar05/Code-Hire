import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Failed to Connect Database",error);
    }
};

export default connectDB;