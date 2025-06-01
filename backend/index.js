import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";


dotenv.config();
const app= express();

app.use(cors());
app.use(express.json());

connectDB();
const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`serveris running on port ${PORT}`);
})


app.use("/api/users",userRoutes);
app.use("/api/blogs",blogRoutes);