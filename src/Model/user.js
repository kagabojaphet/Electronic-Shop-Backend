import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    PostedDate:{
        type:Date,
        default:Date.now()
    }
})
const User=mongoose.model("User",userSchema)
export default User