import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    passwoard:{
        type: String,
        required: true,
        minLength: 8,
    },
});

export default mongoose.model('User', UserSchema);