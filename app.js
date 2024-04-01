//import express from "express";
//import mongoose from "mongoose";
const express= require('express');
const mongoose= require('mongoose');
const { default: userRouter } = require('./routes/UserRoutes');
mongoose.connect("mongodb+srv://avishkartech8:STa00Rn7JNPeKJ6S@cluster0.hebea3r.mongodb.net/");
const app = express();
const port = 3000;
//middelwares
app.use("/user",userRouter)

app.listen(port, ()=>{
    console.log(`conneted to ${port}`);
})