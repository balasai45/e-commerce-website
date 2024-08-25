import mongoose from "mongoose";

const userInfoSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20
    },
    address:{
        type:String,
        required:false,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number
    }
});
const userInfo=new mongoose.model('userInfo',userInfoSchema);
export default userInfo;
