import express from 'express';
import { addAdmin, adminLogin } from 'file:///C:/Users/Admin/OneDrive/Desktop/AMS/controllers/AdminController.js';


const adminRouter = express.Router();

adminRouter.post('/signup', addAdmin);
adminRouter.post("/login", adminLogin);

export default adminRouter;