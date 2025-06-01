import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://bosshardik566:qFxvrGMSrljESQU7@cluster0.hgyecug.mongodb.net/");
        console.log("database connected succesfully");
    } catch (error) {
        console.log("MongoDB connection failed:", error);
        process.exit(1);
    }
}

export default connectDB;