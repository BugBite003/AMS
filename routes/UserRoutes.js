//import express from "express";

const express= require('express');
import {  getAllUsers, signUp } from "../controllers/UserController";
const userRouter = express.Router();
userRouter.get('/', getAllUsers);
userRouter.post('/signup', signUp);
export default userRouter;