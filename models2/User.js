import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    className:{
        type: String,
        required: true,
    },
    rollno:{
        type: String,
        required: true,
    },
    attendance:{
        type: String,
        required: true,
        default: ' ',
    },
});

const user =  mongoose.model('user', UserSchema)
export default user;