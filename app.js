//import express from "express";
//import mongoose from "mongoose";
import express from 'express';
import dotenv from 'dotenv';

import mongoose from 'mongoose';
import cors from "cors";
import adminRouter from 'file:///C:/Users/Admin/OneDrive/Desktop/AMS/routes/AdminRouters.js';
import userRouter from 'file:///C:/Users/Admin/OneDrive/Desktop/AMS/routes/UserRoutes.js';

dotenv.config();

mongoose.connect("mongodb+srv://avishkartech8:STa00Rn7JNPeKJ6S@cluster0.hebea3r.mongodb.net/");
//const  collection = mongoose.model("collection",)

const app = express();
const PORT = process.env.PORT || 4000

//middelwares
app.use(cors())
app.use(express.json());
app.use("/user",userRouter)
app.use("/admin", adminRouter);

app.listen(PORT, ()=>{
    console.log(`conneted to ${PORT}`);
})